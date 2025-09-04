import express from 'express'
import { adminAuth } from '../middleware/auth'

const router = express.Router()

// All admin routes require admin authentication
router.use(adminAuth)

// Admin dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    
    const totalProducts = await prisma.product.count({ where: { active: true } })
    const totalOrders = await prisma.order.count()
    const revenueResult = await prisma.order.aggregate({ _sum: { total: true } })
    const lowStockItems = await prisma.product.count({ where: { inventory: { lt: 5 }, active: true } })
    
    res.json({
      totalProducts,
      totalOrders,
      revenue: revenueResult._sum.total || 0,
      lowStockItems
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get stats' })
  }
})

// Get categories
router.get('/categories', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()
    
    const categories = await prisma.category.findMany()
    res.json({ categories })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get categories' })
  }
})

// Get all users (admin only)
router.get('/users', async (req, res) => {
  try {
    // Mock users for now
    res.json({
      users: [
        { id: 1, email: 'john@example.com', role: 'CUSTOMER', createdAt: new Date() },
        { id: 2, email: 'admin@strathberry.com', role: 'ADMIN', createdAt: new Date() }
      ]
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to get users' })
  }
})

export default router