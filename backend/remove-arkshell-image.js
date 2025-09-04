const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function removeArkshellImage() {
  await prisma.category.updateMany({
    where: { image: 'https://dato-cdn.strathberry.com/1753794713-family-arkshell.webp?fm=webp' },
    data: { image: null }
  });
  
  await prisma.product.deleteMany({
    where: { images: { has: 'https://dato-cdn.strathberry.com/1753794713-family-arkshell.webp?fm=webp' } }
  });
  
  console.log('✅ Removed arkshell image');
  await prisma.$disconnect();
}

removeArkshellImage();