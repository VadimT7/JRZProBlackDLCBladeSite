'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function TechnologyHero() {
  const t = useTranslations('technology.hero');

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dlc-bg via-dlc-elevation/50 to-dlc-bg" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(192, 192, 192, 0.1) 35px,
            rgba(192, 192, 192, 0.1) 70px
          )`
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-cormorant font-bold mb-6">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-dlc-text-secondary">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
