import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    const order = await prisma.order.findUnique({
      where: { id: orderId },
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

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Format response to match OrderStatus component expectations
    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      paymentStatus: order.status === 'manual_processing' ? 'manual' : order.status,
      amount: order.totalAmount,
      items: order.items.map(item => ({
        quantity: item.quantity,
        price: item.price,
        variant: {
          type: item.variant.type,
          size: item.variant.size,
          product: {
            name: item.variant.product.name,
          },
        },
      })),
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
