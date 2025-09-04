import express from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController'
import { auth, adminAuth } from '../middleware/auth'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:id', getProduct)

// Admin routes
router.post('/', adminAuth, createProduct)
router.put('/:id', adminAuth, updateProduct)
router.delete('/:id', adminAuth, deleteProduct)

export default router