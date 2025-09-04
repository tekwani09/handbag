const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteCrossbody() {
  await prisma.category.delete({
    where: { slug: 'crossbody' }
  });
  
  console.log('✅ Deleted crossbody category');
  await prisma.$disconnect();
}

deleteCrossbody();