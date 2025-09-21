'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Star, Quote, Trophy, Medal } from 'lucide-react';

const testimonials = [
  {
    id: 'alexander-ovechkin',
    name: 'Alexander Petrov',
    positionKey: 'professionalForward',
    team: 'SKA St. Petersburg',
    leagueKey: 'khl',
    videoThumbnail: '/playersplayinghockey1.mp4',
    achievements: ['KHL Champion 2023', '2x All-Star'],
    rating: 5,
    quote: 'testimonial1',
    stats: {
      goals: 47,
      assists: 32,
      games: 68
    }
  },
  {
    id: 'maria-goalkeeper',
    name: 'Maria Volkov',
    positionKey: 'professionalGoaltender',
    team: 'CSKA Moscow',
    leagueKey: 'womensHockeyLeague',
    videoThumbnail: '/goalie-topshot.mp4',
    achievements: ['Olympic Gold 2022', 'World Champion 2023'],
    rating: 5,
    quote: 'testimonial2',
    stats: {
      saves: 1247,
      savePercentage: 94.2,
      shutouts: 12
    }
  },
  {
    id: 'dmitri-defenseman',
    name: 'Dmitri Kozlov',
    positionKey: 'professionalDefenseman',
    team: 'Lokomotiv Yaroslavl',
    leagueKey: 'khl',
    videoThumbnail: '/hockeyplayervideo.mp4',
    achievements: ['Gagarin Cup Winner', 'Best Defenseman 2023'],
    rating: 5,
    quote: 'testimonial3',
    stats: {
      points: 38,
      hits: 156,
      blockedShots: 89
    }
  }
];

function VideoTestimonial({ testimonial, isActive }: { testimonial: any; isActive: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const t = useTranslations('home.testimonials');

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => setIsVideoLoaded(true);
      video.addEventListener('loadeddata', handleLoadedData);
      return () => video.removeEventListener('loadeddata', handleLoadedData);
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1 : 0.95 }}
      transition={{ duration: 0.5 }}
      className={`relative ${isActive ? 'z-10' : 'z-0'}`}
    >
      <div className="glass p-8 rounded-3xl relative overflow-hidden group">
        {/* Video Section */}
        <div className="relative aspect-video mb-6 rounded-2xl overflow-hidden bg-dlc-elevation">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src={testimonial.videoThumbnail} type="video/mp4" />
          </video>

          {/* Video overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          
          {/* Play button */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <div className="w-20 h-20 bg-dlc-gold/90 rounded-full flex items-center justify-center shadow-2xl">
              {isPlaying ? (
                <Pause className="w-8 h-8 text-dlc-bg" />
              ) : (
                <Play className="w-8 h-8 text-dlc-bg ml-1" />
              )}
            </div>
          </button>

          {/* Loading indicator */}
          {!isVideoLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-dlc-elevation">
              <div className="shimmer w-20 h-20 rounded-full" />
            </div>
          )}
        </div>

        {/* Player Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-cormorant font-bold mb-1">
                {testimonial.name}
              </h3>
              <p className="text-dlc-gold font-semibold mb-1">
                {t(testimonial.positionKey)}
              </p>
              <p className="text-dlc-text-secondary">
                {testimonial.team} • {t(testimonial.leagueKey)}
              </p>
            </div>
            <div className="flex">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-dlc-gold fill-current" />
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="flex flex-wrap gap-2">
            {testimonial.achievements.map((achievement: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 bg-dlc-gold/10 text-dlc-gold rounded-full text-sm"
              >
                <Trophy className="w-3 h-3 mr-1" />
                {achievement}
              </span>
            ))}
          </div>

          {/* Quote */}
          <div className="relative">
            <Quote className="w-8 h-8 text-dlc-gold/30 mb-2" />
            <blockquote className="text-lg italic text-dlc-text-secondary">
              &ldquo;{t(testimonial.quote)}&rdquo;
            </blockquote>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-dlc-elevation">
            {Object.entries(testimonial.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-dlc-gold">
                  {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : String(value)}
                </div>
                <div className="text-sm text-dlc-text-secondary">
                  {t(`stats.${key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-dlc-gold/5 via-transparent to-dlc-silver/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}

export function ProfessionalTestimonials() {
  const t = useTranslations('home.testimonials');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dlc-bg via-dlc-elevation/5 to-dlc-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,215,0,0.1),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.1),transparent_70%)]" />
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
            <Medal className="w-12 h-12 text-dlc-gold mr-4" />
            <h2 className="text-5xl md:text-6xl font-cormorant font-bold text-gradient">
              {t('title')}
            </h2>
            <Medal className="w-12 h-12 text-dlc-gold ml-4" />
          </div>
          <p className="text-xl text-dlc-text-secondary max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Main testimonial display */}
        <div className="max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <VideoTestimonial
              key={currentTestimonial}
              testimonial={testimonials[currentTestimonial]}
              isActive={true}
            />
          </AnimatePresence>
        </div>

        {/* Testimonial navigation */}
        <div className="flex justify-center space-x-4 mb-8">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => {
                setCurrentTestimonial(index);
                setIsAutoPlay(false);
              }}
              className={`p-4 rounded-xl transition-all ${
                index === currentTestimonial
                  ? 'bg-dlc-gold/10 border-2 border-dlc-gold'
                  : 'bg-dlc-elevation/30 hover:bg-dlc-elevation border-2 border-transparent'
              }`}
            >
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-dlc-elevation mb-2 mx-auto flex items-center justify-center">
                  <span className="text-xl font-bold text-dlc-gold">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="text-sm font-semibold">{testimonial.name.split(' ')[0]}</div>
                <div className="text-xs text-dlc-text-secondary">{t(testimonial.positionKey)}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass p-8 rounded-2xl text-center"
        >
          <h3 className="text-2xl font-cormorant font-bold mb-6">{t('summary.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-dlc-gold mb-2">100%</div>
              <div className="text-dlc-text-secondary">{t('summary.satisfaction')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-dlc-gold mb-2">15+</div>
              <div className="text-dlc-text-secondary">{t('summary.championships')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-dlc-gold mb-2">3x</div>
              <div className="text-dlc-text-secondary">{t('summary.performance')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
