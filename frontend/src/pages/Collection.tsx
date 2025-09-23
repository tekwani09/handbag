import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'
import { API_BASE_URL } from '../config/api'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

export default function Collection() {
  const { slug } = useParams()
  const { selectedCountry } = useCurrency()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { addItem, toggleCart } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()

  useEffect(() => {
    if (slug) {
      fetchCollection()
    }
  }, [slug])

  const fetchCollection = async () => {
    try {
      const [categoryResponse, productsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/categories/${slug}`),
        fetch(`${API_BASE_URL}/products?category=${slug}`)
      ])
      
      const categoryData = await categoryResponse.json()
      const productsData = await productsResponse.json()
      
      setCategory(categoryData.category)
      setProducts(productsData.products || [])
    } catch (error) {
      console.error('Failed to fetch collection:', error)
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Collection not found</h1>
          <Link to="/" className="text-sm underline hover:no-underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={category.image || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&h=800&fit=crop'}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/20">
          <div className="h-full flex items-end justify-center pb-16">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide uppercase">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-sm font-light max-w-2xl mx-auto">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="px-4 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-light mb-4">No products available</h2>
              <p className="text-gray-600 mb-8">
                Check back soon for new arrivals in this collection
              </p>
              <Link 
                to="/products" 
                className="inline-block bg-black text-white px-6 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
              >
                View All Products
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="text-2xl font-light mb-4">
                  {products.length} Product{products.length !== 1 ? 's' : ''}
                </h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
                {products.map((product: any) => (
                  <div key={product.id} className="group">
                    <Link to={`/products/${product.id}`}>
                      <div className="aspect-[4/5] bg-gray-100 mb-4 overflow-hidden">
                        <img 
                          src={product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    
                    <div className="space-y-3">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-light text-sm hover:underline">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <p className="text-sm text-gray-600">
                        {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="text-xs uppercase tracking-wide underline hover:no-underline transition-all"
                        >
                          Add to Bag
                        </button>
                        <button 
                          onClick={() => toggleItem({
                            id: product.id,
                            name: product.name,
                            price: getProductPrice(product, selectedCountry.currency),
                            image: product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
                          })}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <svg className={`w-6 h-6 ${isWishlisted(product.id) ? 'fill-black' : 'fill-none stroke-black hover:fill-black'}`} viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}