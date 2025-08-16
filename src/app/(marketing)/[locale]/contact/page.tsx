import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/page-hero';
import { ContactForm } from '@/components/contact/form';
import { ContactInfo } from '@/components/contact/info';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
    description: t('hero.subtitle'),
  };
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        titleKey="contact.hero.title"
        subtitleKey="contact.hero.subtitle"
      />
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
