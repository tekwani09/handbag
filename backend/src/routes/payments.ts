import express from 'express'
import { processPayment } from '../controllers/paymentController'
import { auth } from '../middleware/auth'

const router = express.Router()

// Protected routes
router.post('/process', auth, processPayment)

export default router