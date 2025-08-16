import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { OrderStatus } from '@/components/order/status';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'order.thanks' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
  };
}

interface PageProps {
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function OrderThanksPage({ searchParams }: PageProps) {
  const { orderId } = await searchParams;

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-dlc-text-secondary">Invalid order ID</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        <OrderStatus orderId={orderId} />
      </div>
    </div>
  );
}
