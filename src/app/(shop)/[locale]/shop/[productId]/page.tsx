import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { prisma } from '@/lib/prisma';
import { ProductDetail } from '@/components/shop/product-detail';

interface ProductPageProps {
  params: Promise<{
    locale: string;
    productId: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      name: true,
      description: true,
    },
  });

  if (!product) {
    return {
      title: 'Product Not Found | JRZ Pro Black DLC',
    };
  }

  return {
    title: `${product.name} | JRZ Pro Black DLC`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: ['/og-image.jpg'],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
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
        orderBy: { size: 'asc' },
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
  });

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product as any} />;
}
