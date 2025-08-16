import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { CartDrawer } from '@/components/cart-drawer';

export default async function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navigation />
      <CartDrawer />
      <main className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}
