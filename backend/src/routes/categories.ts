import { Router } from 'express';

const router = Router();

// Get all categories (now returns enum values)
router.get('/', async (req, res) => {
  try {
    const categories = [
      { id: 'CROSSBODY_BAGS', name: 'Crossbody Bags', slug: 'crossbody-bags' },
      { id: 'TOTES_TOP_HANDLE_BAGS', name: 'Totes & Top-Handle Bags', slug: 'totes-top-handle-bags' },
      { id: 'SMALL_MINI_BAGS', name: 'Small & Mini Bags', slug: 'small-mini-bags' },
      { id: 'SHOULDER_BAGS', name: 'Shoulder Bags', slug: 'shoulder-bags' },
      { id: 'EVENING_BAGS', name: 'Evening Bags', slug: 'evening-bags' },
      { id: 'TRAVEL_BAGS', name: 'Travel Bags', slug: 'travel-bags' },
      { id: 'RAFFIA_BAGS', name: 'Raffia Bags', slug: 'raffia-bags' },
      { id: 'EMBOSSED_BAGS', name: 'Embossed Bags', slug: 'embossed-bags' },
      { id: 'SUEDE_BAGS', name: 'Suede Bags', slug: 'suede-bags' }
    ];

    res.json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// Get category by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    const categories = [
      { id: 'CROSSBODY_BAGS', name: 'Crossbody Bags', slug: 'crossbody-bags' },
      { id: 'TOTES_TOP_HANDLE_BAGS', name: 'Totes & Top-Handle Bags', slug: 'totes-top-handle-bags' },
      { id: 'SMALL_MINI_BAGS', name: 'Small & Mini Bags', slug: 'small-mini-bags' },
      { id: 'SHOULDER_BAGS', name: 'Shoulder Bags', slug: 'shoulder-bags' },
      { id: 'EVENING_BAGS', name: 'Evening Bags', slug: 'evening-bags' },
      { id: 'TRAVEL_BAGS', name: 'Travel Bags', slug: 'travel-bags' },
      { id: 'RAFFIA_BAGS', name: 'Raffia Bags', slug: 'raffia-bags' },
      { id: 'EMBOSSED_BAGS', name: 'Embossed Bags', slug: 'embossed-bags' },
      { id: 'SUEDE_BAGS', name: 'Suede Bags', slug: 'suede-bags' }
    ];
    
    const category = categories.find(cat => cat.slug === slug);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category'
    });
  }
});

export default router;