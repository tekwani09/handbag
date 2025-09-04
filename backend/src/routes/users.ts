import express from 'express'
import { getCart, addToCart, updateCartItem, removeFromCart } from '../controllers/userController'
import { auth } from '../middleware/auth'

const router = express.Router()

// Cart routes
router.get('/cart', auth, getCart)
router.post('/cart', auth, addToCart)
router.put('/cart/:itemId', auth, updateCartItem)
router.delete('/cart/:itemId', auth, removeFromCart)

export default router