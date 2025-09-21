'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Shield, Zap, Eye } from 'lucide-react';
import Image from 'next/image';

const blades = [
  {
    id: 'shift-pro-black',
    name: 'SHIFT Pro Black DLC',
    image: '/images/product/JRZ-SHIFT-272-Pro Black DLC_HQ_Logo.png',
    features: ['dlc', 'precision', 'durability'],
    specialty: 'Ultimate Agility',
    description: 'Revolutionary blade for forwards who demand explosive acceleration and razor-sharp turns.'
  },
  {
    id: 'sb4-pro-black',
    name: 'SB4 Pro Black DLC',
    image: '/images/product/JRZ-SB4-280-Pro Black DLC_HQ_Logo.png',
    features: ['dlc', 'stability', 'power'],
    specialty: 'Power & Control',
    description: 'Engineered for defensemen who need maximum stability and crushing power in every stride.'
  },
  {
    id: 'goalie-pro-black',
    name: 'Goalie Pro Black DLC',
    image: '/images/product/JRZ-1PGOALIE-09-Pro Black DLC_HQ_Logo.png',
    features: ['dlc', 'stability', 'recovery'],
    specialty: 'Goaltending Excellence',
    description: 'Specifically designed for goalies with 30° radius for maximum stability and lightning-fast recovery.'
  },
  {
    id: 'xsg-pro-black',
    name: 'XSG Pro Black DLC',
    image: '/images/product/JRZ-XSG-282-Pro Black DLC_HQ_Logo.png',
    features: ['dlc', 'precision', 'speed'],
    specialty: 'Speed Demon',
    description: 'Built for players who live in the fast lane, delivering unmatched speed and precision.'
  }
];

const features = {
  dlc: {
    icon: Shield,
    color: 'text-dlc-gold',
    bgColor: 'bg-dlc-gold/10'
  },
  precision: {
    icon: Eye,
    color: 'text-dlc-silver',
    bgColor: 'bg-dlc-silver/10'
  },
  durability: {
    icon: Zap,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10'
  },
  stability: {
    icon: Shield,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10'
  },
  power: {
    icon: Zap,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10'
  },
  recovery: {
    icon: Sparkles,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10'
  },
  speed: {
    icon: Sparkles,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-400/10'
  }
};

export function InteractiveShowcase() {
  const t = useTranslations('home.showcase');
  const [currentBlade, setCurrentBlade] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  // Auto-rotate blades
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentBlade((prev) => (prev + 1) % blades.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextBlade = () => {
    setCurrentBlade((prev) => (prev + 1) % blades.length);
    setIsAutoPlay(false);
  };

  const prevBlade = () => {
    setCurrentBlade((prev) => (prev - 1 + blades.length) % blades.length);
    setIsAutoPlay(false);
  };

  const currentBladeData = blades[currentBlade];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-dlc-bg via-dlc-elevation/10 to-dlc-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-dlc-gold/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-dlc-silver/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-cormorant font-bold mb-6 text-gradient">
            {t('title')}
          </h2>
          <p className="text-xl text-dlc-text-secondary max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Blade Showcase */}
          <div className="relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Main blade display */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBlade}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                  className="glass p-12 rounded-3xl relative overflow-hidden group"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-dlc-gold/10 via-transparent to-dlc-silver/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <Image
                      src={currentBladeData.image}
                      alt={currentBladeData.name}
                      width={400}
                      height={400}
                      className="w-full h-auto object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Floating particles */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-dlc-gold/60 rounded-full animate-ping"
                        style={{
                          left: `${20 + i * 10}%`,
                          top: `${15 + (i % 3) * 25}%`,
                          animationDelay: `${i * 0.3}s`
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <button
                onClick={prevBlade}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dlc-elevation/80 hover:bg-dlc-elevation rounded-full flex items-center justify-center text-dlc-text hover:text-dlc-gold transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextBlade}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-dlc-elevation/80 hover:bg-dlc-elevation rounded-full flex items-center justify-center text-dlc-text hover:text-dlc-gold transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Blade indicators */}
            <div className="flex justify-center space-x-3 mt-8">
              {blades.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentBlade(index);
                    setIsAutoPlay(false);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentBlade 
                      ? 'bg-dlc-gold scale-125' 
                      : 'bg-dlc-elevation hover:bg-dlc-gold/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Blade Information */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBlade}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 bg-dlc-gold/10 text-dlc-gold rounded-full text-sm font-semibold mb-4">
                    {currentBladeData.specialty}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-cormorant font-bold mb-4">
                    {currentBladeData.name}
                  </h3>
                  <p className="text-lg text-dlc-text-secondary">
                    {currentBladeData.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold mb-4">{t('features')}</h4>
                  <div className="grid grid-cols-1 gap-4">
                    {currentBladeData.features.map((featureKey, index) => {
                      const feature = features[featureKey as keyof typeof features];
                      return (
                        <motion.div
                          key={featureKey}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onMouseEnter={() => setHoveredFeature(featureKey)}
                          onMouseLeave={() => setHoveredFeature(null)}
                          className={`flex items-center space-x-4 p-4 rounded-xl transition-all cursor-pointer ${
                            hoveredFeature === featureKey 
                              ? `${feature.bgColor} scale-105` 
                              : 'hover:bg-dlc-elevation/30'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full ${feature.bgColor} flex items-center justify-center`}>
                            <feature.icon className={`w-6 h-6 ${feature.color}`} />
                          </div>
                          <div>
                            <h5 className="font-semibold">{t(`featureNames.${featureKey}`)}</h5>
                            <p className="text-sm text-dlc-text-secondary">{t(`featureDescs.${featureKey}`)}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Auto-play indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
              isAutoPlay 
                ? 'bg-dlc-gold/10 text-dlc-gold' 
                : 'bg-dlc-elevation/50 text-dlc-text-secondary hover:bg-dlc-elevation'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isAutoPlay ? 'bg-dlc-gold animate-pulse' : 'bg-dlc-text-secondary'}`} />
            <span className="text-sm">{isAutoPlay ? t('autoPlay') : t('paused')}</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
