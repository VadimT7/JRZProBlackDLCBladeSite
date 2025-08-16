'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { formatPrice } from '@/lib/utils';

const checkoutSchema = z.object({
  email: z.string().email(),
  phone: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const tErrors = useTranslations('errors');
  const locale = useLocale();
  const router = useRouter();
  
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  if (items.length === 0) {
    router.push(`/${locale}/shop`);
    return null;
  }

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          items: items.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity,
          })),
          locale,
        }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const result = await response.json();
      
      if (result.confirmationUrl) {
        // Clear cart before redirect
        clearCart();
        // Redirect to YooKassa
        window.location.href = result.confirmationUrl;
      } else {
        throw new Error('No payment URL received');
      }
    } catch (err) {
      setError(tErrors('general'));
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-cormorant font-bold mb-8">{t('title')}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Checkout Form */}
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="glass p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">{t('contact.title')}</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.email')}
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{tErrors('email')}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.phone')} ({tCommon('optional')})
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">{t('payment.title')}</h2>
                  <p className="text-dlc-text-secondary mb-4">{t('payment.description')}</p>
                  <div className="flex items-center space-x-2 text-sm text-dlc-text-secondary">
                    <CreditCard className="w-4 h-4" />
                    <span>{t('payment.methods')}</span>
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="xl"
                  className="w-full"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t('processing')}
                    </>
                  ) : (
                    t('submit')
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <div className="glass p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-semibold mb-4">{t('summary.title')}</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.variantId} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-dlc-text-secondary">
                          {item.variantType} • {item.variantSize} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dlc-silver/10 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>{t('summary.items')}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('summary.shipping')}</span>
                    <span className="text-green-500">{tCommon('free')}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-dlc-silver/10">
                    <span>{t('summary.total')}</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
