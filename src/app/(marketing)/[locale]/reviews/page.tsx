import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
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
      <PageHero
        titleKey="reviews.hero.title"
        subtitleKey="reviews.hero.subtitle"
      />
      <ReviewsList />
    </>
  );
}
