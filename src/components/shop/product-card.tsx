'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mmToEuropeanShoeSize } from '@/lib/utils';
import { useCartStore } from '@/lib/cart-store';
// import type { Product, Variant } from '@prisma/client'; // Types used in ProductWithVariants

type ProductWithVariants = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  variants: {
    id: string;
    productId: string;
    type: string;
    size: string;
    sku: string;
    stock: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

interface ProductCardProps {
  product: ProductWithVariants;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('shop.product');
  const locale = useLocale();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);
  
  const [selectedType, setSelectedType] = useState<'player' | 'goalie'>('player');
  const [selectedSize, setSelectedSize] = useState('');
  
  const playerVariants = product.variants.filter(v => v.type === 'player');
  const goalieVariants = product.variants.filter(v => v.type === 'goalie');
  
  const currentVariants = selectedType === 'player' ? playerVariants : goalieVariants;
  const selectedVariant = currentVariants.find(v => v.size === selectedSize) || currentVariants[0];

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      variantType: t(`variant.${selectedType}`),
      variantSize: selectedVariant.size,
      quantity: 1,
      price: product.price,
      sku: selectedVariant.sku,
    });
    
    openCart();
  };

  const features = [
    t('features.0'),
    t('features.1'),
    t('features.2'),
    t('features.3'),
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
    >
      {/* Product Image */}
      <div className="relative">
        <div className="glass p-8 rounded-2xl">
          <div className="aspect-square relative bg-gradient-to-br from-dlc-silver/10 to-transparent rounded-lg overflow-hidden">
            <Image
              src="/images/product/JRZ-SHIFT-272-Pro Black DLC_HQ_Logo.png"
              alt={product.name}
              fill
              className="object-contain p-4"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dlc-bg/20 to-transparent" />
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="glass p-4 rounded-lg text-center text-sm"
            >
              {feature}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div>
        <div className="mb-8">
          <Link href={`/${locale}/shop/${product.id}`} className="block group">
            <h1 className="text-4xl font-cormorant font-bold mb-4 group-hover:text-dlc-silver transition-colors">{product.name}</h1>
            <p className="text-xl text-dlc-text-secondary mb-6 group-hover:text-dlc-text-primary transition-colors">{t('description')}</p>
          </Link>
          
          {/* Rating */}
          <div className="flex items-center space-x-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-dlc-gold text-dlc-gold" />
              ))}
            </div>
            <span className="text-sm text-dlc-text-secondary">({t('reviewCount')})</span>
          </div>

          {/* Order Info */}
          <p className="text-xl text-dlc-gold mb-8">Под заказ, поставка от 2х рабочих дней</p>
        </div>

        {/* Variant Selection */}
        <div className="space-y-6 mb-8">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">{t('variant.type')}</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedType('player')}
                className={`glass p-4 rounded-lg text-center transition-all ${
                  selectedType === 'player' ? 'border-dlc-silver' : 'hover:border-dlc-silver/50'
                }`}
              >
                <span className="block font-semibold">{t('variant.player')}</span>
              </button>
              <button
                onClick={() => setSelectedType('goalie')}
                className={`glass p-4 rounded-lg text-center transition-all ${
                  selectedType === 'goalie' ? 'border-dlc-gold' : 'hover:border-dlc-gold/50'
                }`}
              >
                <span className="block font-semibold">{t('variant.goalie')}</span>
              </button>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">{t('variant.size')}</label>
            <div className="grid grid-cols-4 gap-3">
              {currentVariants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedSize(variant.size)}
                  className={`glass p-3 rounded-lg text-center transition-all ${
                    selectedSize === variant.size || (!selectedSize && variant === currentVariants[0])
                      ? 'border-dlc-silver'
                      : 'hover:border-dlc-silver/50'
                  }`}
                >
                  <span className="block text-sm">{mmToEuropeanShoeSize(variant.size)}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Add to Cart */}
        <Button
          size="xl"
          className="w-full"
          onClick={handleAddToCart}
          disabled={!selectedVariant}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {useTranslations('common')('addToCart')}
        </Button>
      </div>
    </motion.div>
  );
}
