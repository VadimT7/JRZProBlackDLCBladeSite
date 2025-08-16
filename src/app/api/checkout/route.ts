import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { yookassa, formatAmountForYooKassa, shouldSendReceipt } from '@/lib/yookassa';
import { generateIdempotenceKey } from '@/lib/utils';
import { z } from 'zod';

const checkoutSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
  items: z.array(z.object({
    variantId: z.string(),
    quantity: z.number().int().positive(),
  })),
  locale: z.enum(['ru', 'en']).default('ru'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = checkoutSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validation.error.flatten() },
        { status: 400 }
      );
    }

    const { email, phone, items, locale } = validation.data;

    // Fetch variant details with product info
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

    // Calculate total
    let totalAmount = 0;
    const orderItems = items.map(item => {
      const variant = variants.find(v => v.id === item.variantId)!;
      const itemTotal = variant.product.price * item.quantity;
      totalAmount += itemTotal;

      return {
        variantId: item.variantId,
        quantity: item.quantity,
        price: variant.product.price,
      };
    });

    // Create order
    const idempotenceKey = generateIdempotenceKey();
    const order = await prisma.order.create({
      data: {
        email,
        phone,
        totalAmount,
        currency: 'RUB',
        status: 'pending',
        idempotenceKey,
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

    // Prepare YooKassa payment
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const returnUrl = `${baseUrl}/${locale}/order/thanks?orderId=${order.id}`;

    const paymentParams: any = {
      amount: {
        value: formatAmountForYooKassa(totalAmount),
        currency: 'RUB',
      },
      capture: true,
      description: `Order #${order.id}`,
      metadata: {
        orderId: order.id,
      },
      confirmation: {
        type: 'redirect',
        return_url: returnUrl,
      },
    };

    // Add receipt if enabled
    if (shouldSendReceipt() && (email || phone)) {
      paymentParams.receipt = {
        customer: {
          ...(email && { email }),
          ...(phone && { phone }),
        },
        items: order.items.map(item => ({
          description: `JRZ Pro Black DLC - ${item.variant.type} ${item.variant.size}`,
          quantity: item.quantity.toString(),
          amount: {
            value: formatAmountForYooKassa(item.price),
            currency: 'RUB',
          },
          vat_code: 1, // Without VAT
        })),
      };
    }

    // Create payment
    const payment = await yookassa.createPayment(paymentParams, idempotenceKey);

    // Save payment info
    await prisma.payment.create({
      data: {
        orderId: order.id,
        paymentId: payment.id,
        status: payment.status,
        amount: totalAmount,
        currency: 'RUB',
        customerEmail: email,
      },
    });

    // Update order with payment ID
    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: payment.id },
    });

    return NextResponse.json({
      orderId: order.id,
      paymentId: payment.id,
      confirmationUrl: payment.confirmation?.confirmation_url,
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
