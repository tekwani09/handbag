const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixAllCategoryImages() {
  const updates = [
    { slug: 'backpacks', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800' },
    { slug: 'shoulder-bags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800' },
    { slug: 'wallets', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800' },
    { slug: 'clutches', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800' }
  ];

  for (const update of updates) {
    await prisma.category.update({
      where: { slug: update.slug },
      data: { image: update.image }
    });
    console.log(`Updated ${update.slug} with image`);
  }

  console.log('✅ All category images fixed');
  await prisma.$disconnect();
}

fixAllCategoryImages();