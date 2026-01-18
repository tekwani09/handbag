const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting products seed from JSON...\n');

  // Read products from JSON file
  const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'));

  // Clear existing products
  await prisma.product.deleteMany({});
  console.log('🗑️  Cleared existing products');

  // Create products from JSON
  for (const productData of productsData) {
    await prisma.product.create({
      data: {
        name: productData.name,
        slug: `${productData.name.toLowerCase().replace(/\s+/g, '-')}-${productData.id}`,
        description: productData.description,
        priceGBP: productData.price,
        priceUSD: Math.round(productData.price * 1.27),
        priceINR: Math.round(productData.price * 83),
        sku: `PRODUCT-${productData.id}`,
        inventory: productData.stock,
        images: productData.images,
        productModelImage: productData.mainImage,
        color: 'Black',
        colorHex: '#000000',
        featured: true,
        category: 'TOTES_TOP_HANDLE_BAGS',
        family: 'TOTE'
      },
    });
    console.log(`✅ Created: ${productData.name} (ID: ${productData.id})`);
  }

  console.log(`\n📊 Successfully seeded ${productsData.length} products!`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding products:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });