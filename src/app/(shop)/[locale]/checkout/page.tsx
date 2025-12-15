'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { mmToEuropeanShoeSize } from '@/lib/utils';

const checkoutSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  region: z.string().min(2),
  postalCode: z.string().min(5),
  country: z.string().default('Russia'),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tErrors = useTranslations('errors');
  const tShop = useTranslations('shop.product');
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

  // Helper function to display correct variant type (handles old translation keys)
  const getDisplayVariantType = (variantType: string) => {
    // Handle old translation keys
    if (variantType === 'shop.product.goalie' || variantType === 'goalie') {
      return tShop('variant.goalie');
    }
    if (variantType === 'shop.product.player' || variantType === 'player') {
      return tShop('variant.player');
    }
    // Return as-is if already translated
    return variantType;
  };

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    setError('');

    try {
      // Temporary: Submit order for manual processing
      const response = await fetch('/api/orders/manual', {
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
          totalAmount: totalPrice,
        }),
      });

      if (!response.ok) {
        throw new Error('Order submission failed');
      }

      const result = await response.json();
      
      if (result.orderId) {
        // Clear cart
        clearCart();
        // Redirect to thank you page using window.location for more reliable navigation
        const thankYouUrl = `/${locale}/order/thanks?orderId=${result.orderId}&manual=true`;
        console.log('Redirecting to:', thankYouUrl);
        window.location.href = thankYouUrl;
      } else {
        throw new Error('Failed to create order');
      }
    } catch {
      setError(tErrors('general'));
      setIsProcessing(false);
    }
  };

  /* Original YooKassa payment flow - commented out for temporary manual processing
  const onSubmitWithPayment = async (data: CheckoutForm) => {
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
    } catch {
      setError(tErrors('general'));
      setIsProcessing(false);
    }
  };
  */

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
                        {t('contact.fullName')}
                      </label>
                      <input
                        type="text"
                        {...register('fullName')}
                        className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-500">{tErrors('required')}</p>
                      )}
                    </div>

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
                        {t('contact.phone')}
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                        placeholder="+7 (999) 123-45-67"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">{tErrors('required')}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="glass p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">{t('shipping.title')}</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('shipping.address')}
                      </label>
                      <input
                        type="text"
                        {...register('address')}
                        className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500">{tErrors('required')}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('shipping.city')}
                        </label>
                        <input
                          type="text"
                          {...register('city')}
                          className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-500">{tErrors('required')}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('shipping.region')}
                        </label>
                        <input
                          type="text"
                          {...register('region')}
                          className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                        />
                        {errors.region && (
                          <p className="mt-1 text-sm text-red-500">{tErrors('required')}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('shipping.postalCode')}
                        </label>
                        <input
                          type="text"
                          {...register('postalCode')}
                          className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                        />
                        {errors.postalCode && (
                          <p className="mt-1 text-sm text-red-500">{tErrors('required')}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t('shipping.country')}
                        </label>
                        <input
                          type="text"
                          {...register('country')}
                          className="w-full px-4 py-2 bg-dlc-elevation border border-dlc-silver/20 rounded-lg focus:border-dlc-silver focus:outline-none"
                          defaultValue="Russia"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Temporary manual order info - replace with payment section when YooKassa is ready */}
                <div className="glass p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">{t('manualOrder.title')}</h2>
                  <p className="text-dlc-text-secondary mb-4">{t('manualOrder.description')}</p>
                  <div className="flex items-start space-x-2 text-sm text-dlc-text-secondary bg-dlc-elevation/50 p-3 rounded-lg">
                    <Package className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{t('manualOrder.note')}</span>
                  </div>
                </div>

                {/* Original payment section - commented out for temporary manual processing
                <div className="glass p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">{t('payment.title')}</h2>
                  <p className="text-dlc-text-secondary mb-4">{t('payment.description')}</p>
                  <div className="flex items-center space-x-2 text-sm text-dlc-text-secondary">
                    <CreditCard className="w-4 h-4" />
                    <span>{t('payment.methods')}</span>
                  </div>
                </div>
                */}

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
                      {t('submitting')}
                    </>
                  ) : (
                    t('submitOrder')
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
                          {getDisplayVariantType(item.variantType)} • {mmToEuropeanShoeSize(item.variantSize)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-dlc-gold">
                        Под заказ
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dlc-silver/10 pt-4">
                  <div className="bg-dlc-elevation/30 p-4 rounded-lg">
                    <p className="text-sm text-dlc-text-secondary text-center">
                      Цена и условия доставки будут согласованы при обсуждении заказа
                    </p>
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
