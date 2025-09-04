import express from 'express'
import { createOrder, getOrders, getOrder } from '../controllers/orderController'
import { auth, adminAuth } from '../middleware/auth'

const router = express.Router()

// User routes
router.post('/', auth, createOrder)
router.get('/', auth, getOrders)
router.get('/:id', auth, getOrder)



export default router