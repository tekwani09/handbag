const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addColorVariants() {
  try {
    // Example: Add color variants to a product
    const parentProduct = await prisma.product.findFirst({
      where: { name: { contains: 'Tote' } }
    });

    if (!parentProduct) {
      console.log('No parent product found');
      return;
    }

    const colors = [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Red', hex: '#DC143C' }
    ];

    for (const color of colors) {
      await prisma.product.create({
        data: {
          name: `${parentProduct.name} - ${color.name}`,
          slug: `${parentProduct.slug}-${color.name.toLowerCase()}`,
          description: parentProduct.description,
          priceGBP: parentProduct.priceGBP,
          priceUSD: parentProduct.priceUSD,
          priceINR: parentProduct.priceINR,
          sku: `${parentProduct.sku}-${color.name.toUpperCase()}`,
          inventory: parentProduct.inventory,
          categoryId: parentProduct.categoryId,
          images: parentProduct.images,
          color: color.name,
          colorHex: color.hex,
          parentProductId: parentProduct.id,
          active: true
        }
      });
      console.log(`Created ${color.name} variant`);
    }

    console.log('Color variants added successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addColorVariants();
