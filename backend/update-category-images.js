const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateCategoryImages() {
  const images = [
    'https://dato-cdn.strathberry.com/1739554320-family-mosaic.webp?fm=webp',
    'https://dato-cdn.strathberry.com/1753794736-family-kite.webp?fm=webp',
    'https://dato-cdn.strathberry.com/1753794696-strathberry-mini-tote-black-crossbody-bag-producttype.webp?fm=webp',
    'https://dato-cdn.strathberry.com/1753794713-family-arkshell.webp?fm=webp'
  ];

  const updates = [
    { slug: 'handbags', image: images[0] },
    { slug: 'accessories', image: images[1] },
    { slug: 'leather-goods', image: images[2] },
    { slug: 'clutches', image: images[3] }
  ];

  for (const update of updates) {
    await prisma.category.update({
      where: { slug: update.slug },
      data: { image: update.image }
    });
    console.log(`Updated ${update.slug} with image`);
  }

  console.log('✅ All category images updated');
  await prisma.$disconnect();
}

updateCategoryImages();