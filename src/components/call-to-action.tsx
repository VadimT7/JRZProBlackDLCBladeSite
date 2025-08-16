'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function CallToAction() {
  const t = useTranslations('home.cta');
  const locale = useLocale();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-12 md:p-16 rounded-2xl text-center relative overflow-hidden"
        >
          {/* Background shimmer effect */}
          <div className="absolute inset-0 shimmer" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-cormorant font-bold mb-8">
              {t('title')}
            </h2>
            
            <Link href={`/${locale}/shop`}>
              <Button size="xl" variant="gold" className="shimmer">
                {t('button')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
