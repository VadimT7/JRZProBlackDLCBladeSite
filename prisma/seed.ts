import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  // Create main product
  const product = await prisma.product.create({
    data: {
      name: 'JRZ Pro Black DLC',
      slug: 'jrz-pro-black-dlc',
      description: 'Premium hockey skate blades with Diamond-Like Carbon coating for superior edge retention and glide performance.',
      price: 15990, // 15,990 RUB
      currency: 'RUB',
      images: JSON.stringify([
        '/images/product/hero.jpg',
        '/images/product/dlc-texture.jpg',
        '/images/product/profile.jpg',
        '/images/product/edge-bite.jpg'
      ]),
    },
  });

  console.log('✅ Created main product:', product.name);

  // Create Player variants
  const playerSizes = [
    { size: '254', description: 'Player Blade - Size 254mm', price: 15990 },
    { size: '259', description: 'Player Blade - Size 259mm', price: 15990 },
    { size: '263', description: 'Player Blade - Size 263mm', price: 15990 },
    { size: '272', description: 'Player Blade - Size 272mm', price: 15990 },
    { size: '281', description: 'Player Blade - Size 281mm', price: 15990 },
    { size: '290', description: 'Player Blade - Size 290mm', price: 15990 },
    { size: '299', description: 'Player Blade - Size 299mm', price: 15990 },
    { size: '308', description: 'Player Blade - Size 308mm', price: 15990 },
    { size: '317', description: 'Player Blade - Size 317mm', price: 15990 },
  ];

  for (const sizeData of playerSizes) {
    await prisma.variant.create({
      data: {
        productId: product.id,
        type: 'player',
        size: sizeData.size,
        sku: `JRZ-PRO-DLC-PLAYER-${sizeData.size}`,
        stock: 100,
      },
    });
  }

  // Create Goalie variants
  const goalieSizes = [
    { size: '254', description: 'Goalie Blade - Size 254mm', price: 15990 },
    { size: '259', description: 'Goalie Blade - Size 259mm', price: 15990 },
    { size: '263', description: 'Goalie Blade - Size 263mm', price: 15990 },
    { size: '272', description: 'Goalie Blade - Size 272mm', price: 15990 },
    { size: '281', description: 'Goalie Blade - Size 281mm', price: 15990 },
    { size: '290', description: 'Goalie Blade - Size 290mm', price: 15990 },
    { size: '299', description: 'Goalie Blade - Size 299mm', price: 15990 },
    { size: '308', description: 'Goalie Blade - Size 308mm', price: 15990 },
    { size: '317', description: 'Goalie Blade - Size 317mm', price: 15990 },
  ];

  for (const sizeData of goalieSizes) {
    await prisma.variant.create({
      data: {
        productId: product.id,
        type: 'goalie',
        size: sizeData.size,
        sku: `JRZ-PRO-DLC-GOALIE-${sizeData.size}`,
        stock: 100,
      },
    });
  }

  console.log('✅ Created 16 product variants (8 Player + 8 Goalie)');

  // Create sample orders for testing
  const sampleOrder = await prisma.order.create({
    data: {
      email: 'test@example.com',
      phone: '+79991234567',
      totalAmount: 15990,
      currency: 'RUB',
      status: 'pending',
      idempotenceKey: 'sample-order-key',
    },
  });

  // Get a variant for the sample order
  const variant = await prisma.variant.findFirst();
  if (variant) {
    await prisma.orderItem.create({
      data: {
        orderId: sampleOrder.id,
        variantId: variant.id,
        quantity: 1,
        price: 15990,
      },
    });
  }

  console.log('✅ Created sample order for testing');

  console.log('🎉 Database seeding completed!');
  console.log('');
  console.log('📊 Summary:');
  console.log('• 1 main product created');
  console.log('• 16 variants created (8 Player + 8 Goalie)');
  console.log('• 1 sample order created');
  console.log('');
  console.log('🚀 You can now start the development server with: npm run dev');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
