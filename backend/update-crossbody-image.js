const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateCrossbodyImage() {
  await prisma.category.update({
    where: { slug: 'crossbody' },
    data: { image: 'https://dato-cdn.strathberry.com/1753794696-strathberry-mini-tote-black-crossbody-bag-producttype.webp?fm=webp' }
  });
  
  console.log('✅ Updated crossbody category with mini tote image');
  await prisma.$disconnect();
}

updateCrossbodyImage();