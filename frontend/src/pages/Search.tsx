import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'
import { API_BASE_URL } from '../config/api'
import { useCartStore } from '../store/cartStore'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const { selectedCountry } = useCurrency()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { addItem, toggleCart } = useCartStore()

  useEffect(() => {
    if (query) {
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

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      image: product.images?.[0] || '',
      product: product
    })
    toggleCart()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-light mb-2">
            {query ? `Search results for "${query}"` : 'Search'}
          </h1>
          {products.length > 0 && (
            <p className="text-sm text-gray-600">
              {products.length} product{products.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="text-sm text-gray-600">Searching...</div>
          </div>
        )}

        {/* No Results */}
        {!loading && query && products.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-xl font-light mb-4">No results found</h2>
            <p className="text-gray-600 mb-8">
              Try adjusting your search terms or browse our collections
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-black text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
            >
              View All Products
            </Link>
          </div>
        )}

        {/* Search Results */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div key={product.id} className="group">
                <Link to={`/products/${product.id}`}>
                  <div className="aspect-square bg-gray-100 mb-4 overflow-hidden">
                    <img 
                      src={product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                
                <div className="space-y-2">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-light text-sm hover:underline">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm text-gray-600">
                    {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
                  </p>
                  
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="text-xs uppercase tracking-wide underline hover:no-underline transition-all"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Query */}
        {!query && !loading && (
          <div className="text-center py-12">
            <h2 className="text-xl font-light mb-4">Start your search</h2>
            <p className="text-gray-600">
              Enter a search term to find products
            </p>
          </div>
        )}
      </div>
    </div>
  )
}