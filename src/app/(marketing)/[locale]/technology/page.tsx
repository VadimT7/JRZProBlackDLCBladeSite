import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { TechnologyHero } from '@/components/technology/hero';
import { TechnologySections } from '@/components/technology/sections';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'technology' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function TechnologyPage() {
  return (
    <>
      <TechnologyHero />
      <TechnologySections />
    </>
  );
}
