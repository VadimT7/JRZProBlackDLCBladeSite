'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { Atom, Zap, Shield, Sparkles, ChevronRight, Microscope } from 'lucide-react';
import Image from 'next/image';


const scienceSteps = [
  {
    id: 'carbon-formation',
    icon: Atom,
    titleKey: 'carbonFormation',
    descriptionKey: 'carbonFormationDesc',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    particles: 12
  },
  {
    id: 'dlc-coating',
    icon: Shield,
    titleKey: 'dlcCoating',
    descriptionKey: 'dlcCoatingDesc',
    color: 'text-dlc-gold',
    bgColor: 'bg-dlc-gold/10',
    particles: 8
  },
  {
    id: 'molecular-bonding',
    icon: Zap,
    titleKey: 'molecularBonding',
    descriptionKey: 'molecularBondingDesc',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    particles: 15
  },
  {
    id: 'surface-hardening',
    icon: Sparkles,
    titleKey: 'surfaceHardening',
    descriptionKey: 'surfaceHardeningDesc',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    particles: 10
  }
];

function InteractiveBlade() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-dlc-bg via-dlc-elevation/20 to-dlc-bg">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,215,0,0.1)_49%,rgba(255,215,0,0.1)_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      {/* Interactive Blade */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: isHovered 
              ? '0 0 50px rgba(255, 215, 0, 0.3), inset 0 0 50px rgba(255, 215, 0, 0.1)' 
              : '0 0 0px rgba(255, 215, 0, 0)'
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Blade Image */}
        <motion.div
          className="relative z-10"
          animate={{
            rotateY: isHovered ? [0, 5, -5, 0] : 0,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ 
            duration: isHovered ? 2 : 0.3,
            repeat: isHovered ? Infinity : 0,
            repeatType: "reverse"
          }}
        >
          <Image
            src="/images/product/JRZ-SHIFT-272-Pro Black DLC_HQ_Logo.png"
            alt="JRZ Pro Black DLC Blade"
            width={400}
            height={300}
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Floating particles on hover */}
        {isHovered && (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-dlc-gold/60 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  y: [-20, -60],
                  x: [0, (Math.random() - 0.5) * 40]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}

        {/* Scanning lines effect on hover */}
        {isHovered && (
          <div className="absolute inset-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-dlc-gold/60 to-transparent"
                style={{ top: `${30 + i * 20}%` }}
                animate={{
                  x: [-100, 400],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}

        {/* DLC coating visualization */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-dlc-gold/20"
          animate={{
            borderColor: isHovered 
              ? 'rgba(255, 215, 0, 0.6)' 
              : 'rgba(255, 215, 0, 0.2)'
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

    </div>
  );
}

function ScienceStep({ step, index, isActive, onClick }: { 
  step: any; 
  index: number; 
  isActive: boolean; 
  onClick: () => void; 
}) {
  const t = useTranslations('home.science');

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 ${
        isActive ? 'scale-105' : 'hover:scale-102'
      }`}
    >
      <div className={`glass p-6 rounded-2xl relative overflow-hidden ${
        isActive ? `${step.bgColor} border-2 border-current ${step.color}` : 'hover:bg-dlc-elevation/30'
      }`}>
        {/* Background particles */}
        {isActive && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(step.particles)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${step.color} rounded-full`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`w-12 h-12 rounded-full ${step.bgColor} flex items-center justify-center`}>
              <step.icon className={`w-6 h-6 ${step.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{t(step.titleKey)}</h3>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${
              isActive ? 'rotate-90 text-current' : 'text-dlc-text-secondary'
            }`} />
          </div>
          
          {isActive && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-dlc-text-secondary leading-relaxed"
            >
              {t(step.descriptionKey)}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ScienceVisualization() {
  const t = useTranslations('home.science');
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 bg-gradient-to-br from-dlc-bg via-dlc-elevation/10 to-dlc-bg"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.05),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dlc-gold/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-dlc-silver/50 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <Microscope className="w-12 h-12 text-dlc-gold mr-4" />
            <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-gradient">
              {t('title')}
            </h2>
          </div>
          <p className="text-xl text-dlc-text-secondary max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Science Steps */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-3xl font-cormorant font-bold mb-4">{t('processTitle')}</h3>
              <p className="text-dlc-text-secondary">{t('processDescription')}</p>
            </motion.div>

            {scienceSteps.map((step, index) => (
              <ScienceStep
                key={step.id}
                step={step}
                index={index}
                isActive={activeStep === index}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>

          {/* Molecular Animation */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <InteractiveBlade />
            </motion.div>

            {/* Technical specs overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 glass p-6 rounded-2xl"
            >
              <h4 className="text-xl font-semibold mb-4 text-center">{t('specifications')}</h4>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-dlc-gold">2850 HV</div>
                  <div className="text-sm text-dlc-text-secondary">{t('hardness')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-dlc-silver">0.8μm</div>
                  <div className="text-sm text-dlc-text-secondary">{t('thickness')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-400">0.05</div>
                  <div className="text-sm text-dlc-text-secondary">{t('friction')}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">500°C</div>
                  <div className="text-sm text-dlc-text-secondary">{t('temperature')}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass p-8 rounded-2xl inline-block">
            <p className="text-lg text-dlc-text-secondary mb-4">
              {t('ctaText')}
            </p>
            <div className="flex items-center justify-center space-x-2 text-dlc-gold font-semibold">
              <Atom className="w-5 h-5" />
              <span>{t('ctaButton')}</span>
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
