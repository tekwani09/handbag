const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function populateEC2Database() {
  try {
    // Categories with images
    const categories = [
      {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Fashion accessories',
        image: 'https://dato-cdn.strathberry.com/1753794736-family-kite.webp?fm=webp'
      },
      {
        name: 'Small Bags',
        slug: 'small',
        description: 'Compact and elegant small handbags',
        image: 'https://dato-cdn.strathberry.com/1739554320-family-mosaic.webp?fm=webp'
      },
      {
        name: 'Clutches',
        slug: 'clutches',
        description: 'Evening clutches and small bags',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
      },
      {
        name: 'Shoulder Bags',
        slug: 'shoulder-bags',
        description: 'Comfortable shoulder bags',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800'
      },
      {
        name: 'Backpacks',
        slug: 'backpacks',
        description: 'Stylish backpacks',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
      },
      {
        name: 'Wallets',
        slug: 'wallets',
        description: 'Premium wallets',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'
      }
    ];

    // Create categories
    const createdCategories = {};
    for (const cat of categories) {
      const category = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: cat,
        create: cat
      });
      createdCategories[cat.slug] = category;
      console.log(`✅ Created category: ${cat.name}`);
    }

    // Products
    const products = [
      // Small Bags
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
        featured: true,
        categorySlug: 'small'
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
        featured: true,
        categorySlug: 'small'
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
        featured: true,
        categorySlug: 'small'
      },
      // Accessories
      {
        name: 'Leather Belt',
        slug: 'leather-belt',
        description: 'Premium leather belt with gold buckle',
        priceGBP: 85.00,
        priceUSD: 105.00,
        priceINR: 8500.00,
        sku: 'BELT-001',
        inventory: 25,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
        featured: false,
        categorySlug: 'accessories'
      },
      {
        name: 'Silk Scarf',
        slug: 'silk-scarf',
        description: 'Luxurious silk scarf with floral pattern',
        priceGBP: 125.00,
        priceUSD: 155.00,
        priceINR: 12500.00,
        sku: 'SCARF-001',
        inventory: 18,
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800'],
        featured: true,
        categorySlug: 'accessories'
      },
      // Clutches
      {
        name: 'Evening Clutch Gold',
        slug: 'evening-clutch-gold',
        description: 'Elegant gold evening clutch for special occasions',
        priceGBP: 195.00,
        priceUSD: 240.00,
        priceINR: 19500.00,
        sku: 'CLUTCH-GOLD-001',
        inventory: 8,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'],
        featured: true,
        categorySlug: 'clutches'
      },
      {
        name: 'Beaded Clutch',
        slug: 'beaded-clutch',
        description: 'Handcrafted beaded clutch with vintage charm',
        priceGBP: 165.00,
        priceUSD: 205.00,
        priceINR: 16500.00,
        sku: 'CLUTCH-BEADED-001',
        inventory: 12,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
        featured: false,
        categorySlug: 'clutches'
      },
      // Shoulder Bags
      {
        name: 'Classic Shoulder Bag',
        slug: 'classic-shoulder-bag',
        description: 'Timeless shoulder bag in premium leather',
        priceGBP: 385.00,
        priceUSD: 475.00,
        priceINR: 38500.00,
        sku: 'SHOULDER-CLASSIC-001',
        inventory: 15,
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800'],
        featured: true,
        categorySlug: 'shoulder-bags'
      },
      // Backpacks
      {
        name: 'Leather Backpack',
        slug: 'leather-backpack',
        description: 'Stylish leather backpack for modern professionals',
        priceGBP: 425.00,
        priceUSD: 525.00,
        priceINR: 42500.00,
        sku: 'BACKPACK-LEATHER-001',
        inventory: 10,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
        featured: true,
        categorySlug: 'backpacks'
      },
      // Wallets
      {
        name: 'Bifold Wallet',
        slug: 'bifold-wallet',
        description: 'Classic bifold wallet in genuine leather',
        priceGBP: 75.00,
        priceUSD: 95.00,
        priceINR: 7500.00,
        sku: 'WALLET-BIFOLD-001',
        inventory: 30,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
        featured: false,
        categorySlug: 'wallets'
      },
      {
        name: 'Card Holder',
        slug: 'card-holder',
        description: 'Minimalist card holder for essentials',
        priceGBP: 45.00,
        priceUSD: 55.00,
        priceINR: 4500.00,
        sku: 'CARDHOLDER-001',
        inventory: 40,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
        featured: false,
        categorySlug: 'wallets'
      }
    ];

    // Create products
    for (const prod of products) {
      const { categorySlug, ...productData } = prod;
      await prisma.product.upsert({
        where: { slug: prod.slug },
        update: productData,
        create: {
          ...productData,
          categoryId: createdCategories[categorySlug].id
        }
      });
      console.log(`✅ Created product: ${prod.name}`);
    }

    console.log('🎉 EC2 Database populated successfully!');
    console.log(`📊 Created ${categories.length} categories and ${products.length} products`);

  } catch (error) {
    console.error('❌ Error populating database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateEC2Database();