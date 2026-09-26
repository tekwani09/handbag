import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useState } from 'react'

export default function Account() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: 'Prefer not to say',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: '',
    gender: 'Prefer not to answer',
    dateOfBirth: '',
    email: user?.email || ''
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
        <main className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light mb-4">MY ACCOUNT</h1>
            <p className="text-lg text-gray-600">
              Sign in to access your account
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="p-6 md:p-8">
              <div className="space-y-4">
                <Link 
                  to="/login"
                  className="block w-full bg-black text-white py-4 px-8 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors text-center rounded"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register"
                  className="block w-full border-2 border-black text-black py-4 px-8 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors text-center rounded"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 max-w-md mx-auto mt-8">
            <p>New to HEGĒTT? <a href="/register" className="underline hover:no-underline">Create an account</a> to track orders and manage your preferences.</p>
          </div>
        </main>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 lg:flex-shrink-0" style={{backgroundColor: '#f0eee9'}}>
          <div className="p-8 lg:p-12 sticky top-0">
            <h2 className="text-3xl md:text-4xl font-light mb-12" style={{fontFamily: 'Cormorant Garamond'}}>
              Hello, {user?.firstName}
            </h2>
            
            <nav className="space-y-3 mb-12">
              <Link 
                to="/account"
                className="block text-xs uppercase tracking-wider font-medium text-black"
              >
                My Information
              </Link>
              <Link 
                to="/account/orders"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                My Orders &amp; Returns
              </Link>
              <Link 
                to="/account/wishlist"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Wishlist
              </Link>
              <Link 
                to="/account/addresses"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Address Book
              </Link>
              <Link 
                to="/account/payment"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Preferences
              </Link>
            </nav>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
            >
              <span>←</span> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light mb-12" style={{fontFamily: 'Cormorant Garamond'}}>
            My Information
          </h1>

          {/* Personal Details Form */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
              {/* Title */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-700 mb-2">Title</label>
                <select 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-black"
                >
                  <option>Prefer not to say</option>
                  <option>Ms</option>
                  <option>Mrs</option>
                  <option>Miss</option>
                  <option>Mr</option>
                  <option>Mx</option>
                </select>
              </div>
              <div></div>

              {/* First Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-700 mb-2">First name *</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-700 mb-2">Last name *</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-700 mb-2">Phone number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-700 mb-2">Gender</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-black"
                >
                  <option>Prefer not to answer</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                </select>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-700 mb-2">Date of birth</label>
                <input 
                  type="date" 
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                  className="w-full border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <button className="px-8 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Save Changes
            </button>
          </div>

          {/* Change Credentials Section */}
          <div className="border-t border-gray-300 pt-12 mb-16">
            <h2 className="text-2xl font-light mb-2" style={{fontFamily: 'Cormorant Garamond'}}>
              Change of access credentials
            </h2>
            <p className="text-sm text-gray-600 mb-8 max-w-xl">
              Your email address is used to sign in and to receive order updates.
            </p>

            {/* Email */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest text-gray-700 mb-2">Email address</label>
              <div className="flex items-end gap-4">
                <input 
                  type="email" 
                  value={formData.email}
                  readOnly
                  className="flex-1 border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none"
                />
                <button className="text-xs uppercase tracking-widest text-gray-600 hover:text-black transition-colors mb-2">
                  Edit
                </button>
              </div>
            </div>

            {/* Password */}
            <div className="mb-8">
              <label className="block text-xs uppercase tracking-widest text-gray-700 mb-2">Current password</label>
              <div className="flex items-end gap-4">
                <input 
                  type="password" 
                  value="••••••••"
                  readOnly
                  className="flex-1 border-b border-gray-300 bg-transparent py-2 text-sm focus:outline-none"
                />
                <button className="text-xs uppercase tracking-widest text-gray-600 hover:text-black transition-colors mb-2">
                  Change password
                </button>
              </div>
            </div>
          </div>

          {/* Deactivate Account Section */}
          <div className="border-t border-gray-300 pt-12">
            <h2 className="text-2xl font-light mb-4" style={{fontFamily: 'Cormorant Garamond'}}>
              Deactivate account
            </h2>
            <p className="text-sm text-gray-600 mb-6 max-w-xl leading-relaxed">
              If you deactivate your account you will no longer be able to access your personal area or your order history. To view, modify or request the cancellation of your personal details, consult our Privacy Policy.
            </p>
            <button className="px-8 py-3 border border-gray-400 text-gray-700 text-xs uppercase tracking-widest hover:bg-gray-100 transition-colors">
              Deactivate my account
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}