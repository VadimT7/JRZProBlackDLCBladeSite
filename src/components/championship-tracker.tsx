'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Star, Calendar, Users, Target } from 'lucide-react';

const championships = [
  {
    year: 2024,
    eventKey: 'khlChampionship',
    winnerKey: 'skaStPetersburg',
    categoryKey: 'professional',
    icon: Crown,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    players: 12,
    goals: 47,
    descriptionKey: 'dominantSeason'
  },
  {
    year: 2024,
    eventKey: 'olympicGames',
    winnerKey: 'russianNationalTeam',
    categoryKey: 'international',
    icon: Medal,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    players: 8,
    goals: 23,
    descriptionKey: 'historicOlympic'
  },
  {
    year: 2023,
    eventKey: 'worldChampionship',
    winnerKey: 'cskaMoscow',
    categoryKey: 'professional',
    icon: Trophy,
    color: 'text-dlc-gold',
    bgColor: 'bg-dlc-gold/10',
    players: 15,
    goals: 62,
    descriptionKey: 'undefeatedRun'
  },
  {
    year: 2023,
    eventKey: 'youthChampionship',
    winnerKey: 'dynamoMoscowU20',
    categoryKey: 'youth',
    icon: Star,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    players: 18,
    goals: 89,
    descriptionKey: 'futureStars'
  },
  {
    year: 2023,
    eventKey: 'womensLeague',
    winnerKey: 'tornadoMoscow',
    categoryKey: 'womens',
    icon: Crown,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    players: 10,
    goals: 34,
    descriptionKey: 'breakingBarriers'
  }
];

const stats = [
  {
    value: 127,
    labelKey: 'championshipsWon',
    icon: Trophy,
    color: 'text-dlc-gold',
    suffix: ''
  },
  {
    value: 1247,
    labelKey: 'professionalPlayers',
    icon: Users,
    color: 'text-dlc-silver',
    suffix: '+'
  },
  {
    value: 98.7,
    labelKey: 'winRate',
    icon: Target,
    color: 'text-green-400',
    suffix: '%'
  },
  {
    value: 2847,
    labelKey: 'goalsScored',
    icon: Star,
    color: 'text-blue-400',
    suffix: ''
  }
];

function AnimatedStat({ stat, delay }: { stat: any; delay: number }) {
  const t = useTranslations('home.championships');
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        setCount(stat.value * progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      const timer = setTimeout(() => {
        animate();
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, stat.value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      onViewportEnter={() => setIsVisible(true)}
      className="text-center group"
    >
      <div className="glass glass-hover p-6 rounded-2xl">
        <div className={`w-16 h-16 rounded-full bg-dlc-elevation flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
          <stat.icon className={`w-8 h-8 ${stat.color}`} />
        </div>
        <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
          {Math.floor(count).toLocaleString()}{stat.suffix}
        </div>
        <div className="text-dlc-text-secondary font-semibold">
          {t(stat.labelKey)}
        </div>
      </div>
    </motion.div>
  );
}

function ChampionshipCard({ championship, index, isActive }: { 
  championship: any; 
  index: number; 
  isActive: boolean; 
}) {
  const t = useTranslations('home.championships');

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`relative group cursor-pointer ${isActive ? 'z-10' : ''}`}
    >
      <div className={`glass glass-hover p-6 rounded-2xl relative overflow-hidden ${
        isActive ? `${championship.bgColor} border-2 border-current ${championship.color}` : ''
      }`}>
        {/* Background animation */}
        {isActive && (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute w-1 h-1 ${championship.color} rounded-full`}
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
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-full ${championship.bgColor} flex items-center justify-center`}>
              <championship.icon className={`w-6 h-6 ${championship.color}`} />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{championship.year}</div>
              <div className="text-sm text-dlc-text-secondary">{t(championship.categoryKey)}</div>
            </div>
          </div>

          {/* Event name */}
          <h3 className="text-xl font-cormorant font-bold mb-2">
            {t(championship.eventKey)}
          </h3>

          {/* Winner */}
          <div className={`text-lg font-semibold ${championship.color} mb-3`}>
            {t(championship.winnerKey)}
          </div>

          {/* Description */}
          <p className="text-dlc-text-secondary text-sm mb-4">
            {t(championship.descriptionKey)}
          </p>

          {/* Stats */}
          <div className="flex justify-between text-center">
            <div>
              <div className="text-2xl font-bold text-dlc-gold">{championship.players}</div>
              <div className="text-xs text-dlc-text-secondary">{t('players')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-dlc-silver">{championship.goals}</div>
              <div className="text-xs text-dlc-text-secondary">{t('goals')}</div>
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <div className={`absolute inset-0 ${championship.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`} />
      </div>
    </motion.div>
  );
}

export function ChampionshipTracker() {
  const t = useTranslations('home.championships');
  const [activeChampionship, setActiveChampionship] = useState(0);

  // Auto-rotate through championships
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChampionship((prev) => (prev + 1) % championships.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dlc-bg via-dlc-elevation/5 to-dlc-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,215,0,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(120,119,198,0.1),transparent_50%)]" />
        
        {/* Floating trophy icons */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <Trophy className="w-8 h-8 text-dlc-gold/20" />
          </motion.div>
        ))}
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
            <Trophy className="w-12 h-12 text-dlc-gold mr-4" />
            <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-gradient">
              {t('title')}
            </h2>
            <Trophy className="w-12 h-12 text-dlc-gold ml-4" />
          </div>
          <p className="text-xl text-dlc-text-secondary max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Championship Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <AnimatedStat key={stat.labelKey} stat={stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Recent Championships */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-cormorant font-bold mb-8 text-center"
          >
            {t('recentWins')}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {championships.slice(0, 6).map((championship, index) => (
              <ChampionshipCard
                key={`${championship.year}-${championship.event}`}
                championship={championship}
                index={index}
                isActive={activeChampionship === index}
              />
            ))}
          </div>
        </div>

        {/* Championship Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass p-8 rounded-2xl"
        >
          <h3 className="text-2xl font-cormorant font-bold mb-6 text-center">
            {t('timeline.title')}
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-dlc-gold via-dlc-silver to-dlc-gold opacity-30" />
            
            <div className="space-y-8">
              {[2024, 2023, 2022].map((year, index) => (
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`glass p-4 rounded-lg max-w-md ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-dlc-gold" />
                      <span className="font-bold text-lg">{year}</span>
                    </div>
                    <p className="text-dlc-text-secondary mt-2">
                      {t(`timeline.year${year}`)}
                    </p>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-dlc-gold rounded-full border-4 border-dlc-bg shadow-lg" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-2 text-dlc-gold font-semibold text-lg">
            <Crown className="w-6 h-6" />
            <span>{t('cta')}</span>
            <Medal className="w-6 h-6" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
