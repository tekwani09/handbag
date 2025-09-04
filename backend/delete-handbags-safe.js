const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteHandbagsSafe() {
  // First move products to another category
  await prisma.product.updateMany({
    where: { category: { slug: 'handbags' } },
    data: { categoryId: (await prisma.category.findFirst({ where: { slug: 'accessories' } })).id }
  });
  
  // Then delete the category
  await prisma.category.delete({
    where: { slug: 'handbags' }
  });
  
  console.log('✅ Deleted handbags category safely');
  await prisma.$disconnect();
}

deleteHandbagsSafe();