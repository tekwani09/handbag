import { useState } from 'react'
import { Link } from 'react-router-dom'
import CountrySwitcher from './CountrySwitcher'
import SearchDropdown from './SearchDropdown'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Upper header with logo */}
      <div style={{backgroundColor: '#fcfcfb'}}>
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex items-center h-16 relative">
            {/* Left - Search and Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:block">
                <SearchDropdown />
              </div>
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

            {/* Right - Icons */}
            <div className="flex items-center space-x-5 ml-auto">
              <CountrySwitcher className="hidden lg:block" />
              <Link to="/wishlist" className="text-black transition-colors group">
                <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
              <Link to="/account" className="text-black transition-colors group">
                <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <Link to="/cart" className="text-black transition-colors relative group">
                <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Lower header with navigation */}
      <div style={{backgroundColor: '#f0eee9'}}>
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex justify-center space-x-12 py-4">
            <Link to="/handbags" className="text-xs font-light text-black hover:text-gray-600 transition-colors uppercase tracking-wide">
              Handbags
            </Link>
            <Link to="/accessories" className="text-xs font-light text-black hover:text-gray-600 transition-colors uppercase tracking-wide">
              Accessories
            </Link>
            <Link to="/gifts" className="text-xs font-light text-black hover:text-gray-600 transition-colors uppercase tracking-wide">
              Gifts
            </Link>
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
    </header>
  )
}

export default Header