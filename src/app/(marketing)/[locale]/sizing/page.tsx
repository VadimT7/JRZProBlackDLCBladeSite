import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SizingHero } from '@/components/sizing/hero';
import { SizingTable } from '@/components/sizing/table';
import { SizingGuide } from '@/components/sizing/guide';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sizing' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function SizingPage() {
  return (
    <>
      <SizingHero />
      <SizingTable />
      <SizingGuide />
    </>
  );
}
