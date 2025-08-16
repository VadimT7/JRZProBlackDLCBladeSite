import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PlayerVsGoalieHero } from '@/components/player-vs-goalie/hero';
import { ComparisonCards } from '@/components/player-vs-goalie/comparison';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'playerVsGoalie' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function PlayerVsGoaliePage() {
  return (
    <>
      <PlayerVsGoalieHero />
      <ComparisonCards />
    </>
  );
}
