import { useState } from 'react'
import { useAuthStore } from '../store/authStore'

interface ImageUploadProps {
  onImageUploaded: (imageUrl: string) => void
  className?: string
}

export default function ImageUpload({ onImageUploaded, className = '' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const { token } = useAuthStore()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', file)

      console.log('Uploading with token:', !!token)
      const response = await fetch('/api/upload/image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      console.log('Upload response status:', response.status)
      if (!response.ok) {
        const errorData = await response.json()
        console.log('Upload error data:', errorData)
        throw new Error('Upload failed')
      }
      
      const data = await response.json()
      console.log('Upload success:', data)
      onImageUploaded(data.imageUrl)
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className={`cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 ${
          uploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </label>
    </div>
  )
}