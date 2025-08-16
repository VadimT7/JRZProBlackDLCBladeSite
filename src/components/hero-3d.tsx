'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// Dynamic import for React Three Fiber components
const ThreeScene = React.lazy(() => import('./three-scene'));

export function Hero3D() {
  const t = useTranslations('home.hero');
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Ensure the component only renders on the client
    setIsClient(true);
    
    // Add a small delay to ensure proper hydration
    const timer = setTimeout(() => {
      if (containerRef.current) {
        // Force a reflow to ensure proper dimensions
        containerRef.current.getBoundingClientRect();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle WebGL errors
  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('WebGL') || event.message.includes('THREE')) {
        console.error('WebGL Error:', event.message);
        setHasError(true);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (!isClient) {
    return (
      <div className="relative h-screen w-full overflow-hidden bg-dlc-bg">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="shimmer h-32 w-96 bg-dlc-elevation rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-dlc-bg via-dlc-bg to-dlc-elevation">
      {/* 3D Canvas */}
      <div ref={containerRef} className="absolute inset-0 bg-dlc-bg">
        <React.Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-dlc-bg">
            <div className="shimmer h-32 w-96 bg-dlc-elevation rounded-lg" />
          </div>
        }>
          {!hasError ? (
            <ThreeScene 
              onCreated={() => {
                setIsLoaded(true);
                setHasError(false);
              }} 
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-dlc-bg">
              <div className="text-dlc-text-secondary text-center">
                <p>Unable to load 3D scene</p>
                <button 
                  onClick={() => setHasError(false)}
                  className="mt-4 px-4 py-2 bg-dlc-elevation rounded-lg hover:bg-dlc-silver/10 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </React.Suspense>
      </div>

      {/* Fallback for loading */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-dlc-bg pointer-events-none">
          <div className="shimmer h-32 w-96 bg-dlc-elevation rounded-lg" />
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-cormorant font-bold mb-6"
          >
            <span className="text-gradient">{t('title')}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-dlc-text-secondary mb-8"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a href="#shop" className="inline-block">
                <button className="px-8 py-4 bg-gradient-to-r from-dlc-silver to-dlc-silver/80 text-dlc-bg font-semibold rounded-lg hover:from-dlc-silver/90 hover:to-dlc-silver/70 transition-all shadow-dlc hover:shadow-dlc-hover">
                  {t('cta')}
                </button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-dlc-text-secondary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
