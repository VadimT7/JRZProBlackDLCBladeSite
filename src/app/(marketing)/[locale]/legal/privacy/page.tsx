import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PrivacyPolicy } from '@/components/legal/privacy-policy';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal.privacy' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}