import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from './CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'

export default function SearchDropdown() {
  const { selectedCountry } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredProducts(filtered)
    } else {
      setFilteredProducts([])
    }
  }, [searchQuery, products])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const closeSearch = () => {
    setIsOpen(false)
    setSearchQuery('')
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-black transition-colors group"
      >
        <svg className="w-5 h-5 group-hover:fill-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div className={`fixed top-0 left-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-light uppercase tracking-wide">Search</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-light hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black text-sm"
              autoFocus
            />
            <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery ? (
              filteredProducts.length > 0 ? (
                <div className="space-y-4">
                  {filteredProducts.map(product => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center space-x-4 p-3 border border-gray-200 hover:border-gray-300 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                        {product.images?.[0] ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-sm text-gray-400">No image</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-light text-black mb-1">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">{product.category?.name}</p>
                        <p className="font-light text-black">
                          {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 font-light">No products found for "{searchQuery}"</p>
                </div>
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 font-light">Start typing to search products...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}