'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export function ShopHero() {
  const t = useTranslations('shop');

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Premium Flowing Animation Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dlc-bg via-dlc-elevation/50 to-dlc-bg" />
        
        {/* Dynamic Glitter Animation */}
        <div className="absolute inset-0 opacity-35">
          {/* Slow dancing glitter */}
          <div className="absolute inset-0">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-dlc-gold rounded-full animate-[fastGlitter_8s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${6 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
          
          {/* Medium floating sparkles */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-br from-dlc-gold to-dlc-silver rounded-full animate-[floatingSparkle_12s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 12}s`,
                }}
              />
            ))}
          </div>
          
          {/* Large luxury diamonds */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-gradient-to-br from-dlc-gold via-dlc-silver to-dlc-gold rounded-full animate-[luxuryDiamond_15s_ease-in-out_infinite]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 15}s`,
                }}
              />
            ))}
          </div>
          
          {/* Shooting stars */}
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-8 bg-gradient-to-b from-dlc-gold to-transparent animate-[shootingStar_20s_linear_infinite]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 20}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Dynamic Glitter CSS Animations */}
      <style jsx>{`
        @keyframes fastGlitter {
          0%, 100% { 
            opacity: 0; 
            transform: scale(0.5) translateY(0px);
          }
          25% { 
            opacity: 0.8; 
            transform: scale(1.5) translateY(-10px);
          }
          50% { 
            opacity: 1; 
            transform: scale(2) translateY(-5px);
          }
          75% { 
            opacity: 0.6; 
            transform: scale(1.2) translateY(-15px);
          }
        }
        @keyframes floatingSparkle {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(1) translateY(0px) translateX(0px);
          }
          20% { 
            opacity: 0.9; 
            transform: scale(1.8) translateY(-20px) translateX(10px);
          }
          40% { 
            opacity: 1; 
            transform: scale(0.6) translateY(-10px) translateX(-5px);
          }
          60% { 
            opacity: 0.7; 
            transform: scale(2.2) translateY(-25px) translateX(15px);
          }
          80% { 
            opacity: 0.4; 
            transform: scale(1.4) translateY(-5px) translateX(-10px);
          }
        }
        @keyframes luxuryDiamond {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1) translateY(0px);
            filter: brightness(1);
          }
          33% { 
            opacity: 1; 
            transform: scale(1.8) translateY(-30px);
            filter: brightness(1.5);
          }
          66% { 
            opacity: 0.8; 
            transform: scale(0.8) translateY(-15px);
            filter: brightness(1.2);
          }
        }
        @keyframes shootingStar {
          0% { 
            opacity: 0; 
            transform: translateY(-20px) translateX(-20px) scaleY(0.5);
          }
          10% { 
            opacity: 1; 
            transform: translateY(0px) translateX(0px) scaleY(1);
          }
          90% { 
            opacity: 0.8; 
            transform: translateY(100vh) translateX(50px) scaleY(2);
          }
          100% { 
            opacity: 0; 
            transform: translateY(120vh) translateX(60px) scaleY(0.5);
          }
        }
      `}</style>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-cormorant font-bold mb-4">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-xl text-dlc-text-secondary">
            {useTranslations('common')('tagline')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
