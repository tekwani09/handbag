import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CountrySwitcher from './CountrySwitcher'
import SearchDropdown from './SearchDropdown'
import LoginModal from './LoginModal'
import NavigationModal from './NavigationModal'
import SearchModal from './SearchModal'
import WishlistModal from './WishlistModal'
import CartModal from './CartModal'
import CountryModal from './CountryModal'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { useAuthStore } from '../store/authStore'
import { useModalStore } from '../store/modalStore'
import { bgClasses } from '../styles/colors'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeNavModal, setActiveNavModal] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  
  const { getTotalItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { user, checkAuth } = useAuthStore()
  const { activeModal, openModal, closeModal } = useModalStore()
  
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Upper header with logo */}
      <div className={bgClasses.primary}>
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center h-16 relative">
            {/* Left - Ship, Country and Menu */}
            <div className="flex items-center space-x-4">
              <CountrySwitcher className="hidden lg:block" />
              <button
                className="lg:hidden text-black text-sm font-light uppercase tracking-wide"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Menu
              </button>
            </div>

            {/* Center - Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link to="/">
                <img src="/images/brand/Asset 1.svg" alt="HEGĒTT" className="h-7" />
              </Link>
            </div>

            {/* Right - Search and Icons */}
            <div className="flex items-center space-x-5 ml-auto">
              <div className="hidden lg:flex items-center">
                <button 
                  onClick={() => openModal('search')}
                  className="text-black transition-colors group relative"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="6" strokeWidth={1.5} className="group-hover:stroke-[2]" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35" className="group-hover:stroke-[2]" />
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => openModal('wishlist')}
                className="text-black transition-colors relative group"
              >
                <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] rounded-full h-3 w-3 flex items-center justify-center font-light">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              {user ? (
                <Link to="/profile" className="text-black transition-colors group">
                  <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Link>
              ) : (
                <button onClick={() => openModal('account')} className="text-black transition-colors group">
                  <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              )}
              <button onClick={() => openModal('cart')} className="text-black transition-colors relative group">
                <svg className="w-6 h-6" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path className="transition-all duration-200 group-hover:fill-black" d="M10 26 L54 26 L46 53 Q44.5 55 40 55 L24 55 Q19.5 55 18 53 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                  <path d="M22 28 C22 14, 27 8, 32 8 C37 8, 42 14, 42 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-1 bg-black text-white text-[9px] rounded-full h-3 w-3 flex items-center justify-center font-light">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lower header with navigation */}
      <div className={bgClasses.secondary}>
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center space-x-12 py-4">
            <div 
              className="relative"
              onMouseEnter={() => setActiveNavModal('handbags')}
            >
              <button className={`text-sm font-light text-black transition-colors uppercase tracking-wide pb-1 ${
                activeNavModal === 'handbags' ? 'border-b-2 border-black' : 'hover:text-gray-600'
              }`}>
                Handbags
              </button>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setActiveNavModal('collections')}
            >
              <button className={`text-sm font-light text-black transition-colors uppercase tracking-wide pb-1 ${
                activeNavModal === 'collections' ? 'border-b-2 border-black' : 'hover:text-gray-600'
              }`}>
                Collections
              </button>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setActiveNavModal('new')}
            >
              <button className={`text-sm font-light text-black transition-colors uppercase tracking-wide pb-1 ${
                activeNavModal === 'new' ? 'border-b-2 border-black' : 'hover:text-gray-600'
              }`}>
                New
              </button>
            </div>
            <div 
              className="relative"
              onMouseEnter={() => setActiveNavModal('gifts')}
            >
              <button className={`text-sm font-light text-black transition-colors uppercase tracking-wide pb-1 ${
                activeNavModal === 'gifts' ? 'border-b-2 border-black' : 'hover:text-gray-600'
              }`}>
                Gifts
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`lg:hidden ${bgClasses.secondary}`}>
          <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
            <nav className="py-6 space-y-6 border-t border-gray-200">
              <Link to="/handbags" className="block text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
                Handbags
              </Link>
              <Link to="/collections" className="block text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
                Collections
              </Link>
              <Link to="/new" className="block text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
                New
              </Link>
              <Link to="/gifts" className="block text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
                Gifts
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <CountrySwitcher />
              </div>
            </nav>
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginModal isOpen={activeModal === 'account' || activeModal === 'register'} onClose={closeModal} initialMode={activeModal === 'register' ? 'register' : 'login'} />
      
      {/* Navigation Modal */}
      <NavigationModal 
        isOpen={activeNavModal !== null} 
        onClose={() => setActiveNavModal(null)} 
        section={activeNavModal || ''} 
      />
      
      {/* Search Modal */}
      <SearchModal 
        isOpen={activeModal === 'search'} 
        onClose={closeModal} 
      />
      
      {/* Wishlist Modal */}
      <WishlistModal 
        isOpen={activeModal === 'wishlist'} 
        onClose={closeModal} 
      />
      
      {/* Cart Modal */}
      <CartModal 
        isOpen={activeModal === 'cart'} 
        onClose={closeModal} 
      />
      
      {/* Country Modal */}
      <CountryModal 
        isOpen={activeModal === 'country'} 
        onClose={closeModal} 
      />
    </header>
  )
}

export default Header