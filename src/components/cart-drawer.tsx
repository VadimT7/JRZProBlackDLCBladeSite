'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { mmToEuropeanShoeSize } from '@/lib/utils';

export function CartDrawer() {
  const t = useTranslations('cart');
  const tShop = useTranslations('shop.product');
  const locale = useLocale();
  const { isOpen, closeCart, items, removeItem, updateQuantity, clearCart } = useCartStore();

  // Helper function to display correct variant type
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dlc-bg border-l border-dlc-silver/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-dlc-silver/10">
              <h2 className="text-xl font-semibold">{t('title')}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeCart}
                className="hover:bg-dlc-silver/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-dlc-text-secondary" />
                  <p className="text-dlc-text-secondary">{t('empty')}</p>
                  <Link href={`/${locale}/shop`}>
                    <Button variant="outline" className="mt-4" onClick={closeCart}>
                      {t('continueShopping')}
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.variantId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="glass p-4 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{item.productName}</h3>
                          <p className="text-sm text-dlc-text-secondary">
                            {getDisplayVariantType(item.variantType)} • {mmToEuropeanShoeSize(item.variantSize)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.variantId)}
                          className="text-dlc-text-secondary hover:text-red-500"
                        >
                          {t('remove')}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="font-medium text-dlc-gold text-sm">
                          Под заказ
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-dlc-silver/10 p-6 space-y-4">
                <div className="bg-dlc-elevation/30 p-3 rounded-lg">
                  <p className="text-sm text-dlc-text-secondary text-center">
                    Цена будет согласована при обсуждении заказа
                  </p>
                </div>
                <Link href={`/${locale}/checkout`} className="block">
                  <Button className="w-full" size="lg" onClick={closeCart}>
                    {t('checkout')}
                  </Button>
                </Link>
                <Link href={`/${locale}/shop`} className="block">
                  <Button variant="outline" className="w-full" onClick={closeCart}>
                    {t('continueShopping')}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="w-full text-dlc-text-secondary hover:text-red-500" 
                  onClick={() => {
                    clearCart();
                  }}
                >
                  {t('clearCart')}
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
