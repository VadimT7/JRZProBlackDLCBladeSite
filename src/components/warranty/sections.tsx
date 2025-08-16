'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, RefreshCw, Package } from 'lucide-react';

export function WarrantySections() {
  const t = useTranslations('warranty.sections');

  const sections = [
    {
      icon: Shield,
      iconColor: 'text-dlc-silver',
      bgColor: 'bg-dlc-silver/10',
      titleKey: 'warranty.title',
      descriptionKey: 'warranty.description',
    },
    {
      icon: RefreshCw,
      iconColor: 'text-dlc-gold',
      bgColor: 'bg-dlc-gold/10',
      titleKey: 'returns.title',
      descriptionKey: 'returns.description',
    },
    {
      icon: Package,
      iconColor: 'text-dlc-silver',
      bgColor: 'bg-dlc-silver/10',
      titleKey: 'shipping.title',
      descriptionKey: 'shipping.description',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl"
            >
              <div className="flex items-start space-x-6">
                <div className={`w-16 h-16 rounded-full ${section.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <section.icon className={`w-8 h-8 ${section.iconColor}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-cormorant font-bold mb-4">
                    {t(section.titleKey)}
                  </h2>
                  <p className="text-lg text-dlc-text-secondary leading-relaxed">
                    {t(section.descriptionKey)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="glass p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
            <ul className="space-y-2 text-dlc-text-secondary">
              <li>• Warranty covers manufacturing defects only</li>
              <li>• Normal wear and tear is not covered</li>
              <li>• Proof of purchase required for all claims</li>
              <li>• Contact our support team for assistance</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
