const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateProducts() {
  try {
    console.log('🔄 Updating products with model images...');
    
    const updates = [
      { slug: 'the-nano-tote', productModelImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400' },
      { slug: 'the-mini-crossbody', productModelImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400' },
      { slug: 'the-classic-clutch', productModelImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400' },
      { slug: 'the-midi-satchel', productModelImage: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
      { slug: 'the-east-west-bag', productModelImage: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400' }
    ];

    for (const update of updates) {
      await prisma.product.update({
        where: { slug: update.slug },
        data: { productModelImage: update.productModelImage }
      });
      console.log(`✅ Updated: ${update.slug}`);
    }

    console.log('🎉 Products updated successfully!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updateProducts();