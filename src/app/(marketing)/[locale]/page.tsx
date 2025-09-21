import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroVideo } from '@/components/hero-video';
import { Features } from '@/components/features';
import { PerformanceMetrics } from '@/components/performance-metrics';
import { InteractiveShowcase } from '@/components/interactive-showcase';
import { ScienceVisualization } from '@/components/science-visualization';
import { ProfessionalTestimonials } from '@/components/professional-testimonials';
import { ChampionshipTracker } from '@/components/championship-tracker';
import { InnovationTimeline } from '@/components/innovation-timeline';
import { CallToAction } from '@/components/call-to-action';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HeroVideo />
      <Features />
      <PerformanceMetrics />
      <InteractiveShowcase />
      <ScienceVisualization />
      <ProfessionalTestimonials />
      <ChampionshipTracker />
      <InnovationTimeline />
      <CallToAction />
    </>
  );
}
