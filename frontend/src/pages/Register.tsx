import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

// Validation helpers
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = []
  
  if (!password) return { isValid: false, errors: ['Password is required'] }
  if (password.length < 8) errors.push('At least 8 characters')
  if (!/[A-Z]/.test(password)) errors.push('One uppercase letter')
  if (!/[a-z]/.test(password)) errors.push('One lowercase letter')
  if (!/\d/.test(password)) errors.push('One number')
  
  return { isValid: errors.length === 0, errors }
}

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string[] }>({})
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Update form data
    const updatedFormData = {
      ...formData,
      [name]: value
    }
    setFormData(updatedFormData)

    // Real-time validation as user types
    const newFieldErrors = { ...fieldErrors }
    
    if (name === 'email') {
      if (!value) {
        delete newFieldErrors.email
      } else if (!isValidEmail(value)) {
        newFieldErrors.email = ['Invalid email format']
      } else {
        delete newFieldErrors.email
      }
    }
    
    if (name === 'password') {
      if (!value) {
        delete newFieldErrors.password
      } else {
        const { errors } = validatePasswordStrength(value)
        if (errors.length > 0) {
          newFieldErrors.password = errors
        } else {
          delete newFieldErrors.password
        }
      }
      
      // Check confirm password match
      if (updatedFormData.confirmPassword && updatedFormData.confirmPassword !== value) {
        newFieldErrors.confirmPassword = ['Passwords do not match']
      } else if (updatedFormData.confirmPassword === value) {
        delete newFieldErrors.confirmPassword
      }
    }

    if (name === 'confirmPassword') {
      if (!value) {
        delete newFieldErrors.confirmPassword
      } else if (updatedFormData.password && value !== updatedFormData.password) {
        newFieldErrors.confirmPassword = ['Passwords do not match']
      } else {
        delete newFieldErrors.confirmPassword
      }
    }

    setFieldErrors(newFieldErrors)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validate required fields
    if (!formData.firstName.trim()) {
      setError('First name is required')
      setLoading(false)
      return
    }
    if (!formData.lastName.trim()) {
      setError('Last name is required')
      setLoading(false)
      return
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      setLoading(false)
      return
    }
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }
    if (!formData.password) {
      setError('Password is required')
      setLoading(false)
      return
    }
    if (!formData.confirmPassword) {
      setError('Please confirm your password')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.toLowerCase().trim(),
        password: formData.password,
        phone: formData.phone.trim()
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (response.ok) {
        login(data.token, data.user)
        navigate('/')
      } else {
        if (data.details && Array.isArray(data.details)) {
          const errorText = data.details
            .map((d: any) => d.message)
            .join('\n')
          setError(errorText)
        } else {
          setError(data.error || 'Registration failed')
        }
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:flex-1">
        <div className="h-full w-full bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Luxury leather goods"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-light tracking-wider text-black mb-2">
              CREATE ACCOUNT
            </h1>
            <p className="text-sm font-light text-gray-600">
              Join the HEGĒTT family
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 text-sm rounded-sm space-y-1">
                {error.split('\n').map((line, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-red-400 font-light mt-0.5">•</span>
                    <span className="font-light">{line}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-light text-gray-700 mb-2">
                    FIRST NAME
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-sm font-light focus:outline-none focus:border-black transition-colors"
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-light text-gray-700 mb-2">
                    LAST NAME
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 text-sm font-light focus:outline-none focus:border-black transition-colors"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-light text-gray-700 mb-2">
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors ${
                    fieldErrors.email 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-black'
                  }`}
                  placeholder="Enter your email"
                />
                {fieldErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.email[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-light text-gray-700 mb-2">
                  PHONE NUMBER (OPTIONAL)
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 text-sm font-light focus:outline-none focus:border-black transition-colors"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-light text-gray-700 mb-2">
                  PASSWORD
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors ${
                    fieldErrors.password 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-black'
                  }`}
                  placeholder="Create a password"
                />
                {fieldErrors.password && (
                  <div className="text-red-500 text-xs mt-1 space-y-0.5">
                    {fieldErrors.password.map((error, idx) => (
                      <p key={idx}>{error}</p>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-light text-gray-700 mb-2">
                  CONFIRM PASSWORD
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border text-sm font-light focus:outline-none transition-colors ${
                    fieldErrors.confirmPassword 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-300 focus:border-black'
                  }`}
                  placeholder="Confirm your password"
                />
                {fieldErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword[0]}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-sm font-light uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="text-center">
              <p className="text-sm font-light text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-black hover:text-gray-600 uppercase tracking-wide">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
