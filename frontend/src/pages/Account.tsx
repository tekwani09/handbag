import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Account() {
  const { user, isAuthenticated, logout } = useAuthStore()

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

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
      <main className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-2">MY ACCOUNT</h1>
          <p className="text-sm text-gray-600">
            Welcome back, <span className="font-medium">{user?.firstName}</span>
          </p>
        </div>

        {/* Account Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account Details Card */}
          <Link 
            to="/account/details"
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <svg className="w-10 h-10 text-black group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-2 group-hover:opacity-80 transition-opacity">
                Account Details
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Update your personal information and preferences
              </p>
              <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">
                Manage →
              </span>
            </div>
          </Link>

          {/* Order History Card */}
          <Link 
            to="/account/orders"
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <svg className="w-10 h-10 text-black group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-2 group-hover:opacity-80 transition-opacity">
                Order History
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                View and track your current and past orders
              </p>
              <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">
                View Orders →
              </span>
            </div>
          </Link>

          {/* Address Book Card */}
          <Link 
            to="/account/addresses"
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <svg className="w-10 h-10 text-black group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-2 group-hover:opacity-80 transition-opacity">
                Address Book
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage your shipping and billing addresses
              </p>
              <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">
                Manage →
              </span>
            </div>
          </Link>

          {/* Wishlist Card */}
          <Link 
            to="/account/wishlist"
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <svg className="w-10 h-10 text-black group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-2 group-hover:opacity-80 transition-opacity">
                Wishlist
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Save your favorite items for later
              </p>
              <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">
                View Wishlist →
              </span>
            </div>
          </Link>

          {/* Payment Methods Card */}
          <Link 
            to="/account/payment"
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <svg className="w-10 h-10 text-black group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-2 group-hover:opacity-80 transition-opacity">
                Payment Methods
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Manage your saved payment methods
              </p>
              <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">
                Manage →
              </span>
            </div>
          </Link>

          {/* Sign Out Card */}
          <button 
            onClick={logout}
            className="text-left bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="p-6 md:p-8">
              <div className="mb-4">
                <svg className="w-10 h-10 text-black group-hover:opacity-80 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-xl font-light mb-2 group-hover:opacity-80 transition-opacity">
                Sign Out
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Securely sign out of your account
              </p>
              <span className="text-xs uppercase tracking-widest text-gray-700 group-hover:text-black transition-colors">
                Sign Out →
              </span>
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center text-sm text-gray-600 max-w-md mx-auto">
          <p>Need help? <a href="#" className="underline hover:no-underline">Contact our customer care team</a></p>
        </div>
      </main>
    </div>
  )
}