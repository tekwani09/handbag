import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'

export default function Home() {
  const { selectedCountry } = useCurrency()
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setFeaturedProducts(data.products?.slice(0, 4) || [])
    } catch (error) {
      console.error('Failed to fetch products')
    }
  }

  return (
    <div>
      {/* Main Hero Video Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
            alt="Luxury handbags" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/30">
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-6xl md:text-8xl font-light mb-8 tracking-wide">
                LUXURY HANDBAGS
              </h1>
              <p className="text-xl md:text-2xl font-light mb-12 max-w-2xl mx-auto">
                British luxury leather goods since 2013
              </p>
              <Link 
                to="/products" 
                className="inline-block bg-transparent border-2 border-white text-white px-12 py-4 text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Handbags */}
          <div className="relative group overflow-hidden">
            <div className="aspect-square bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1035&q=80" 
                alt="Handbags" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-light mb-2">HANDBAGS</h3>
              <Link to="/products" className="text-sm uppercase tracking-wide border-b border-white pb-1 hover:border-transparent transition-colors">
                View All
              </Link>
            </div>
          </div>

          {/* Leather Goods */}
          <div className="relative group overflow-hidden">
            <div className="aspect-square bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Leather Goods" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-light mb-2">LEATHER GOODS</h3>
              <Link to="/products" className="text-sm uppercase tracking-wide border-b border-white pb-1 hover:border-transparent transition-colors">
                View All
              </Link>
            </div>
          </div>

          {/* Accessories */}
          <div className="relative group overflow-hidden">
            <div className="aspect-square bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Accessories" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-light mb-2">ACCESSORIES</h3>
              <Link to="/products" className="text-sm uppercase tracking-wide border-b border-white pb-1 hover:border-transparent transition-colors">
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              NEW COLLECTION
            </h2>
            <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
              Discover our latest creations combining traditional craftsmanship and contemporary design
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product: any) => (
              <Link key={product.id} to={`/products/${product.id}`} className="group">
                <div className="relative overflow-hidden bg-gray-100 aspect-square mb-6">
                  {product.images?.[0] ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500 font-light">{product.name.toUpperCase()}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-light text-black mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category?.name}</p>
                  <p className="text-lg font-light text-black">{formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">
                BRITISH<br />CRAFTSMANSHIP
              </h2>
              <p className="text-xl text-gray-700 font-light mb-8 leading-relaxed">
                Since 2013, Strathberry has embodied the excellence of British leather craftsmanship. 
                Each piece is designed with passion and manufactured to the highest 
                standards of quality.
              </p>
              <Link 
                to="/about" 
                className="inline-block bg-black text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Our Story
              </Link>
            </div>
            <div className="aspect-video bg-gray-200 overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Leather craftsmanship" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-black text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-light mb-8 tracking-wide">
            STAY INFORMED
          </h2>
          <p className="text-xl font-light mb-12 text-gray-300">
            Subscribe to our newsletter to discover our new collections first
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-transparent border border-white text-white placeholder-gray-400 focus:outline-none focus:border-gray-300"
            />
            <button className="bg-white text-black px-8 py-4 font-medium uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}