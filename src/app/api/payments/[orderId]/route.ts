import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { yookassa } from '@/lib/yookassa';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // Get order with payment info
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        payment: true,
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
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // If payment exists and is not pending, return current status
    if (order.payment && order.payment.status !== 'pending') {
      return NextResponse.json({
        orderId: order.id,
        status: order.status,
        paymentStatus: order.payment.status,
        amount: order.totalAmount,
        items: order.items,
      });
    }

    // If we have a payment ID, check with YooKassa
    if (order.paymentId) {
      try {
        const paymentDetails = await yookassa.getPayment(order.paymentId);
        
        // Update our records if status changed
        if (paymentDetails.status !== order.payment?.status) {
          await prisma.payment.upsert({
            where: { paymentId: order.paymentId },
            create: {
              orderId: order.id,
              paymentId: order.paymentId,
              status: paymentDetails.status,
              amount: order.totalAmount,
              currency: 'RUB',
            },
            update: {
              status: paymentDetails.status,
            },
          });

          // Update order status if payment succeeded
          if (paymentDetails.status === 'succeeded' && order.status !== 'paid') {
            await prisma.order.update({
              where: { id: order.id },
              data: { status: 'paid' },
            });
          }
        }

        return NextResponse.json({
          orderId: order.id,
          status: paymentDetails.status === 'succeeded' ? 'paid' : order.status,
          paymentStatus: paymentDetails.status,
          amount: order.totalAmount,
          items: order.items,
        });
        
      } catch (error) {
        console.error('Failed to fetch payment from YooKassa:', error);
      }
    }

    // Return current order status
    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      paymentStatus: order.payment?.status || 'pending',
      amount: order.totalAmount,
      items: order.items,
    });

  } catch (error) {
    console.error('Payment status error:', error);
    return NextResponse.json(
      { error: 'Failed to get payment status' },
      { status: 500 }
    );
  }
}
