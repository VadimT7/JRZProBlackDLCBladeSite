import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { SharpeningSections } from '@/components/sharpening/sections';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sharpening' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function SharpeningPage() {
  return (
    <>
      <PageHero
        titleKey="sharpening.hero.title"
        subtitleKey="sharpening.hero.subtitle"
      />
      <SharpeningSections />
    </>
  );
}
