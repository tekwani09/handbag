const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addProducts() {
  try {
    console.log('🔄 Adding products...');
    
    // Get first category
    const category = await prisma.category.findFirst();
    if (!category) {
      console.log('❌ No categories found. Please add categories first.');
      return;
    }

    const products = [
      {
        name: 'The Nano Tote',
        slug: 'the-nano-tote',
        description: 'A miniature version of our iconic tote bag, perfect for essentials.',
        priceGBP: 295.00,
        priceUSD: 375.00,
        priceINR: 31000.00,
        sku: 'NT001',
        inventory: 25,
        images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
        featured: true,
        categoryId: category.id
      },
      {
        name: 'The Mini Crossbody',
        slug: 'the-mini-crossbody',
        description: 'Compact crossbody bag crafted from premium leather.',
        priceGBP: 245.00,
        priceUSD: 315.00,
        priceINR: 26000.00,
        sku: 'MC001',
        inventory: 30,
        images: ['https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400'],
        featured: true,
        categoryId: category.id
      },
      {
        name: 'The Classic Clutch',
        slug: 'the-classic-clutch',
        description: 'Elegant evening clutch with signature hardware.',
        priceGBP: 195.00,
        priceUSD: 250.00,
        priceINR: 20500.00,
        sku: 'CC001',
        inventory: 20,
        images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'],
        featured: true,
        categoryId: category.id
      },
      {
        name: 'The Midi Satchel',
        slug: 'the-midi-satchel',
        description: 'Structured satchel with adjustable strap.',
        priceGBP: 395.00,
        priceUSD: 505.00,
        priceINR: 41500.00,
        sku: 'MS001',
        inventory: 15,
        images: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'],
        featured: true,
        categoryId: category.id
      },
      {
        name: 'The East West Bag',
        slug: 'the-east-west-bag',
        description: 'Contemporary design with clean lines and premium finish.',
        priceGBP: 345.00,
        priceUSD: 440.00,
        priceINR: 36000.00,
        sku: 'EW001',
        inventory: 18,
        images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400'],
        featured: true,
        categoryId: category.id
      }
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
      console.log(`✅ Created: ${product.name}`);
    }

    console.log('🎉 Products added successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addProducts();