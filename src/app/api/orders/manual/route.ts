import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { sendAdminOrderNotification, sendCustomerOrderConfirmation } from '@/lib/email';

const manualOrderSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  region: z.string().min(2),
  postalCode: z.string().min(5),
  country: z.string().default('Russia'),
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().int().positive(),
  })),
  locale: z.enum(['ru', 'en']).default('ru'),
  totalAmount: z.number().positive(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = manualOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { fullName, email, phone, address, city, region, postalCode, country, items, totalAmount } = validation.data;

    // Fetch variant details to verify availability
    const variants = await prisma.variant.findMany({
      where: {
        id: { in: items.map(item => item.variantId) },
        active: true,
      },
      include: {
        product: true,
      },
    });

    if (variants.length !== items.length) {
      return NextResponse.json(
        { error: 'Some items are not available' },
        { status: 400 }
      );
    }

    // Create order items data
    const orderItems = items.map(item => {
      const variant = variants.find(v => v.id === item.variantId)!;
      return {
        variantId: item.variantId,
        quantity: item.quantity,
        price: variant.product.price,
      };
    });

    // Create order with manual processing status
    const order = await prisma.order.create({
      data: {
        email,
        phone,
        totalAmount,
        currency: 'RUB',
        status: 'manual_processing', // Special status for manual orders
        idempotenceKey: `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Required field
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    // Prepare email data
    const emailData = {
      orderId: order.id,
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      items: order.items.map(item => ({
        productName: item.variant.product.name,
        variantType: item.variant.type,
        variantSize: item.variant.size,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount,
      address,
      city,
      region,
      postalCode,
      country,
    };

    // Send emails (don't await to avoid blocking the response)
    Promise.all([
      sendAdminOrderNotification(emailData),
      sendCustomerOrderConfirmation(emailData),
    ]).catch(error => {
      console.error('Error sending emails:', error);
      // Don't fail the request if email fails
    });

    return NextResponse.json({ 
      orderId: order.id,
      status: 'manual_processing' 
    });

  } catch (error) {
    console.error('Manual order creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
