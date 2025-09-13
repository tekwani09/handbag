const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function populateStories() {
  try {
    const stories = [
      {
        title: 'Behind the Scenes: Crafting Excellence',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400',
        link: 'https://instagram.com/strathberry',
        platform: 'instagram',
        featured: true
      },
      {
        title: 'New Collection Launch Event',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
        link: 'https://facebook.com/strathberry',
        platform: 'facebook',
        featured: true
      },
      {
        title: 'Sustainable Luxury Materials',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        link: 'https://twitter.com/strathberry',
        platform: 'twitter',
        featured: true
      },
      {
        title: 'Artisan Spotlight: Master Craftsmen',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
        link: 'https://instagram.com/strathberry',
        platform: 'instagram',
        featured: true
      },
      {
        title: 'Fashion Week Highlights',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400',
        link: 'https://facebook.com/strathberry',
        platform: 'facebook',
        featured: true
      }
    ];

    // Clear existing stories first
    await prisma.story.deleteMany({});
    
    for (const story of stories) {
      await prisma.story.create({
        data: story
      });
      console.log(`✅ Created story: ${story.title}`);
    }

    console.log('🎉 Stories populated successfully!');

  } catch (error) {
    console.error('❌ Error populating stories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

populateStories();