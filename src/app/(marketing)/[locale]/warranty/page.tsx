import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { WarrantySections } from '@/components/warranty/sections';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'warranty' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        titleKey="warranty.hero.title"
        subtitleKey="warranty.hero.subtitle"
      />
      <WarrantySections />
    </>
  );
}
