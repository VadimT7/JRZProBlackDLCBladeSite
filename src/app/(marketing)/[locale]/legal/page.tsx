import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { LegalOverview } from '@/components/legal/overview';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.overview' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function LegalPage() {
  return <LegalOverview />;
}
