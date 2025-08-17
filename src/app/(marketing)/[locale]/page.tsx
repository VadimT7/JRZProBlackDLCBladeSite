import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroVideo } from '@/components/hero-video';
import { Features } from '@/components/features';
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
      <CallToAction />
    </>
  );
}
