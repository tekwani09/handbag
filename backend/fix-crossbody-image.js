const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixCrossbodyImage() {
  await prisma.category.update({
    where: { slug: 'crossbody' },
    data: { image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800' }
  });
  
  console.log('✅ Fixed crossbody category image');
  await prisma.$disconnect();
}

fixCrossbodyImage();