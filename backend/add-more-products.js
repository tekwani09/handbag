const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addMoreProducts() {
  try {
    // New categories
    const newCategories = [
      {
        name: 'Tote Bags',
        slug: 'tote-bags',
        description: 'Spacious tote bags for everyday use',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
      },
      {
        name: 'Evening Bags',
        slug: 'evening-bags',
        description: 'Elegant bags for special occasions',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'
      },
      {
        name: 'Travel Bags',
        slug: 'travel-bags',
        description: 'Durable bags for travel',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'
      }
    ];

    const createdCategories = {};
    for (const cat of newCategories) {
      const category = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: cat,
        create: cat
      });
      createdCategories[cat.slug] = category;
      console.log(`✅ Created category: ${cat.name}`);
    }

    // Get existing categories
    const existingCategories = await prisma.category.findMany();
    existingCategories.forEach(cat => {
      createdCategories[cat.slug] = cat;
    });

    // More products
    const moreProducts = [
      // Tote Bags
      {
        name: 'Large Canvas Tote',
        slug: 'large-canvas-tote',
        description: 'Spacious canvas tote perfect for daily essentials',
        priceGBP: 145.00,
        priceUSD: 180.00,
        priceINR: 14500.00,
        sku: 'TOTE-CANVAS-001',
        inventory: 25,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
        featured: true,
        categorySlug: 'tote-bags'
      },
      {
        name: 'Leather Work Tote',
        slug: 'leather-work-tote',
        description: 'Professional leather tote with laptop compartment',
        priceGBP: 295.00,
        priceUSD: 365.00,
        priceINR: 29500.00,
        sku: 'TOTE-WORK-001',
        inventory: 18,
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800'],
        featured: true,
        categorySlug: 'tote-bags'
      },
      // Evening Bags
      {
        name: 'Sequin Evening Clutch',
        slug: 'sequin-evening-clutch',
        description: 'Glamorous sequin clutch for evening events',
        priceGBP: 225.00,
        priceUSD: 280.00,
        priceINR: 22500.00,
        sku: 'EVENING-SEQUIN-001',
        inventory: 12,
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800'],
        featured: true,
        categorySlug: 'evening-bags'
      },
      {
        name: 'Satin Evening Bag',
        slug: 'satin-evening-bag',
        description: 'Elegant satin evening bag with chain strap',
        priceGBP: 185.00,
        priceUSD: 230.00,
        priceINR: 18500.00,
        sku: 'EVENING-SATIN-001',
        inventory: 15,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
        featured: false,
        categorySlug: 'evening-bags'
      },
      // Travel Bags
      {
        name: 'Weekend Duffle',
        slug: 'weekend-duffle',
        description: 'Stylish duffle bag for weekend getaways',
        priceGBP: 385.00,
        priceUSD: 475.00,
        priceINR: 38500.00,
        sku: 'TRAVEL-DUFFLE-001',
        inventory: 10,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
        featured: true,
        categorySlug: 'travel-bags'
      },
      {
        name: 'Rolling Suitcase',
        slug: 'rolling-suitcase',
        description: 'Premium rolling suitcase with leather trim',
        priceGBP: 525.00,
        priceUSD: 650.00,
        priceINR: 52500.00,
        sku: 'TRAVEL-SUITCASE-001',
        inventory: 8,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'],
        featured: true,
        categorySlug: 'travel-bags'
      },
      // More accessories
      {
        name: 'Leather Keychain',
        slug: 'leather-keychain',
        description: 'Premium leather keychain with gold hardware',
        priceGBP: 35.00,
        priceUSD: 45.00,
        priceINR: 3500.00,
        sku: 'ACC-KEYCHAIN-001',
        inventory: 50,
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800'],
        featured: false,
        categorySlug: 'accessories'
      },
      {
        name: 'Phone Case Crossbody',
        slug: 'phone-case-crossbody',
        description: 'Stylish phone case with crossbody strap',
        priceGBP: 65.00,
        priceUSD: 80.00,
        priceINR: 6500.00,
        sku: 'ACC-PHONE-001',
        inventory: 30,
        images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800'],
        featured: false,
        categorySlug: 'accessories'
      },
      // More small bags
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
        categorySlug: 'small'
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
        categorySlug: 'small'
      }
    ];

    // Create products
    for (const prod of moreProducts) {
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

    console.log(`🎉 Added ${newCategories.length} new categories and ${moreProducts.length} new products!`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addMoreProducts();