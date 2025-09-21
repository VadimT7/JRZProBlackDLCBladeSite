'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Clock, Zap, Heart, Info } from 'lucide-react';

export function SharpeningSections() {
  const t = useTranslations('sharpening.sections');

  const techniqueTips = [
    t('technique.tips.0'),
    t('technique.tips.1'),
    t('technique.tips.2'),
    t('technique.tips.3'),
  ];

  const careTips = [
    t('care.tips.0'),
    t('care.tips.1'),
    t('care.tips.2'),
    t('care.tips.3'),
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Frequency Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dlc-silver/10 mb-6">
              <Clock className="w-8 h-8 text-dlc-silver" />
            </div>
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold mb-6">
              {t('frequency.title')}
            </h2>
            <p className="text-lg text-dlc-text-secondary">
              {t('frequency.description')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Technique Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-dlc-silver/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-dlc-silver" />
              </div>
              <h3 className="text-2xl font-cormorant font-bold">
                {t('technique.title')}
              </h3>
            </div>
            <ul className="space-y-4">
              {techniqueTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3 glass p-4 rounded-lg"
                >
                  <Info className="w-5 h-5 text-dlc-silver flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Care Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-dlc-gold/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-dlc-gold" />
              </div>
              <h3 className="text-2xl font-cormorant font-bold">
                {t('care.title')}
              </h3>
            </div>
            <ul className="space-y-4">
              {careTips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-start space-x-3 glass p-4 rounded-lg"
                >
                  <Info className="w-5 h-5 text-dlc-gold flex-shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Blade Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-cormorant font-bold mb-4">
              {t('showcase.title') || 'Professional Grade Blades'}
            </h3>
            <p className="text-dlc-text-secondary">
              {t('showcase.subtitle') || 'Engineered for optimal performance and longevity'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { nameKey: 'showcase.blades.proBlackDLC', image: '/images/product/JRZ-SHIFT-272-Pro Black DLC_HQ_Logo.png' },
              { nameKey: 'showcase.blades.proSteel', image: '/images/product/JRZ-SHIFT-272-Pro Steel_HQ_Logo.png' },
              { nameKey: 'showcase.blades.goalie', image: '/images/product/JRZ-1PGOALIE-09-Pro Black DLC_HQ_Logo.png' },
            ].map((blade, index) => (
              <motion.div
                key={blade.nameKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass glass-hover p-6 rounded-2xl group"
              >
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-dlc-silver/5 to-transparent">
                  <Image
                    src={blade.image}
                    alt={t(blade.nameKey)}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-semibold text-center group-hover:text-dlc-silver transition-colors">
                  {t(blade.nameKey)}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pro Tip */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass p-8 rounded-2xl bg-gradient-to-br from-dlc-silver/5 to-transparent">
            <p className="text-lg text-center">
              <span className="text-dlc-silver font-semibold">{t('proTip.label')}</span> {t('proTip.text')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
