import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Account() {
  const { user, isAuthenticated, logout } = useAuthStore()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full text-center px-4">
          <h1 className="text-3xl font-light tracking-wider text-black mb-8">
            MY ACCOUNT
          </h1>
          <p className="text-sm font-light text-gray-600 mb-8">
            Sign in to access your account
          </p>
          <div className="space-y-4">
            <Link 
              to="/login"
              className="block w-full bg-black text-white py-4 text-sm font-light uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              to="/register"
              className="block w-full border border-black text-black py-4 text-sm font-light uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-wider text-black mb-4">
            MY ACCOUNT
          </h1>
          <p className="text-sm font-light text-gray-600">
            Welcome back, {user?.firstName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Account Details */}
          <div className="border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-black mb-4 uppercase tracking-wide">
              Account Details
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              Update your personal information and preferences
            </p>
            <Link 
              to="/account/details"
              className="inline-block border border-black text-black px-6 py-3 text-sm font-light uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Manage
            </Link>
          </div>

          {/* Order History */}
          <div className="border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-black mb-4 uppercase tracking-wide">
              Order History
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              View and track your current and past orders
            </p>
            <Link 
              to="/account/orders"
              className="inline-block border border-black text-black px-6 py-3 text-sm font-light uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              View Orders
            </Link>
          </div>

          {/* Address Book */}
          <div className="border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-black mb-4 uppercase tracking-wide">
              Address Book
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              Manage your shipping and billing addresses
            </p>
            <Link 
              to="/account/addresses"
              className="inline-block border border-black text-black px-6 py-3 text-sm font-light uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Manage
            </Link>
          </div>

          {/* Wishlist */}
          <div className="border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-black mb-4 uppercase tracking-wide">
              Wishlist
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              Save your favorite items for later
            </p>
            <Link 
              to="/account/wishlist"
              className="inline-block border border-black text-black px-6 py-3 text-sm font-light uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              View Wishlist
            </Link>
          </div>

          {/* Payment Methods */}
          <div className="border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-black mb-4 uppercase tracking-wide">
              Payment Methods
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              Manage your saved payment methods
            </p>
            <Link 
              to="/account/payment"
              className="inline-block border border-black text-black px-6 py-3 text-sm font-light uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Manage
            </Link>
          </div>

          {/* Sign Out */}
          <div className="border border-gray-200 p-8 text-center">
            <div className="mb-6">
              <svg className="w-8 h-8 mx-auto text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-lg font-light text-black mb-4 uppercase tracking-wide">
              Sign Out
            </h3>
            <p className="text-sm font-light text-gray-600 mb-6">
              Securely sign out of your account
            </p>
            <button 
              onClick={logout}
              className="inline-block border border-black text-black px-6 py-3 text-sm font-light uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}