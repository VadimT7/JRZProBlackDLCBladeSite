'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Ruler, ArrowRight } from 'lucide-react';

export function SizingGuide() {
  const t = useTranslations('sizing.guide');

  const steps = [
    t('steps.0'),
    t('steps.1'),
    t('steps.2'),
    t('steps.3'),
  ];

  return (
    <section className="py-16 bg-dlc-elevation/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dlc-silver/10 mb-4">
              <Ruler className="w-8 h-8 text-dlc-silver" />
            </div>
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold">
              {t('title')}
            </h2>
          </div>

          <div className="glass p-8 rounded-lg">
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-dlc-silver/20 flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <span className="text-lg">{step}</span>
                </motion.li>
              ))}
            </ol>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-4 bg-dlc-silver/5 rounded-lg flex items-center space-x-3"
            >
              <ArrowRight className="w-5 h-5 text-dlc-silver flex-shrink-0" />
              <p className="text-sm text-dlc-text-secondary">
                Pro tip: When in doubt, always choose the larger size for better comfort and performance.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
