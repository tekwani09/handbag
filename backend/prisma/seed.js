const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Check if products already exist
  const existingProducts = await prisma.product.count();
  if (existingProducts > 0) {
    console.log(`⚠️  Database already has ${existingProducts} products. Skipping seed.`);
    console.log('\n📊 Seed check complete!');
    return;
  }

  // Parent product (Melody Tote - Black)
  const parent = await prisma.product.create({
    data: {
      name: 'Melody Tote',
      slug: 'melody-tote-black',
      description: 'Luxury handbag with premium materials and exquisite craftsmanship. The Melody Tote features a spacious interior, elegant design, and versatile style perfect for any occasion.',
      priceGBP: 545,
      priceUSD: 690,
      priceINR: 57500,
      sku: 'MELODY-TOTE-BLACK',
      inventory: 10,
      images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600', 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600'],
      productModelImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600',
      color: 'Black',
      colorHex: '#000000',
      featured: true,
      category: 'TOTES_TOP_HANDLE_BAGS',
      family: 'TOTE'
    },
  });
  console.log('✅ Created parent: Melody Tote - Black');

  // Variant 1 - Taupe
  await prisma.product.create({
    data: {
      name: 'Melody Tote',
      slug: 'melody-tote-taupe',
      description: 'Luxury handbag with premium materials and exquisite craftsmanship. The Melody Tote features a spacious interior, elegant design, and versatile style perfect for any occasion.',
      priceGBP: 545,
      priceUSD: 690,
      priceINR: 57500,
      sku: 'MELODY-TOTE-TAUPE',
      inventory: 8,
      images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600'],
      productModelImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600',
      color: 'Taupe',
      colorHex: '#B8A99A',
      featured: true,
      category: 'TOTES_TOP_HANDLE_BAGS',
      family: 'TOTE',
      parentProductId: parent.id,
    },
  });
  console.log('✅ Created variant: Melody Tote - Taupe');

  // Variant 2 - Navy
  await prisma.product.create({
    data: {
      name: 'Melody Tote',
      slug: 'melody-tote-navy',
      description: 'Luxury handbag with premium materials and exquisite craftsmanship. The Melody Tote features a spacious interior, elegant design, and versatile style perfect for any occasion.',
      priceGBP: 545,
      priceUSD: 690,
      priceINR: 57500,
      sku: 'MELODY-TOTE-NAVY',
      inventory: 12,
      images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600', 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600'],
      productModelImage: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600',
      color: 'Navy',
      colorHex: '#001F3F',
      featured: true,
      category: 'TOTES_TOP_HANDLE_BAGS',
      family: 'TOTE',
      parentProductId: parent.id,
    },
  });
  console.log('✅ Created variant: Melody Tote - Navy');

  // Variant 3 - Burgundy
  await prisma.product.create({
    data: {
      name: 'Melody Tote',
      slug: 'melody-tote-burgundy',
      description: 'Luxury handbag with premium materials and exquisite craftsmanship. The Melody Tote features a spacious interior, elegant design, and versatile style perfect for any occasion.',
      priceGBP: 545,
      priceUSD: 690,
      priceINR: 57500,
      sku: 'MELODY-TOTE-BURGUNDY',
      inventory: 6,
      images: ['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600', 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600'],
      productModelImage: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600',
      color: 'Burgundy',
      colorHex: '#800020',
      featured: true,
      category: 'TOTES_TOP_HANDLE_BAGS',
      family: 'TOTE',
      parentProductId: parent.id,
    },
  });
  console.log('✅ Created variant: Melody Tote - Burgundy');

  console.log('\n📊 Database seeded successfully!');
  console.log(`   - 4 Products (1 parent + 3 color variants)`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
