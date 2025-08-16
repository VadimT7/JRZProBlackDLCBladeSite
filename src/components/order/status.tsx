'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

interface OrderStatusProps {
  orderId: string;
}

interface OrderData {
  orderId: string;
  status: string;
  paymentStatus: string;
  amount: number;
  items: Array<{
    quantity: number;
    price: number;
    variant: {
      type: string;
      size: string;
      product: {
        name: string;
      };
    };
  }>;
}

export function OrderStatus({ orderId }: OrderStatusProps) {
  const t = useTranslations('order.thanks');
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`/api/payments/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order');
        
        const data = await response.json();
        setOrderData(data);
        
        // Stop polling if payment is completed or failed
        if (data.paymentStatus === 'succeeded' || data.paymentStatus === 'canceled') {
          clearInterval(intervalId);
        }
      } catch (err) {
        setError(true);
        clearInterval(intervalId);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchOrderStatus();

    // Poll every 3 seconds if payment is pending
    intervalId = setInterval(fetchOrderStatus, 3000);

    return () => clearInterval(intervalId);
  }, [orderId]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-dlc-silver" />
        <p className="text-xl text-dlc-text-secondary">Loading order...</p>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="text-center py-12">
        <XCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <p className="text-xl text-red-500">Failed to load order</p>
      </div>
    );
  }

  const isPaid = orderData.status === 'paid' || orderData.paymentStatus === 'succeeded';
  const isPending = orderData.paymentStatus === 'pending' || orderData.paymentStatus === 'waiting_for_capture';
  const isFailed = orderData.paymentStatus === 'canceled';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-12">
        {isPaid && (
          <>
            <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h1 className="text-4xl font-cormorant font-bold mb-4">{t('paid.title')}</h1>
            <p className="text-xl text-dlc-text-secondary">
              {t('paid.description').replace('{orderId}', orderId)}
            </p>
          </>
        )}
        
        {isPending && (
          <>
            <Clock className="w-16 h-16 mx-auto mb-4 text-dlc-silver animate-pulse" />
            <h1 className="text-4xl font-cormorant font-bold mb-4">{t('pending.title')}</h1>
            <p className="text-xl text-dlc-text-secondary">
              {t('pending.description').replace('{orderId}', orderId)}
            </p>
          </>
        )}
        
        {isFailed && (
          <>
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-500" />
            <h1 className="text-4xl font-cormorant font-bold mb-4">{t('failed.title')}</h1>
            <p className="text-xl text-dlc-text-secondary">
              {t('failed.description')}
            </p>
          </>
        )}
      </div>

      {/* Order Details */}
      <div className="glass p-8 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        
        <div className="space-y-4 mb-6">
          {orderData.items.map((item, index) => (
            <div key={index} className="flex justify-between">
              <div>
                <p className="font-medium">{item.variant.product.name}</p>
                <p className="text-sm text-dlc-text-secondary">
                  {item.variant.type} • {item.variant.size} × {item.quantity}
                </p>
              </div>
              <p className="font-medium">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-dlc-silver/10 pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(orderData.amount)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
