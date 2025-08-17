'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';

export function LegalOverview() {
  const t = useTranslations('legal.overview');
  const locale = useLocale();

  const sections = t.raw('sections') as Array<{
    title: string;
    description: string;
    link: string;
  }>;

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
            <p className="text-xl text-dlc-text-secondary mb-8">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-dlc-text-secondary leading-relaxed">
              {t('description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legal Sections Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <motion.div
                  key={section.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/${locale}${section.link}`}>
                    <div className="glass p-8 rounded-2xl h-full group hover:scale-105 transition-transform cursor-pointer">
                      <div className="flex flex-col h-full">
                        <div className="mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-dlc-silver to-dlc-gold rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-dlc-bg" />
                          </div>
                        </div>
                        <h3 className="text-xl font-cormorant font-bold mb-3 group-hover:text-gradient transition-colors">
                          {section.title}
                        </h3>
                        <p className="text-dlc-text-secondary flex-1">
                          {section.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-dlc-silver group-hover:text-dlc-gold transition-colors">
                          <span className="text-sm font-semibold">{t.raw('common.learnMore') || 'Learn More'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
