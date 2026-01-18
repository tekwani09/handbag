import { Router } from 'express'
import { uploadImage, upload } from '../controllers/uploadController'
import { auth } from '../middleware/auth'

const router = Router()

router.post('/image', auth, upload.single('image'), uploadImage)

export default router