'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, XCircle, Loader2, Package, Star, Shield, Truck, Phone, Mail, Calendar } from 'lucide-react';
import { formatPrice, mmToEuropeanShoeSize } from '@/lib/utils';
import Link from 'next/link';
import { useLocale } from 'next-intl';

// Separate component to avoid hooks rules violation
function OrderDetailsSection({ orderData }: { orderData: OrderData }) {
  const tCommon = useTranslations('common');
  const tShop = useTranslations('shop.product');
  const locale = useLocale();
  
  // Helper function to get translated variant type
  const getVariantTypeTranslated = (type: string) => {
    if (type.toLowerCase().includes('player') || type === 'Player (10\')') {
      return tShop('variant.player');
    }
    if (type.toLowerCase().includes('goalie') || type === 'Goalie (30\')') {
      return tShop('variant.goalie');
    }
    return type;
  };
  
  return (
    <div className="space-y-8">
      {/* Luxury Header */}
      <div className="text-center pb-6 border-b border-dlc-gold/20">
        <div className="flex items-center justify-center mb-4">
          <div className="w-2 h-2 bg-dlc-gold rounded-full mr-3"></div>
          <h2 className="text-2xl font-cormorant font-bold text-dlc-gold">
            {tCommon('orderDetails')}
          </h2>
          <div className="w-2 h-2 bg-dlc-gold rounded-full ml-3"></div>
        </div>
        <p className="text-dlc-text-secondary">
          {locale === 'ru' ? 'Детали вашего премиального заказа' : 'Details of your premium order'}
        </p>
      </div>

      {/* Premium Product Cards */}
      <div className="space-y-6">
        {orderData.items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-6 rounded-2xl border border-dlc-gold/10 hover:border-dlc-gold/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-3">
                  <Shield className="w-5 h-5 text-dlc-gold mr-2" />
                  <h3 className="text-xl font-cormorant font-bold text-dlc-gold">
                    {item.variant.product.name}
                  </h3>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-dlc-text-secondary">
                    <Star className="w-4 h-4 text-dlc-gold mr-2" />
                    <span className="font-semibold text-dlc-text">
                      {locale === 'ru' ? 'Тип:' : 'Type:'} 
                    </span>
                    <span className="ml-2">{getVariantTypeTranslated(item.variant.type)}</span>
                  </div>
                  
                  <div className="flex items-center text-dlc-text-secondary">
                    <Package className="w-4 h-4 text-dlc-silver mr-2" />
                    <span className="font-semibold text-dlc-text">
                      {locale === 'ru' ? 'Размер:' : 'Size:'} 
                    </span>
                    <span className="ml-2">
                      {item.variant.size} ({mmToEuropeanShoeSize(item.variant.size)})
                    </span>
                  </div>
                  
                  <div className="flex items-center text-dlc-text-secondary">
                    <span className="font-semibold text-dlc-text">
                      {locale === 'ru' ? 'Количество:' : 'Quantity:'} 
                    </span>
                    <span className="ml-2 px-2 py-1 bg-dlc-gold/10 text-dlc-gold rounded-lg font-bold">
                      {item.quantity}
                    </span>
                  </div>
                </div>

                {/* Premium Features */}
                <div className="bg-dlc-elevation/30 p-4 rounded-xl">
                  <h4 className="font-semibold mb-2 text-dlc-gold">
                    {locale === 'ru' ? 'Премиальные характеристики:' : 'Premium Features:'}
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-dlc-gold rounded-full mr-2"></div>
                      <span>{locale === 'ru' ? 'DLC покрытие' : 'DLC Coating'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-dlc-silver rounded-full mr-2"></div>
                      <span>{locale === 'ru' ? 'Точность ±0.001"' : '±0.001" Precision'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-dlc-gold rounded-full mr-2"></div>
                      <span>{locale === 'ru' ? 'Зеркальная поверхность' : 'Mirror Finish'}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-dlc-silver rounded-full mr-2"></div>
                      <span>{locale === 'ru' ? 'Ударопрочность' : 'Impact Resistant'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right ml-6">
                <div className="text-lg font-bold text-dlc-gold mb-1">
                  Под заказ
                </div>
                <div className="text-sm text-dlc-text-secondary">
                  Поставка от 2х рабочих дней
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Info Section */}
      <div className="bg-gradient-to-r from-dlc-gold/5 via-dlc-gold/10 to-dlc-gold/5 p-8 rounded-2xl border border-dlc-gold/20">
        <div className="text-center">
          <h3 className="text-2xl font-cormorant font-bold text-dlc-gold mb-2">
            {locale === 'ru' ? 'Информация о заказе' : 'Order Information'}
          </h3>
          <p className="text-dlc-text-secondary text-lg mb-4">
            {locale === 'ru' ? 'Цена и условия доставки будут согласованы при обсуждении заказа' : 'Price and delivery terms will be agreed upon when discussing the order'}
          </p>
          <p className="text-dlc-gold font-semibold">
            {locale === 'ru' ? 'Поставка от 2х рабочих дней' : 'Delivery from 2 working days'}
          </p>
        </div>
      </div>
    </div>
  );
}

interface OrderStatusProps {
  orderId: string;
  isManual?: boolean;
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

export function OrderStatus({ orderId, isManual = false }: OrderStatusProps) {
  const t = useTranslations('order.thanks');
  const locale = useLocale();
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchOrderStatus = async () => {
      try {
        // For manual orders, fetch order details directly
        const endpoint = isManual ? `/api/orders/${orderId}` : `/api/payments/${orderId}`;
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch order');
        
        const data = await response.json();
        setOrderData(data);
        
        // Only poll for non-manual orders
        if (!isManual && (data.paymentStatus === 'succeeded' || data.paymentStatus === 'canceled')) {
          clearInterval(intervalId);
        }
      } catch {
        setError(true);
        clearInterval(intervalId);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchOrderStatus();

    // Only poll for non-manual orders
    if (!isManual) {
      intervalId = setInterval(fetchOrderStatus, 3000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [orderId, isManual]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dlc-bg via-dlc-elevation/10 to-dlc-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass p-12 rounded-3xl"
        >
          <Loader2 className="w-16 h-16 mx-auto mb-6 animate-spin text-dlc-gold" />
          <h2 className="text-2xl font-cormorant font-bold mb-4">
            {locale === 'ru' ? 'Загружаем ваш заказ...' : 'Loading your order...'}
          </h2>
          <p className="text-dlc-text-secondary">
            {locale === 'ru' ? 'Пожалуйста, подождите' : 'Please wait a moment'}
          </p>
        </motion.div>
      </div>
    );
  }

  if (error || !orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dlc-bg via-dlc-elevation/10 to-dlc-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center glass p-12 rounded-3xl"
        >
          <XCircle className="w-16 h-16 mx-auto mb-6 text-red-500" />
          <h2 className="text-2xl font-cormorant font-bold mb-4 text-red-500">
            {locale === 'ru' ? 'Ошибка загрузки заказа' : 'Failed to load order'}
          </h2>
          <p className="text-dlc-text-secondary mb-6">
            {locale === 'ru' ? 'Не удалось найти информацию о заказе' : 'Could not find order information'}
          </p>
          <Link href={`/${locale}/contact`}>
            <button className="px-6 py-3 bg-dlc-gold text-dlc-bg font-semibold rounded-lg hover:bg-dlc-gold/90 transition-colors">
              {locale === 'ru' ? 'Связаться с поддержкой' : 'Contact Support'}
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const isManualOrder = isManual || orderData.status === 'manual_processing';
  const isPaid = !isManualOrder && (orderData.status === 'paid' || orderData.paymentStatus === 'succeeded');
  const isPending = !isManualOrder && (orderData.paymentStatus === 'pending' || orderData.paymentStatus === 'waiting_for_capture');
  const isFailed = !isManualOrder && orderData.paymentStatus === 'canceled';

  return (
    <div className="min-h-screen bg-gradient-to-br from-dlc-bg via-dlc-elevation/5 to-dlc-bg py-12">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-dlc-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dlc-silver/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Luxury Header Section */}
          <div className="text-center mb-16">
            {isPaid && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-6 text-gradient">
                  {t('paid.title')}
                </h1>
                <p className="text-xl text-dlc-text-secondary max-w-2xl mx-auto">
                  {t('paid.description').replace('{orderId}', orderId)}
                </p>
              </motion.div>
            )}
            
            {isPending && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-dlc-silver to-dlc-silver/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Clock className="w-12 h-12 text-dlc-bg animate-pulse" />
                </div>
                <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-6 text-gradient">
                  {t('pending.title')}
                </h1>
                <p className="text-xl text-dlc-text-secondary max-w-2xl mx-auto">
                  {t('pending.description').replace('{orderId}', orderId)}
                </p>
              </motion.div>
            )}
            
            {isFailed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <XCircle className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-6 text-red-500">
                  {t('failed.title')}
                </h1>
                <p className="text-xl text-dlc-text-secondary max-w-2xl mx-auto">
                  {t('failed.description')}
                </p>
              </motion.div>
            )}
            
            {isManualOrder && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="w-24 h-24 bg-gradient-to-br from-dlc-gold to-dlc-gold/80 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Package className="w-12 h-12 text-dlc-bg" />
                </div>
                <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-6 text-gradient">
                  {t('manual.title')}
                </h1>
                <p className="text-xl text-dlc-text-secondary max-w-2xl mx-auto mb-8">
                  {locale === 'ru' 
                    ? `Ваш заказ #${orderId.slice(-8).toUpperCase()} получен. Наша команда свяжется с вами в течение 24 часов для организации оплаты и подтверждения деталей доставки.`
                    : `Your order #${orderId.slice(-8).toUpperCase()} has been received. Our team will contact you within 24 hours to arrange payment and confirm delivery details.`
                  }
                </p>

                {/* Order ID Display */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="inline-flex items-center px-6 py-3 bg-dlc-gold/10 border border-dlc-gold/20 rounded-full"
                >
                  <span className="text-dlc-text-secondary mr-2">
                    {locale === 'ru' ? 'Номер заказа:' : 'Order ID:'}
                  </span>
                  <span className="font-mono font-bold text-dlc-gold text-lg">
                    #{orderId.slice(-8).toUpperCase()}
                  </span>
                </motion.div>
              </motion.div>
            )}
          </div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <OrderDetailsSection orderData={orderData} />
          </motion.div>

          {/* Next Steps Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass p-8 rounded-2xl border border-dlc-gold/10"
          >
            <h2 className="text-2xl font-cormorant font-bold text-center mb-8 text-dlc-gold">
              {locale === 'ru' ? 'Что дальше?' : 'What\'s Next?'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-dlc-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-dlc-gold" />
                </div>
                <h3 className="font-semibold mb-2">
                  {locale === 'ru' ? 'Мы свяжемся' : 'We\'ll Contact You'}
                </h3>
                <p className="text-sm text-dlc-text-secondary">
                  {locale === 'ru' ? 'В течение 24 часов для подтверждения заказа' : 'Within 24 hours to confirm your order'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-dlc-silver/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-dlc-silver" />
                </div>
                <h3 className="font-semibold mb-2">
                  {locale === 'ru' ? 'Организуем оплату' : 'Arrange Payment'}
                </h3>
                <p className="text-sm text-dlc-text-secondary">
                  {locale === 'ru' ? 'Удобный способ оплаты и детали доставки' : 'Convenient payment method and delivery details'}
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-dlc-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-dlc-gold" />
                </div>
                <h3 className="font-semibold mb-2">
                  {locale === 'ru' ? 'Быстрая доставка' : 'Fast Delivery'}
                </h3>
                <p className="text-sm text-dlc-text-secondary">
                  {locale === 'ru' ? 'Бесплатная доставка по всей России' : 'Free shipping across Russia'}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Link href={`/${locale}/shop`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-dlc-silver to-dlc-silver/80 text-dlc-bg font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                {t('cta.shop')}
              </motion.button>
            </Link>
            
            <Link href={`/${locale}/contact`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-dlc-elevation border border-dlc-gold/20 text-dlc-text font-semibold rounded-xl hover:bg-dlc-gold/10 hover:border-dlc-gold/40 transition-all"
              >
                {t('cta.contact')}
              </motion.button>
            </Link>
          </motion.div>

          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center px-6 py-3 bg-dlc-gold/5 border border-dlc-gold/20 rounded-full">
              <Star className="w-5 h-5 text-dlc-gold mr-2" />
              <span className="text-dlc-gold font-semibold">
                {locale === 'ru' ? 'Премиальные хоккейные лезвия JRZ Pro Black DLC' : 'Premium JRZ Pro Black DLC Hockey Blades'}
              </span>
              <Star className="w-5 h-5 text-dlc-gold ml-2" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
