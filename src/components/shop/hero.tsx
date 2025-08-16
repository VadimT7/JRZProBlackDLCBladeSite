'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ShopHero() {
  const t = useTranslations('shop');

  return (
    <section className="relative min-h-[30vh] flex items-center justify-center bg-gradient-to-b from-dlc-bg to-dlc-elevation/30">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-4">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-xl text-dlc-text-secondary">
            {useTranslations('common')('tagline')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
