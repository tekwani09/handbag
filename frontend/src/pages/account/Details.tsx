import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function AccountDetails() {
  const { user, token } = useAuthStore()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone
        })
      })

      if (response.ok) {
        setMessage('Profile updated successfully')
      } else {
        setMessage('Failed to update profile')
      }
    } catch (error) {
      setMessage('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/account" className="text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
            ← Back to Account
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-wider text-black mb-4">
            ACCOUNT DETAILS
          </h1>
          <p className="text-sm font-light text-gray-600">
            Update your personal information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {message && (
            <div className={`p-4 text-sm ${message.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {message}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-wide">
                First Name
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 text-sm font-light focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-wide">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 text-sm font-light focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 text-sm font-light bg-gray-50 cursor-not-allowed"
            />
            <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-wide">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 border border-gray-300 text-sm font-light focus:outline-none focus:border-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-4 text-sm font-light uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update Details'}
          </button>
        </form>
      </div>
    </div>
  )
}