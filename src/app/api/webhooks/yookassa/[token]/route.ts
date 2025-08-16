import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { yookassa } from '@/lib/yookassa';

interface WebhookEvent {
  type: string;
  event: string;
  object: {
    id: string;
    status: string;
    paid: boolean;
    amount: {
      value: string;
      currency: string;
    };
    metadata?: {
      orderId?: string;
    };
  };
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    // Verify webhook token
    const { token } = await params;
    const expectedToken = process.env.YKS_WEBHOOK_TOKEN;
    if (!expectedToken || token !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body: WebhookEvent = await request.json();
    
    // Log webhook event
    console.log('YooKassa webhook:', body.type, body.object.id);

    // Extract payment info
    const { id: paymentId, status, metadata } = body.object;
    const orderId = metadata?.orderId;

    if (!orderId) {
      console.error('No orderId in webhook metadata');
      return NextResponse.json({ error: 'Missing orderId' }, { status: 400 });
    }

    // Verify payment exists in our DB
    const existingPayment = await prisma.payment.findUnique({
      where: { paymentId },
    });

    if (!existingPayment) {
      // Fetch payment from YooKassa to verify
      const paymentDetails = await yookassa.getPayment(paymentId);
      
      if (paymentDetails.metadata?.orderId !== orderId) {
        return NextResponse.json({ error: 'Order mismatch' }, { status: 400 });
      }

      // Create payment record if it doesn't exist
      await prisma.payment.create({
        data: {
          orderId,
          paymentId,
          status: paymentDetails.status,
          amount: parseFloat(paymentDetails.amount.value),
          currency: paymentDetails.amount.currency,
        },
      });
    }

    // Update payment and order status based on event
    switch (body.type) {
      case 'payment.succeeded':
        await prisma.$transaction([
          prisma.payment.update({
            where: { paymentId },
            data: { status: 'succeeded' },
          }),
          prisma.order.update({
            where: { id: orderId },
            data: { status: 'paid' },
          }),
        ]);
        break;

      case 'payment.canceled':
        await prisma.$transaction([
          prisma.payment.update({
            where: { paymentId },
            data: { status: 'canceled' },
          }),
          prisma.order.update({
            where: { id: orderId },
            data: { status: 'cancelled' },
          }),
        ]);
        break;

      case 'payment.waiting_for_capture':
        await prisma.payment.update({
          where: { paymentId },
          data: { status: 'waiting_for_capture' },
        });
        break;

      default:
        console.log('Unhandled webhook type:', body.type);
    }

    // Respond quickly to YooKassa
    return NextResponse.json({ status: 'ok' });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
