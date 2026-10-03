import express from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController'
import { auth, adminAuth } from '../middleware/auth'
import { productCreateValidation, productUpdateValidation } from '../middleware/validation'

const router = express.Router()

// Public routes
router.get('/', getProducts)
router.get('/:id', getProduct)

// Admin routes with validation
router.post('/', adminAuth, productCreateValidation, createProduct)
router.put('/:id', adminAuth, productUpdateValidation, updateProduct)
router.delete('/:id', adminAuth, deleteProduct)

export default router