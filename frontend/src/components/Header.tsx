import { useState } from 'react'
import { Link } from 'react-router-dom'
import CountrySwitcher from './CountrySwitcher'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-black text-white text-center py-2 text-xs font-light">
        Free UK delivery on orders over £150
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Menu button (mobile) */}
          <button
            className="lg:hidden text-black text-xs font-light uppercase tracking-wide"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </button>

          {/* Center - Logo */}
          <Link to="/" className="text-xl font-light tracking-widest text-black">
            STRATHBERRY
          </Link>

          {/* Right - Icons */}
          <div className="flex items-center space-x-5">
            <CountrySwitcher className="hidden lg:block" />
            <Link to="/search" className="text-black transition-colors hidden lg:block group">
              <svg className="w-4 h-4 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <Link to="/account" className="text-black transition-colors group">
              <svg className="w-4 h-4 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <Link to="/cart" className="text-black transition-colors relative group">
              <svg className="w-4 h-4 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex justify-center space-x-12 py-4 border-t border-gray-100">
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <nav className="py-6 space-y-6">
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
              <div className="pt-4 border-t border-gray-100">
                <Link to="/search" className="flex items-center space-x-2 text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search</span>
                </Link>
                <CountrySwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header