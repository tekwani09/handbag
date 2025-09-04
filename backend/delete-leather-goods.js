const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteLeatherGoods() {
  await prisma.product.updateMany({
    where: { category: { slug: 'leather-goods' } },
    data: { categoryId: (await prisma.category.findFirst({ where: { slug: 'accessories' } })).id }
  });
  
  await prisma.category.delete({
    where: { slug: 'leather-goods' }
  });
  
  console.log('✅ Deleted leather goods category');
  await prisma.$disconnect();
}

deleteLeatherGoods();