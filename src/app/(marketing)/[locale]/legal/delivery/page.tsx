import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { DeliveryTerms } from '@/components/legal/delivery-terms';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.delivery' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function DeliveryPage() {
  return <DeliveryTerms />;
}