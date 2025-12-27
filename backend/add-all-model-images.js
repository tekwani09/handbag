const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addModelImages() {
  try {
    const modelImages = [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400'
    ];

    const products = await prisma.product.findMany({
      where: { productModelImage: null }
    });

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const modelImage = modelImages[i % modelImages.length];
      
      await prisma.product.update({
        where: { id: product.id },
        data: { productModelImage: modelImage }
      });
      
      console.log(`✅ Updated ${product.name} with model image`);
    }

    console.log('🎉 All products updated with model images!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addModelImages();