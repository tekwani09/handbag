import { Request, Response } from 'express'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client, BUCKET_NAME, CDN_URL } from '../config/aws'
import multer from 'multer'
import { randomUUID } from 'crypto'

interface AuthRequest extends Request {
  user?: any
}

const storage = multer.memoryStorage()
export const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files allowed'))
    }
  }
})

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    console.log('Upload request received')
    console.log('File:', req.file)
    console.log('User:', req.user)
    
    if (!req.file) {
      console.log('No file uploaded')
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const fileExtension = req.file.originalname.split('.').pop()
    const fileName = `${randomUUID()}.${fileExtension}`
    const key = `products/${fileName}`

    console.log('Uploading to S3:', { bucket: BUCKET_NAME, key })

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    })

    await s3Client.send(command)
    
    const imageUrl = `${CDN_URL}/${key}`
    console.log('Upload successful:', imageUrl)
    res.json({ imageUrl })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Failed to upload image' })
  }
}