'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { Zap, Target, Clock, TrendingUp, Award, Activity } from 'lucide-react';

const metrics = [
  {
    icon: Zap,
    value: 3.2,
    suffix: 'x',
    titleKey: 'edgeRetention',
    descriptionKey: 'edgeRetentionDesc',
    color: 'text-dlc-gold',
    bgColor: 'bg-dlc-gold/10',
    delay: 0.1
  },
  {
    icon: Target,
    value: 0.001,
    prefix: '±',
    suffix: '"',
    titleKey: 'precision',
    descriptionKey: 'precisionDesc',
    color: 'text-dlc-silver',
    bgColor: 'bg-dlc-silver/10',
    delay: 0.2
  },
  {
    icon: Clock,
    value: 50,
    suffix: '%',
    titleKey: 'longerSharpening',
    descriptionKey: 'longerSharpeningDesc',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    delay: 0.3
  },
  {
    icon: TrendingUp,
    value: 98.7,
    suffix: '%',
    titleKey: 'satisfaction',
    descriptionKey: 'satisfactionDesc',
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    delay: 0.4
  },
  {
    icon: Award,
    value: 127,
    titleKey: 'championships',
    descriptionKey: 'championshipsDesc',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    delay: 0.5
  },
  {
    icon: Activity,
    value: 2850,
    suffix: '°C',
    titleKey: 'hardness',
    descriptionKey: 'hardnessDesc',
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
    delay: 0.6
  }
];

function AnimatedCounter({ 
  value, 
  prefix = '', 
  suffix = '', 
  duration = 2000 
}: { 
  value: number; 
  prefix?: string; 
  suffix?: string; 
  duration?: number; 
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let startTime: number;
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        if (progress < 1) {
          setCount(value * progress);
          requestAnimationFrame(animate);
        } else {
          setCount(value);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [inView, value, duration]);

  return (
    <span ref={ref} className="font-mono">
      {prefix}{count.toFixed(value < 1 ? 3 : value < 10 ? 1 : 0)}{suffix}
    </span>
  );
}

export function PerformanceMetrics() {
  const t = useTranslations('home.metrics');

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dlc-bg via-dlc-elevation/20 to-dlc-bg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent_50%)]" />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.titleKey}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: metric.delay,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="glass glass-hover p-8 rounded-2xl text-center relative overflow-hidden">
                {/* Animated background glow */}
                <div className={`absolute inset-0 ${metric.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-full ${metric.bgColor} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <metric.icon className={`w-10 h-10 ${metric.color}`} />
                  </div>
                  
                  <div className={`text-4xl md:text-5xl font-bold mb-4 ${metric.color}`}>
                    <AnimatedCounter 
                      value={metric.value} 
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                    />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">
                    {t(metric.titleKey)}
                  </h3>
                  
                  <p className="text-dlc-text-secondary">
                    {t(metric.descriptionKey)}
                  </p>
                </div>

                {/* Hover effect particles */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 ${metric.color} rounded-full animate-pulse`}
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-dlc-text-secondary mb-6">
            {t('cta')}
          </p>
          <div className="inline-flex items-center space-x-2 text-dlc-gold font-semibold">
            <Zap className="w-5 h-5" />
            <span>{t('ctaText')}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
