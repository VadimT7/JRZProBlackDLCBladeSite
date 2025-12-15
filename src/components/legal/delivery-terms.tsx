'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MapPin, Clock, Truck, Package } from 'lucide-react';

export function DeliveryTerms() {
  const t = useTranslations('legal.delivery');

  const sections = [
    {
      key: 'coverage',
      icon: MapPin,
    },
    {
      key: 'timing',
      icon: Clock,
      items: t.raw('sections.timing.items') as string[],
    },
    {
      key: 'shipping',
      icon: Truck,
    },
    {
      key: 'tracking',
      icon: Package,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 shimmer opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-6 text-gradient">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-dlc-text-secondary">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-dlc-silver to-dlc-gold rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-dlc-bg" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-cormorant font-bold mb-4">
                    {t('sections.info.title')}
                  </h2>
                  <p className="text-dlc-text-secondary text-lg">
                    {t('sections.info.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
