import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { ShopHero } from '@/components/shop/hero';
import { ProductCard } from '@/components/shop/product-card';

type ProductWithVariants = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  variants: {
    id: string;
    productId: string;
    type: string;
    size: string;
    sku: string;
    stock: number;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'shop' });
  
  return {
    title: `${t('title')} | JRZ Pro Black DLC`,
  };
}

export default async function ShopPage() {
  const product = await prisma.product.findFirst({
    where: { active: true },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      currency: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      variants: {
        where: { active: true },
        select: {
          id: true,
          productId: true,
          type: true,
          size: true,
          sku: true,
          stock: true,
          active: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  }) as ProductWithVariants | null;

  return (
    <>
      <ShopHero />
      <section className="py-24">
        <div className="container mx-auto px-4">
          {product ? (
            <ProductCard product={product} />
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-dlc-text-secondary">Products coming soon...</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
