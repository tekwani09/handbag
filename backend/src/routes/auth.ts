import express from 'express'
import { register, login, getProfile, updateProfile } from '../controllers/authController'
import { auth } from '../middleware/auth'
import { registerValidation, loginValidation } from '../middleware/validation'

const router = express.Router()

// Public routes with validation
router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)

// Protected routes
router.get('/profile', auth, getProfile)
router.put('/profile', auth, updateProfile)

export default router