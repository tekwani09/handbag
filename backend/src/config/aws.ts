import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export const BUCKET_NAME = process.env.AWS_S3_BUCKET || 'handbag-assets'
export const CDN_URL = process.env.CLOUDFRONT_URL || 'https://d1d1r0t5t0enyr.cloudfront.net'