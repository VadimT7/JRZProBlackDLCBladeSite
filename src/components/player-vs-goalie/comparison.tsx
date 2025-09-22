'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Activity, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ComparisonCards() {
  const t = useTranslations('playerVsGoalie');
  const locale = useLocale();

  const playerBenefits = [
    t('player.benefits.0'),
    t('player.benefits.1'),
    t('player.benefits.2'),
    t('player.benefits.3'),
  ];

  const goalieBenefits = [
    t('goalie.benefits.0'),
    t('goalie.benefits.1'),
    t('goalie.benefits.2'),
    t('goalie.benefits.3'),
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Player Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass glass-hover p-8 rounded-2xl group"
          >
            {/* Player Blade Image */}
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-dlc-silver/5 to-transparent group/image cursor-pointer">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-dlc-silver/0 via-dlc-silver/20 to-dlc-silver/0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 animate-pulse" />
              
              {/* Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              
              <Image
                src="/images/product/JRZ-SHIFT-272-Pro Black DLC_HQ_Logo.png"
                alt="JRZ Player Blade"
                fill
                className="object-contain p-3 group-hover/image:scale-105 transition-transform duration-300"
              />
              
              {/* Shimmer animation */}
              <div className="absolute inset-0 -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-full bg-dlc-silver/10 flex items-center justify-center group-hover:bg-dlc-silver/20 transition-colors">
                <Activity className="w-8 h-8 text-dlc-silver" />
              </div>
              <span className="text-4xl font-cormorant font-bold text-dlc-gold">
                {t('player.radius')}
              </span>
            </div>

            <h3 className="text-2xl font-cormorant font-bold mb-4">
              {t('player.title')}
            </h3>
            
            <p className="text-dlc-text-secondary mb-6">
              {t('player.description')}
            </p>

            <ul className="space-y-3 mb-8">
              {playerBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-dlc-silver flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link href={`/${locale}/shop?type=player`}>
              <Button className="w-full" variant="outline">
                {t('shopPlayerBlades')}
              </Button>
            </Link>
          </motion.div>

          {/* Goalie Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass glass-hover p-8 rounded-2xl group"
          >
            {/* Goalie Blade Image */}
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden bg-gradient-to-br from-dlc-gold/5 to-transparent group/image cursor-pointer">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-dlc-gold/0 via-dlc-gold/20 to-dlc-gold/0 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 animate-pulse" />
              
              {/* Reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300" />
              
              <Image
                src="/images/product/JRZ-1PGOALIE-09-Pro Black DLC_HQ_Logo.png"
                alt="JRZ Goalie Blade"
                fill
                className="object-contain p-3 group-hover/image:scale-105 transition-transform duration-300"
              />
              
              {/* Shimmer animation */}
              <div className="absolute inset-0 -translate-x-full group-hover/image:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            </div>
            
            <div className="flex items-start justify-between mb-6">
              <div className="w-16 h-16 rounded-full bg-dlc-gold/10 flex items-center justify-center group-hover:bg-dlc-gold/20 transition-colors">
                <Shield className="w-8 h-8 text-dlc-gold" />
              </div>
              <span className="text-4xl font-cormorant font-bold text-dlc-gold">
                {t('goalie.radius')}
              </span>
            </div>

            <h3 className="text-2xl font-cormorant font-bold mb-4">
              {t('goalie.title')}
            </h3>
            
            <p className="text-dlc-text-secondary mb-6">
              {t('goalie.description')}
            </p>

            <ul className="space-y-3 mb-8">
              {goalieBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <ArrowRight className="w-4 h-4 text-dlc-gold flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            <Link href={`/${locale}/shop?type=goalie`}>
              <Button className="w-full" variant="gold">
                {t('shopGoalieBlades')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
