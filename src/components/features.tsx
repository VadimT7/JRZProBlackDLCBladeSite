'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Sparkles, Target, Timer } from 'lucide-react';

const features = [
  {
    icon: Shield,
    titleKey: 'dlc.title',
    descriptionKey: 'dlc.description',
  },
  {
    icon: Target,
    titleKey: 'precision.title',
    descriptionKey: 'precision.description',
  },
  {
    icon: Sparkles,
    titleKey: 'edge.title',
    descriptionKey: 'edge.description',
  },
  {
    icon: Timer,
    titleKey: 'durability.title',
    descriptionKey: 'durability.description',
  },
];

export function Features() {
  const t = useTranslations('home.features');

  return (
    <section className="py-16 bg-dlc-elevation/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold mb-4">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass glass-hover p-8 rounded-lg text-center group"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-dlc-silver/10 flex items-center justify-center group-hover:bg-dlc-silver/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-dlc-silver" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {t(feature.titleKey)}
              </h3>
              <p className="text-dlc-text-secondary">
                {t(feature.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
