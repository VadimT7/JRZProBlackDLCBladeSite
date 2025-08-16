'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface PageHeroProps {
  titleKey: string;
  subtitleKey: string;
}

export function PageHero({ titleKey, subtitleKey }: PageHeroProps) {
  const t = useTranslations();

  return (
    <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-b from-dlc-bg to-dlc-elevation/30">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-6">
            {t(titleKey)}
          </h1>
          <p className="text-xl text-dlc-text-secondary">
            {t(subtitleKey)}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
