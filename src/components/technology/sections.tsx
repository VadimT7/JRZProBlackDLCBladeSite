'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle2, Sparkles, Shield, Gauge, Zap, Award, Clock, Layers } from 'lucide-react';

export function TechnologySections() {
  const t = useTranslations('technology.sections');

  const performanceItems = [
    { text: t('performance.items.0'), icon: Gauge },
    { text: t('performance.items.1'), icon: Shield },
    { text: t('performance.items.2'), icon: Zap },
    { text: t('performance.items.3'), icon: Award },
    { text: t('performance.items.4'), icon: Clock },
  ];

  const specs = [
    { label: 'DLC Hardness', value: '2000-3000 HV', detail: 'Vickers Scale' },
    { label: 'Coating Thickness', value: '2-4 μm', detail: 'Microns' },
    { label: 'Friction Coefficient', value: '0.1-0.2', detail: 'Against Ice' },
    { label: 'Temperature Resistance', value: '400°C', detail: 'Maximum' },
    { label: 'Corrosion Protection', value: '1000+ hrs', detail: 'Salt Spray Test' },
    { label: 'Edge Retention', value: '10x', detail: 'vs Traditional Steel' },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Premium Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold mb-6">
            {t('coating.title')}
          </h2>
          <p className="text-xl text-dlc-text-secondary max-w-3xl mx-auto leading-relaxed">
            Engineered with aerospace-grade Diamond-Like Carbon coating technology, 
            each blade represents the pinnacle of metallurgical innovation.
          </p>
        </motion.div>

        {/* Visual DLC Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="relative glass p-12 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-dlc-silver/10 via-transparent to-dlc-gold/10" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-cormorant font-bold mb-4 text-gradient">
                  Molecular Perfection
                </h3>
                <p className="text-lg text-dlc-text-secondary mb-6 leading-relaxed">
                  {t('coating.description')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Layers className="w-8 h-8 text-dlc-silver" />
                    <div>
                      <h4 className="font-semibold">Multi-Layer Technology</h4>
                      <p className="text-sm text-dlc-text-secondary">Proprietary bonding process ensures lifetime durability</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Sparkles className="w-8 h-8 text-dlc-gold" />
                    <div>
                      <h4 className="font-semibold">Carbon Crystal Structure</h4>
                      <p className="text-sm text-dlc-text-secondary">Diamond-hard surface with silk-smooth glide</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-full bg-gradient-to-br from-dlc-silver/20 to-transparent p-8">
                  <div className="w-full h-full rounded-full bg-gradient-to-tr from-dlc-bg via-dlc-elevation to-dlc-bg flex items-center justify-center relative">
                    <div className="absolute inset-0 rounded-full animate-pulse bg-gradient-to-r from-dlc-silver/20 to-transparent" />
                    <span className="text-6xl font-cormorant font-bold text-gradient">DLC</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-cormorant font-bold text-center mb-10">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-6 rounded-lg text-center group hover:scale-105 transition-transform"
              >
                <div className="text-3xl font-bold text-gradient mb-2">{spec.value}</div>
                <h4 className="font-semibold mb-1">{spec.label}</h4>
                <p className="text-sm text-dlc-text-secondary">{spec.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Precision Engineering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="glass p-12 rounded-2xl">
                  <div className="text-center">
                    <motion.div 
                      className="text-8xl font-cormorant font-bold text-gradient mb-4"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ±0.001&quot;
                    </motion.div>
                    <p className="text-xl text-dlc-text-secondary mb-2">Manufacturing Tolerance</p>
                    <p className="text-sm text-dlc-text-secondary">Swiss-Grade Precision</p>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-dlc-gold/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-dlc-silver/20 rounded-full blur-3xl" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-cormorant font-bold mb-6">
                {t('precision.title')}
              </h3>
              <p className="text-lg text-dlc-text-secondary leading-relaxed mb-6">
                {t('precision.description')}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dlc-silver" />
                  <span>CNC machined to aerospace standards</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dlc-silver" />
                  <span>Laser-measured profile accuracy</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-dlc-silver" />
                  <span>Hand-inspected by master craftsmen</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Performance Excellence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl md:text-4xl font-cormorant font-bold mb-10">
            {t('performance.title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {performanceItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass p-6 rounded-lg group"
              >
                <item.icon className="w-10 h-10 text-dlc-silver mb-4 mx-auto group-hover:text-dlc-gold transition-colors" />
                <p className="font-medium">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Premium Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="glass p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-50" />
            <div className="relative z-10">
              <Award className="w-16 h-16 text-dlc-gold mx-auto mb-6" />
              <h3 className="text-3xl font-cormorant font-bold mb-4">
                The Ultimate Edge
              </h3>
              <p className="text-lg text-dlc-text-secondary max-w-2xl mx-auto">
                When precision matters and performance is non-negotiable, 
                JRZ Pro Black DLC delivers the competitive advantage that separates champions from the rest.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}