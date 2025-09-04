const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addSmallImages() {
  try {
    // Create or get the "small" category
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

    // Products with the provided images
    const products = [
      {
        name: 'Mosaic Small Bag',
        slug: 'mosaic-small-bag',
        description: 'Elegant mosaic pattern small handbag with premium leather finish',
        priceGBP: 295.00,
        priceUSD: 365.00,
        priceINR: 30500.00,
        sku: 'MOSAIC-SMALL-001',
        inventory: 15,
        images: ['https://dato-cdn.strathberry.com/1739554320-family-mosaic.webp?fm=webp'],
        featured: true
      },
      {
        name: 'Kite Small Bag',
        slug: 'kite-small-bag',
        description: 'Contemporary kite-shaped small bag with modern design elements',
        priceGBP: 275.00,
        priceUSD: 340.00,
        priceINR: 28500.00,
        sku: 'KITE-SMALL-001',
        inventory: 12,
        images: ['https://dato-cdn.strathberry.com/1753794736-family-kite.webp?fm=webp'],
        featured: true
      },
      {
        name: 'Mini Tote Black',
        slug: 'mini-tote-black',
        description: 'Classic mini tote in sophisticated black leather with crossbody strap',
        priceGBP: 325.00,
        priceUSD: 400.00,
        priceINR: 33500.00,
        sku: 'MINI-TOTE-BLACK-001',
        inventory: 20,
        images: ['https://dato-cdn.strathberry.com/1753794696-strathberry-mini-tote-black-crossbody-bag-producttype.webp?fm=webp'],
        featured: true
      },
      {
        name: 'Arkshell Small Bag',
        slug: 'arkshell-small-bag',
        description: 'Unique arkshell-inspired design with curved silhouette and premium craftsmanship',
        priceGBP: 285.00,
        priceUSD: 350.00,
        priceINR: 29500.00,
        sku: 'ARKSHELL-SMALL-001',
        inventory: 10,
        images: ['https://dato-cdn.strathberry.com/1753794713-family-arkshell.webp?fm=webp'],
        featured: true
      }
    ];

    // Add products to database
    for (const productData of products) {
      await prisma.product.upsert({
        where: { slug: productData.slug },
        update: productData,
        create: {
          ...productData,
          categoryId: smallCategory.id
        }
      });
      console.log(`Added product: ${productData.name}`);
    }

    console.log('✅ Successfully added all small bag products with images');
  } catch (error) {
    console.error('❌ Error adding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addSmallImages();