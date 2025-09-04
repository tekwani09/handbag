const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addCategories() {
  const newCategories = [
    { name: 'Clutches', slug: 'clutches' },
    { name: 'Backpacks', slug: 'backpacks' },
    { name: 'Crossbody', slug: 'crossbody' },
    { name: 'Shoulder Bags', slug: 'shoulder-bags' },
    { name: 'Wallets', slug: 'wallets' }
  ];

  for (const category of newCategories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    });
  }

  console.log('✅ Added 5 new categories');
  await prisma.$disconnect();
}

addCategories();
