import express from 'express'
import { auth } from '../middleware/auth'
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/cartController'

const router = express.Router()

// All routes require authentication
router.use(auth)

router.get('/', getCart)
router.post('/', addToCart)
router.put('/:itemId', updateCartItem)
router.delete('/:itemId', removeFromCart)

export default router