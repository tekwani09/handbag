const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearProducts() {
  try {
    await prisma.cartItem.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.product.deleteMany({});
    
    console.log('All products cleared successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

clearProducts();
