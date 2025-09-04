const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteHandbags() {
  await prisma.category.delete({
    where: { slug: 'handbags' }
  });
  
  console.log('✅ Deleted handbags category');
  await prisma.$disconnect();
}

deleteHandbags();