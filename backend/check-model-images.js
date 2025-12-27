const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        images: true,
        productModelImage: true
      }
    });
    
    console.log('Products with model images:');
    products.forEach(product => {
      console.log(`${product.name}: ${product.productModelImage || 'NO MODEL IMAGE'}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkProducts();