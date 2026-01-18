const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting new category seed...\n');

  const productsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'products.json'), 'utf-8')
  );

  // Create new category
  const category = await prisma.category.upsert({
    where: { slug: 'crossbody-bags' },
    update: {},
    create: {
      name: 'Crossbody Bags',
      slug: 'crossbody-bags',
      description: 'Elegant crossbody bags collection',
    },
  });
  console.log('✅ Created category: Crossbody Bags');

  // Parent product
  const parent = await prisma.product.create({
    data: {
      name: 'East/West Mini',
      slug: 'east-west-mini-burgundy',
      description: 'Compact crossbody bag with croc-embossed leather and gold chain strap. Perfect for day-to-night styling with luxurious craftsmanship.',
      priceGBP: 395,
      priceUSD: 500,
      priceINR: 41500,
      sku: 'EAST-WEST-BURGUNDY',
      inventory: productsData[0].stock,
      images: productsData[0].images,
      productModelImage: productsData[0].images[1],
      color: 'Burgundy',
      colorHex: '#800020',
      featured: true,
      categoryId: category.id,
    },
  });
  console.log('✅ Created parent: East/West Mini - Burgundy');

  // Variant 1
  await prisma.product.create({
    data: {
      name: 'East/West Mini',
      slug: 'east-west-mini-black',
      description: 'Compact crossbody bag with croc-embossed leather and gold chain strap. Perfect for day-to-night styling with luxurious craftsmanship.',
      priceGBP: 395,
      priceUSD: 500,
      priceINR: 41500,
      sku: 'EAST-WEST-BLACK',
      inventory: productsData[1].stock,
      images: productsData[1].images,
      productModelImage: productsData[1].images[1],
      color: 'Black',
      colorHex: '#000000',
      featured: true,
      categoryId: category.id,
      parentProductId: parent.id,
    },
  });
  console.log('✅ Created variant: East/West Mini - Black');

  // Variant 2
  await prisma.product.create({
    data: {
      name: 'East/West Mini',
      slug: 'east-west-mini-navy',
      description: 'Compact crossbody bag with croc-embossed leather and gold chain strap. Perfect for day-to-night styling with luxurious craftsmanship.',
      priceGBP: 395,
      priceUSD: 500,
      priceINR: 41500,
      sku: 'EAST-WEST-NAVY',
      inventory: productsData[2].stock,
      images: productsData[2].images,
      productModelImage: productsData[2].images[1],
      color: 'Navy',
      colorHex: '#001F3F',
      featured: true,
      categoryId: category.id,
      parentProductId: parent.id,
    },
  });
  console.log('✅ Created variant: East/West Mini - Navy');

  // Variant 3
  await prisma.product.create({
    data: {
      name: 'East/West Mini',
      slug: 'east-west-mini-tan',
      description: 'Compact crossbody bag with croc-embossed leather and gold chain strap. Perfect for day-to-night styling with luxurious craftsmanship.',
      priceGBP: 395,
      priceUSD: 500,
      priceINR: 41500,
      sku: 'EAST-WEST-TAN',
      inventory: productsData[3]?.stock || 30,
      images: productsData[3].images,
      productModelImage: productsData[3].images[1],
      color: 'Tan',
      colorHex: '#D2B48C',
      featured: true,
      categoryId: category.id,
      parentProductId: parent.id,
    },
  });
  console.log('✅ Created variant: East/West Mini - Tan');

  console.log('\n📊 New category seeded successfully!');
  console.log(`   - 1 Category (Crossbody Bags)`);
  console.log(`   - 4 Products (1 parent + 3 variants)`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
