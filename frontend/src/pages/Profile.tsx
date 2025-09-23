import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Profile() {
  const { user, logout, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-2">My Account</h1>
          <p className="text-gray-600">Welcome back, {user.firstName}</p>
        </div>

        {/* Account Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="space-y-2">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-sm font-medium bg-gray-100 text-gray-900 rounded-md"
              >
                Account Details
              </Link>
              <Link 
                to="/profile/orders" 
                className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Order History
              </Link>
              <Link 
                to="/profile/addresses" 
                className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                Addresses
              </Link>
              <button 
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md"
              >
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-light mb-6">Account Details</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                      {user.firstName}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                      {user.lastName}
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                    {user.email}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member Since
                  </label>
                  <div className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="bg-black text-white px-6 py-2 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link 
                to="/wishlist"
                className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <h3 className="font-medium mb-2">Wishlist</h3>
                <p className="text-sm text-gray-600">View your saved items</p>
              </Link>
              <Link 
                to="/profile/orders"
                className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
              >
                <h3 className="font-medium mb-2">Recent Orders</h3>
                <p className="text-sm text-gray-600">Track your purchases</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}