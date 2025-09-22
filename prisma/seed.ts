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
    { size: '36', description: 'Player Blade - Size 36', price: 15990 },
    { size: '37', description: 'Player Blade - Size 37', price: 15990 },
    { size: '38', description: 'Player Blade - Size 38', price: 15990 },
    { size: '39', description: 'Player Blade - Size 39', price: 15990 },
    { size: '40', description: 'Player Blade - Size 40', price: 15990 },
    { size: '41', description: 'Player Blade - Size 41', price: 15990 },
    { size: '42', description: 'Player Blade - Size 42', price: 15990 },
    { size: '43', description: 'Player Blade - Size 43', price: 15990 },
    { size: '44', description: 'Player Blade - Size 44', price: 15990 },
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
    { size: '36', description: 'Goalie Blade - Size 36', price: 15990 },
    { size: '37', description: 'Goalie Blade - Size 37', price: 15990 },
    { size: '38', description: 'Goalie Blade - Size 38', price: 15990 },
    { size: '39', description: 'Goalie Blade - Size 39', price: 15990 },
    { size: '40', description: 'Goalie Blade - Size 40', price: 15990 },
    { size: '41', description: 'Goalie Blade - Size 41', price: 15990 },
    { size: '42', description: 'Goalie Blade - Size 42', price: 15990 },
    { size: '43', description: 'Goalie Blade - Size 43', price: 15990 },
    { size: '44', description: 'Goalie Blade - Size 44', price: 15990 },
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

  console.log('✅ Created 18 product variants (9 Player + 9 Goalie)');

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
  console.log('• 18 variants created (9 Player + 9 Goalie)');
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
