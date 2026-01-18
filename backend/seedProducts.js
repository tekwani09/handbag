const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  try {
    // Read products from JSON file
    const productsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'products.json'), 'utf-8')
    );

    console.log('🌱 Starting to seed products...\n');

    // Create products in database
    for (const product of productsData) {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          imageUrl: product.mainImage, // Use main image as primary
          // Store all images as JSON string if your schema supports it
          // Or you can create a separate ProductImage model
        },
      });
      
      console.log(`✅ Created: ${createdProduct.name}`);
      console.log(`   💰 Price: £${createdProduct.price}`);
      console.log(`   📦 Stock: ${createdProduct.stock}`);
      console.log(`   📸 Images: ${product.images.length}`);
      console.log('');
    }

    console.log(`🎉 Successfully seeded ${productsData.length} product(s)!`);
    
    // Display summary
    const totalProducts = await prisma.product.count();
    console.log(`\n📊 Total products in database: ${totalProducts}`);
    
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
