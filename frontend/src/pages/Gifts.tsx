import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'

export default function Gifts() {
  const { selectedCountry } = useCurrency()
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam) {
      setActiveFilter(filterParam)
    }
  }, [searchParams])

  useEffect(() => {
    filterProducts()
  }, [products, activeFilter])

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

  const filterProducts = () => {
    if (activeFilter === 'All') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product: any) => {
        const price = parseFloat(product.priceGBP)
        switch (activeFilter) {
          case 'Under150':
            return price < 150
          case 'Under500':
            return price < 500
          case 'Under800':
            return price < 800
          case 'Evening':
            return product.category?.name?.toLowerCase().includes('evening')
          case 'Her':
            return product.category?.name?.toLowerCase().includes('handbag') || product.category?.name?.toLowerCase().includes('clutch')
          default:
            return product.category?.name?.toLowerCase().includes(activeFilter.toLowerCase())
        }
      })
      setFilteredProducts(filtered)
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
            GIFTS
          </h1>
        </div>
      </div>

      {/* Horizontal Filters */}
      <div className="border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-x-8 gap-y-6 justify-center">
            <button 
              onClick={() => setActiveFilter('Under150')}
              className={`hover:opacity-70 cursor-pointer transition-all uppercase tracking-wide text-sm ${
                activeFilter === 'Under150' ? 'text-black border-b border-black pb-1' : 'text-gray-600'
              }`}
            >
              GIFTS UNDER £150
            </button>
            <button 
              onClick={() => setActiveFilter('Under500')}
              className={`hover:opacity-70 cursor-pointer transition-all uppercase tracking-wide text-sm ${
                activeFilter === 'Under500' ? 'text-black border-b border-black pb-1' : 'text-gray-600'
              }`}
            >
              GIFTS UNDER £500
            </button>
            <button 
              onClick={() => setActiveFilter('Under800')}
              className={`hover:opacity-70 cursor-pointer transition-all uppercase tracking-wide text-sm ${
                activeFilter === 'Under800' ? 'text-black border-b border-black pb-1' : 'text-gray-600'
              }`}
            >
              GIFTS UNDER £800
            </button>
            <button 
              onClick={() => setActiveFilter('Her')}
              className={`hover:opacity-70 cursor-pointer transition-all uppercase tracking-wide text-sm ${
                activeFilter === 'Her' ? 'text-black border-b border-black pb-1' : 'text-gray-600'
              }`}
            >
              GIFTS FOR HER
            </button>
            <button 
              onClick={() => setActiveFilter('Evening')}
              className={`hover:opacity-70 cursor-pointer transition-all uppercase tracking-wide text-sm ${
                activeFilter === 'Evening' ? 'text-black border-b border-black pb-1' : 'text-gray-600'
              }`}
            >
              EVENING BAGS
            </button>
            <button 
              onClick={() => setActiveFilter('All')}
              className={`hover:opacity-70 cursor-pointer transition-all uppercase tracking-wide text-sm ${
                activeFilter === 'All' ? 'text-black border-b border-black pb-1' : 'text-gray-600'
              }`}
            >
              ALL GIFTS
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product: any) => (
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
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  )
}