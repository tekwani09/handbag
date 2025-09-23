const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const handbagImages = [
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1591348122651-4c5d6b6b3d8a?w=800&h=800&fit=crop',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=800&fit=crop&sat=-20',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop&sat=-20',
  'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&h=800&fit=crop&sat=-20'
]

function getRandomImages(count = 4) {
  const shuffled = [...handbagImages].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

async function addMultipleImages() {
  try {
    const products = await prisma.product.findMany()
    
    console.log(`Found ${products.length} products. Adding multiple images...`)
    
    for (const product of products) {
      const images = getRandomImages(4)
      
      await prisma.product.update({
        where: { id: product.id },
        data: { images }
      })
      
      console.log(`✅ Updated ${product.name} with ${images.length} images`)
    }
    
    console.log('🎉 All products updated with multiple images!')
    
  } catch (error) {
    console.error('Error adding images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

addMultipleImages()