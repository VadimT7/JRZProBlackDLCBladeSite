import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ReviewsHero } from '@/components/reviews/hero';
import { ReviewsList } from '@/components/reviews/list';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'reviews' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function ReviewsPage() {
  return (
    <>
      <ReviewsHero />
      <ReviewsList />
    </>
  );
}
