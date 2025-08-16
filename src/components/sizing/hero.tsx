'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function SizingHero() {
  const t = useTranslations('sizing.hero');

  return (
    <section className="relative min-h-[40vh] flex items-center justify-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-dlc-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
