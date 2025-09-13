import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all stories
router.get('/', async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json({ stories });
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Failed to fetch stories' });
  }
});

// Get featured stories
router.get('/featured', async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      where: { 
        active: true,
        featured: true 
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    res.json({ stories });
  } catch (error) {
    console.error('Error fetching featured stories:', error);
    res.status(500).json({ error: 'Failed to fetch featured stories' });
  }
});

export default router;