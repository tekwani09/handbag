const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixSmallProducts() {
  try {
    // Create small bags category if it doesn't exist
    const smallCategory = await prisma.category.upsert({
      where: { slug: 'small' },
      update: {},
      create: {
        name: 'Small Bags',
        slug: 'small',
        description: 'Compact and elegant small handbags',
        image: 'https://dato-cdn.strathberry.com/1739554320-family-mosaic.webp?fm=webp'
      }
    });

    // Add the remaining products
    const products = [
      {
        name: 'Mini Crossbody',
        slug: 'mini-crossbody',
        description: 'Compact crossbody bag for essentials',
        priceGBP: 165.00,
        priceUSD: 205.00,
        priceINR: 16500.00,
        sku: 'SMALL-CROSS-001',
        inventory: 22,
        images: ['https://dato-cdn.strathberry.com/1739554320-family-mosaic.webp?fm=webp'],
        featured: true,
        categoryId: smallCategory.id
      },
      {
        name: 'Belt Bag',
        slug: 'belt-bag',
        description: 'Trendy belt bag for hands-free convenience',
        priceGBP: 125.00,
        priceUSD: 155.00,
        priceINR: 12500.00,
        sku: 'SMALL-BELT-001',
        inventory: 28,
        images: ['https://dato-cdn.strathberry.com/1753794736-family-kite.webp?fm=webp'],
        featured: false,
        categoryId: smallCategory.id
      }
    ];

    for (const prod of products) {
      await prisma.product.upsert({
        where: { slug: prod.slug },
        update: prod,
        create: prod
      });
      console.log(`✅ Created product: ${prod.name}`);
    }

    console.log('✅ Fixed small products!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixSmallProducts();