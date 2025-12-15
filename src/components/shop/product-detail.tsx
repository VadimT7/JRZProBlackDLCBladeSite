'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ShoppingCart, Star, Shield, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { mmToEuropeanShoeSize } from '@/lib/utils';
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

interface ProductDetailProps {
  product: ProductWithVariants;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const t = useTranslations('shop.product');
  const addItem = useCartStore(state => state.addItem);
  const [selectedVariant, setSelectedVariant] = useState<ProductWithVariants['variants'][0] | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Use actual JRZ blade images
  const images: string[] = [
    '/images/product/JRZ-SHIFT-272-Pro Black DLC_HQ_Logo.png',
    '/images/product/JRZ-SHIFT-272-Pro Steel_HQ_Logo.png',
    '/images/product/JRZ-SB4-280-Pro Black DLC_HQ_Logo.png',
    '/images/product/JRZ-SBXS-280-Pro Black DLC_HQ_Logo.png'
  ];

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    
    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      variantType: t(`variant.${selectedVariant.type}`),
      variantSize: selectedVariant.size,
      quantity,
      price: product.price,
      sku: selectedVariant.sku,
    });
  };

  const playerVariants = product.variants.filter(v => v.type === 'player');
  const goalieVariants = product.variants.filter(v => v.type === 'goalie');

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden glass p-4">
                <img
                  src={images[selectedImage] || '/placeholder.jpg'}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Thumbnail Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-6 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-lg overflow-hidden glass transition-all ${
                        selectedImage === index ? 'ring-2 ring-dlc-silver' : 'hover:opacity-80'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-cormorant font-bold mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-dlc-text-secondary mb-6">
                {product.description}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-xl text-dlc-gold">
                  Под заказ, поставка от 2х рабочих дней
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-dlc-gold text-dlc-gold" />
                  ))}
                  <span className="ml-2 text-sm text-dlc-text-secondary">({t('reviewCount')})</span>
                </div>
              </div>
            </div>

            {/* Variant Selection */}
            <div className="space-y-6">
              {/* Player Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Player Blades</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {playerVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'bg-dlc-silver text-dlc-bg'
                          : 'glass hover:bg-dlc-silver/10'
                      }`}
                    >
                      {mmToEuropeanShoeSize(variant.size)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Goalie Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Goalie Blades</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {goalieVariants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'bg-dlc-silver text-dlc-bg'
                          : 'glass hover:bg-dlc-silver/10'
                      }`}
                    >
                      {mmToEuropeanShoeSize(variant.size)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-dlc-silver/10"
                  >
                    -
                  </button>
                  <span className="w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-dlc-silver/10"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant}
              size="lg"
              className="w-full"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {selectedVariant ? 'Add to Cart' : 'Select a variant'}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-dlc-silver/20">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-dlc-silver" />
                <p className="text-xs text-dlc-text-secondary">30-Day Warranty</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-dlc-silver" />
                <p className="text-xs text-dlc-text-secondary">Free Shipping</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-dlc-silver" />
                <p className="text-xs text-dlc-text-secondary">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-cormorant font-bold mb-8 text-center">
              Product Details
            </h2>
            
            <div className="glass p-8 rounded-2xl">
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br>') }} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
