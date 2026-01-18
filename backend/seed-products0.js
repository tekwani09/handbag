const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting products seed from products0.json...\n');

  // Read products from JSON file
  const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'products0.json'), 'utf8'));

  // Create parent product (first one)
  const parentData = productsData[0];
  const parent = await prisma.product.create({
    data: {
      name: parentData.name,
      slug: `melody-tote-black-v2`,
      description: parentData.description,
      priceGBP: parentData.price,
      priceUSD: Math.round(parentData.price * 1.27),
      priceINR: Math.round(parentData.price * 83),
      sku: `MELODY-TOTE-BLACK`,
      inventory: parentData.stock,
      images: parentData.images,
      productModelImage: parentData.mainImage,
      color: 'Black',
      colorHex: '#000000',
      featured: true,
      category: 'TOTES_TOP_HANDLE_BAGS',
      family: 'TOTE'
    },
  });
  console.log(`✅ Created parent: ${parentData.name} - Black`);

  // Create color variants (remaining products)
  const colors = ['Navy', 'Burgundy', 'Taupe'];
  const colorHexes = ['#001F3F', '#800020', '#B8A99A'];

  for (let i = 1; i < productsData.length; i++) {
    const variantData = productsData[i];
    await prisma.product.create({
      data: {
        name: variantData.name,
        slug: `melody-tote-${colors[i-1].toLowerCase()}-v2`,
        description: variantData.description,
        priceGBP: variantData.price,
        priceUSD: Math.round(variantData.price * 1.27),
        priceINR: Math.round(variantData.price * 83),
        sku: `MELODY-TOTE-${colors[i-1].toUpperCase()}`,
        inventory: variantData.stock,
        images: variantData.images,
        productModelImage: variantData.mainImage,
        color: colors[i-1],
        colorHex: colorHexes[i-1],
        featured: true,
        category: 'TOTES_TOP_HANDLE_BAGS',
        family: 'TOTE',
        parentProductId: parent.id,
      },
    });
    console.log(`✅ Created variant: ${variantData.name} - ${colors[i-1]}`);
  }

  console.log(`\n📊 Successfully seeded ${productsData.length} products with parent-child relationships!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });