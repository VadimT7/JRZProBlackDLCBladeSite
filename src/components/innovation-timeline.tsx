'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Lightbulb, Rocket, Zap, Shield, Sparkles, ChevronDown, Clock, Award } from 'lucide-react';

const innovations = [
  {
    year: 2025,
    titleKey: 'nextGenDLC',
    descriptionKey: 'nextGenDLCDesc',
    icon: Rocket,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10',
    status: 'future',
    achievementKeys: ['quantumEnhancement', 'frictionReduction99', 'selfHealingSurface'],
    impactKey: 'gameChangingPerformance'
  },
  {
    year: 2024,
    titleKey: 'proBlackDLCLaunch',
    descriptionKey: 'proBlackDLCDesc',
    icon: Shield,
    color: 'text-dlc-gold',
    bgColor: 'bg-dlc-gold/10',
    status: 'current',
    achievementKeys: ['championshipsWon', 'playerSatisfaction', 'edgeRetention3x'],
    impactKey: 'industryStandardRedefined'
  },
  {
    year: 2023,
    titleKey: 'precisionManufacturing',
    descriptionKey: 'precisionManufacturingDesc',
    icon: Zap,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    status: 'completed',
    achievementKeys: ['aerospacePrecision', 'perfectPairConsistency', 'zeroToleranceVariance'],
    impactKey: 'manufacturingExcellence'
  },
  {
    year: 2022,
    titleKey: 'dlcCoatingInnovation',
    descriptionKey: 'dlcCoatingInnovationDesc',
    icon: Sparkles,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    status: 'completed',
    achievementKeys: ['hardness2850HV', 'mirrorFinishQuality', 'sharpeningIntervals50'],
    impactKey: 'industryBreakthrough'
  },
  {
    year: 2021,
    titleKey: 'researchDevelopment',
    descriptionKey: 'researchDevelopmentDesc',
    icon: Lightbulb,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    status: 'completed',
    achievementKeys: ['molecularEngineering', 'surfaceScienceMastery', 'performanceOptimization'],
    impactKey: 'foundationForInnovation'
  }
];


function InnovationCard({ innovation, index, isActive, onClick }: {
  innovation: any;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const t = useTranslations('home.innovation');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <div className={`relative glass glass-hover p-6 rounded-2xl transition-all duration-300 ${
        isActive ? `${innovation.bgColor} scale-105 border-2 border-current ${innovation.color}` : ''
      }`}>
        {/* Status indicator */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
          innovation.status === 'future' ? 'bg-cyan-400/10 text-cyan-400' :
          innovation.status === 'current' ? 'bg-dlc-gold/10 text-dlc-gold' :
          'bg-green-400/10 text-green-400'
        }`}>
          {t(`status.${innovation.status}`)}
        </div>

        {/* Background particles for active card */}
        {isActive && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${innovation.color} rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-16 h-16 rounded-full ${innovation.bgColor} flex items-center justify-center`}>
              <innovation.icon className={`w-8 h-8 ${innovation.color}`} />
            </div>
            <div>
              <div className="text-3xl font-bold">{innovation.year}</div>
              <div className={`text-lg font-semibold ${innovation.color}`}>
                {t(innovation.titleKey)}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-dlc-text-secondary mb-4">
            {t(innovation.descriptionKey)}
          </p>

          {/* Achievements */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <h4 className="font-semibold text-sm uppercase tracking-wide">
                {t('achievements')}
              </h4>
              <div className="space-y-2">
                {innovation.achievementKeys.map((achievementKey: string, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center space-x-2"
                  >
                    <Award className={`w-4 h-4 ${innovation.color}`} />
                    <span className="text-sm text-dlc-text-secondary">
                      {t(`achievementTexts.${achievementKey}`)}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              <div className={`mt-4 p-3 rounded-lg ${innovation.bgColor}`}>
                <div className="text-sm font-semibold mb-1">{t('impact')}</div>
                <div className="text-sm text-dlc-text-secondary">
                  {t(`impacts.${innovation.impactKey}`)}
                </div>
              </div>
            </motion.div>
          )}

          {/* Expand indicator */}
          <div className="flex justify-center mt-4">
            <ChevronDown className={`w-5 h-5 transition-transform ${
              isActive ? 'rotate-180 text-current' : 'text-dlc-text-secondary'
            }`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}


export function InnovationTimeline() {
  const t = useTranslations('home.innovation');
  const [activeInnovation, setActiveInnovation] = useState(1); // Start with current innovation

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dlc-bg via-dlc-elevation/10 to-dlc-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,215,0,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(64,224,208,0.05),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Clock className="w-12 h-12 text-dlc-gold mr-4" />
            <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-gradient">
              {t('title')}
            </h2>
            <Rocket className="w-12 h-12 text-cyan-400 ml-4" />
          </div>
          <p className="text-xl text-dlc-text-secondary max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>


        {/* Innovation Cards */}
        <div className="space-y-8 mb-16">
          {innovations.map((innovation, index) => (
            <InnovationCard
              key={innovation.year}
              innovation={innovation}
              index={index}
              isActive={activeInnovation === index}
              onClick={() => setActiveInnovation(activeInnovation === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass p-12 rounded-3xl text-center relative overflow-hidden"
        >
          {/* Background animation */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center mb-6">
              <Rocket className="w-16 h-16 text-cyan-400" />
            </div>
            <h3 className="text-3xl md:text-4xl font-cormorant font-bold mb-6">
              {t('future.title')}
            </h3>
            <p className="text-xl text-dlc-text-secondary mb-8 max-w-2xl mx-auto">
              {t('future.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Zap, label: t('future.quantum'), color: 'text-cyan-400' },
                { icon: Shield, label: t('future.selfHealing'), color: 'text-green-400' },
                { icon: Sparkles, label: t('future.ai'), color: 'text-purple-400' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-4 rounded-xl"
                >
                  <feature.icon className={`w-8 h-8 ${feature.color} mx-auto mb-3`} />
                  <div className="text-sm font-semibold">{feature.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-dlc-gold font-semibold text-lg">
            <Lightbulb className="w-6 h-6" />
            <span>{t('cta')}</span>
            <Rocket className="w-6 h-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
