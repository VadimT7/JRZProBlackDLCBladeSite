'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function SharpeningHero() {
  const t = useTranslations('sharpening.hero');

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/goalie-topshot.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-dlc-bg/85" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-cormorant font-bold mb-8">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-2xl md:text-3xl text-dlc-text-secondary font-medium">
            {t('subtitle')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
