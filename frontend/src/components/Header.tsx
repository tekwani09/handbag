import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CountrySwitcher from './CountrySwitcher'
import SearchDropdown from './SearchDropdown'
import LoginModal from './LoginModal'
import NavigationModal from './NavigationModal'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { useAuthStore } from '../store/authStore'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [activeNavModal, setActiveNavModal] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  const { getTotalItems, toggleCart } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { user, checkAuth } = useAuthStore()
  
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Upper header with logo */}
      <div style={{backgroundColor: '#fcfcfb'}}>
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center h-16 relative">
            {/* Left - Ship, Country and Menu */}
            <div className="flex items-center space-x-4">
              <CountrySwitcher className="hidden lg:block" />
              <button
                className="lg:hidden text-black text-xs font-light uppercase tracking-wide"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Menu
              </button>
            </div>

            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/" className="text-xl font-light tracking-widest text-black">
                STRATHBERRY
              </Link>
            </div>

            {/* Right - Search and Icons */}
            <div className="flex items-center space-x-5 ml-auto">
              <div className="hidden lg:flex items-center">
                <div className="relative group">
                  <div className="flex items-center">
                    <div className="flex items-center overflow-hidden">
                      <button 
                        onClick={() => searchQuery && navigate(`/search?q=${encodeURIComponent(searchQuery)}`)}
                        className="text-black hover:text-gray-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                      <input 
                        type="text" 
                        placeholder="Search our collections" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && searchQuery && navigate(`/search?q=${encodeURIComponent(searchQuery)}`)}
                        className="w-0 group-hover:w-64 focus:w-64 transition-all duration-500 ease-out bg-transparent outline-none text-sm font-light pl-0 group-hover:pl-3 focus:pl-3 pr-2 py-2 text-black placeholder-gray-400 placeholder:opacity-0 group-hover:placeholder:opacity-100 focus:placeholder:opacity-60"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-6 h-px bg-black w-0 group-hover:w-5/6 focus-within:w-5/6 transition-all duration-500 ease-out"></div>
                </div>
              </div>
              <Link to="/wishlist" className="text-black transition-colors relative group">
                <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              {user ? (
                <Link to="/profile" className="text-black transition-colors group">
                  <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              ) : (
                <button onClick={() => setIsLoginOpen(true)} className="text-black transition-colors group">
                  <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              )}
              <button onClick={toggleCart} className="text-black transition-colors relative group">
                <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lower header with navigation */}
      <div style={{backgroundColor: '#f0eee9'}}>
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center space-x-12 py-4">
            <button onClick={() => setActiveNavModal('handbags')} className="text-xs font-light text-black hover:text-gray-600 transition-colors uppercase tracking-wide">
              Handbags
            </button>
            <button onClick={() => setActiveNavModal('accessories')} className="text-xs font-light text-black hover:text-gray-600 transition-colors uppercase tracking-wide">
              Accessories
            </button>
            <button onClick={() => setActiveNavModal('gifts')} className="text-xs font-light text-black hover:text-gray-600 transition-colors uppercase tracking-wide">
              Gifts
            </button>
            <Link to="/sale" className="text-xs font-light text-red-600 hover:text-red-700 transition-colors uppercase tracking-wide">
              Sale
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden" style={{backgroundColor: '#f0eee9'}}>
          <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
            <nav className="py-6 space-y-6 border-t border-gray-200">
              <Link to="/handbags" className="block text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
                Handbags
              </Link>
              <Link to="/accessories" className="block text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
                Accessories
              </Link>
              <Link to="/gifts" className="block text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
                Gifts
              </Link>
              <Link to="/sale" className="block text-sm font-light text-red-600 hover:text-red-700 uppercase tracking-wide">
                Sale
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <CountrySwitcher />
              </div>
            </nav>
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      
      {/* Navigation Modal */}
      <NavigationModal 
        isOpen={activeNavModal !== null} 
        onClose={() => setActiveNavModal(null)} 
        section={activeNavModal || ''} 
      />
    </header>
  )
}

export default Header