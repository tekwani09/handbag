import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'

export default function ProductDetail() {
  const { id } = useParams()
  const { token, isAuthenticated } = useAuthStore()
  const { selectedCountry } = useCurrency()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [addingToCart, setAddingToCart] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`)
      const data = await response.json()
      setProduct(data.product)
    } catch (error) {
      console.error('Failed to fetch product')
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async () => {
    if (!isAuthenticated) {
      setMessage('Please sign in to add items to cart')
      return
    }

    setAddingToCart(true)
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product.id,
          quantity
        })
      })

      if (response.ok) {
        setMessage('Added to bag successfully')
      } else {
        setMessage('Failed to add to bag')
      }
    } catch (error) {
      setMessage('Network error')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-sm font-light text-gray-600 uppercase tracking-wide">Loading...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light text-black mb-4">Product Not Found</h1>
          <Link to="/products" className="text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
            ← Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <Link to="/products" className="text-xs font-light text-black hover:text-gray-600 uppercase tracking-wide">
            ← Back to Products
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100">
              {product.images?.[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400 text-lg font-light">No Image</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-light tracking-wider text-black mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-light text-black mb-6">
                {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
              </p>
              <p className="text-sm font-light text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div>
              {product.inventory > 0 ? (
                <p className="text-sm font-light text-green-600 uppercase tracking-wide">
                  In Stock ({product.inventory} available)
                </p>
              ) : (
                <p className="text-sm font-light text-red-600 uppercase tracking-wide">
                  Out of Stock
                </p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {product.inventory > 0 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2 uppercase tracking-wide">
                    Quantity
                  </label>
                  <select 
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 px-4 py-3 text-sm font-light focus:outline-none focus:border-black"
                  >
                    {[...Array(Math.min(product.inventory, 10))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={addToCart}
                  disabled={addingToCart}
                  className="w-full bg-black text-white py-4 text-sm font-light uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {addingToCart ? 'Adding to Bag...' : 'Add to Bag'}
                </button>

                {message && (
                  <div className={`p-4 text-sm text-center ${
                    message.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {message}
                  </div>
                )}
              </div>
            )}

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-light text-black mb-4 uppercase tracking-wide">
                Product Details
              </h3>
              <div className="space-y-2 text-sm font-light text-gray-700">
                <p><span className="text-black">SKU:</span> {product.sku}</p>
                <p><span className="text-black">Category:</span> {product.category?.name}</p>
                <p><span className="text-black">Material:</span> Premium Leather</p>
                <p><span className="text-black">Care:</span> Clean with soft cloth</p>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-light text-black mb-4 uppercase tracking-wide">
                Shipping & Returns
              </h3>
              <div className="space-y-2 text-sm font-light text-gray-700">
                <p>Free UK delivery on orders over £150</p>
                <p>Standard delivery: 2-3 working days</p>
                <p>Express delivery: Next working day</p>
                <p>Free returns within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}