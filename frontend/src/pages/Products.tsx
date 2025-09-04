import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'

export default function Products() {
  const { selectedCountry } = useCurrency()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-sm font-light text-gray-600 uppercase tracking-wide">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-light tracking-wider text-center text-black">
            HANDBAGS
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-8 text-sm font-light">
            <button className="text-black border-b border-black pb-1 uppercase tracking-wide">
              All
            </button>
            <button className="text-gray-600 hover:text-black uppercase tracking-wide">
              Totes
            </button>
            <button className="text-gray-600 hover:text-black uppercase tracking-wide">
              Crossbody
            </button>
            <button className="text-gray-600 hover:text-black uppercase tracking-wide">
              Clutches
            </button>
            <button className="text-gray-600 hover:text-black uppercase tracking-wide">
              Mini Bags
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <Link key={product.id} to={`/products/${product.id}`} className="group cursor-pointer">
              <div className="bg-gray-100 aspect-square mb-4 group-hover:bg-gray-200 transition-colors overflow-hidden">
                {product.images?.[0] ? (
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm font-light">
                      {product.name.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <h3 className="text-sm font-light text-black mb-1 uppercase tracking-wide">
                  {product.name}
                </h3>
                <p className="text-sm font-light text-gray-600 mb-2">
                  {product.category?.name}
                </p>
                <p className="text-sm font-light text-black">
                  {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}