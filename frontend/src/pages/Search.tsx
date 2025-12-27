import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'
import { API_BASE_URL } from '../config/api'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const { selectedCountry } = useCurrency()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { addItem, toggleCart } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()

  useEffect(() => {
    if (query) {
      setSearchInput(query)
      searchProducts(query)
    }
  }, [query])

  const searchProducts = async (searchQuery: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Search failed:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() })
    }
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearchParams({})
    setProducts([])
  }

  const displayProducts = products

  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="max-w-7xl mx-auto px-2">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <Link to="/" className="text-sm text-gray-600 hover:text-black">Home</Link>
          <span className="mx-2 text-gray-400 text-sm">/</span>
          <span className="text-sm font-medium text-black">PRODUCTS</span>
        </nav>

        {/* Search Results Header */}
        {query && (
          <div className="mb-6">
            <p className="text-base font-medium">You searched for: "{query}"</p>
            <p className="text-sm text-gray-600 mt-1">{displayProducts.length} products found</p>
          </div>
        )}

        {/* Products Grid */}
        {displayProducts.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayProducts.map((product: any) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group">
                <div className="relative overflow-hidden aspect-[3/4] bg-gray-200 mb-3">
                  <img 
                    src={product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
                  />
                  {product.productModelImage && (
                    <img 
                      src={product.productModelImage}
                      alt={`${product.name} model`}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-normal mb-1 leading-tight">{product.name}</h3>
                  <p className="text-sm text-gray-700">{formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {query && displayProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-600">No results found for "{query}"</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-600">Searching...</p>
          </div>
        )}
      </div>
    </div>
  )
}