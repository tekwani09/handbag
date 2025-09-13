import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'

export default function Home() {
  const { selectedCountry } = useCurrency()
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [stories, setStories] = useState([])

  useEffect(() => {
    fetchFeaturedProducts()
    fetchCategories()
    fetchStories()
  }, [])

  useEffect(() => {
    const scrollContainer = document.getElementById('families-scroll')
    const scrollDot = document.getElementById('scroll-dot')
    
    if (scrollContainer && scrollDot) {
      const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const scrollPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        scrollDot.style.left = `${Math.min(scrollPercentage, 100)}%`
      }
      
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [categories])

  useEffect(() => {
    const scrollContainer = document.getElementById('stories-scroll')
    const scrollDot = document.getElementById('stories-scroll-dot')
    
    if (scrollContainer && scrollDot) {
      const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const scrollPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        scrollDot.style.left = `${Math.min(scrollPercentage, 100)}%`
      }
      
      scrollContainer.addEventListener('scroll', handleScroll)
      return () => scrollContainer.removeEventListener('scroll', handleScroll)
    }
  }, [stories])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setFeaturedProducts(data.products?.slice(0, 4) || [])
    } catch (error) {
      console.error('Failed to fetch products')
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch categories')
    }
  }

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories/featured')
      const data = await response.json()
      setStories(data.stories || [])
    } catch (error) {
      console.error('Failed to fetch stories')
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
          <div className="h-full flex items-center justify-center pt-32">
            <div className="text-center text-white px-4">
              <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
                British luxury leather goods since 2013
              </p>
              <h1 className="text-3xl md:text-5xl font-bold mb-12 tracking-wide">
                LUXURY HANDBAGS
              </h1>
              <Link 
                to="/products" 
                className="text-white text-sm font-medium uppercase tracking-widest underline hover:no-underline transition-all duration-300"
              >
                Discover
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h3 className="text-4xl font-light mb-4 tracking-wide">LEATHER GOODS</h3>
              <Link to="/leather-goods" className="text-sm uppercase tracking-wide border-b border-white pb-1 hover:border-transparent transition-colors">
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
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <h3 className="text-4xl font-light mb-4 tracking-wide">ACCESSORIES</h3>
              <Link to="/accessories" className="text-sm uppercase tracking-wide border-b border-white pb-1 hover:border-transparent transition-colors">
                View All
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Families Section */}
      <section className="py-20 bg-white">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-left mb-8">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              OUR FAMILIES
            </h2>
            <button className="text-black font-light underline hover:text-gray-600 transition-colors">
              Discover More
            </button>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide" id="families-scroll">
            <div className="flex gap-1 group/container">
              {categories.map((category: any, index: number) => {
                const modelImages = [
                  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800',
                  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800',
                  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800',
                  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
                  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800',
                  'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800'
                ]
                
                return (
                  <div key={category.id} className="group flex-shrink-0 transition-all duration-300" style={{ width: 'calc(100vw / 5.5)' }}>
                    <div className="relative overflow-hidden">
                      <div className="aspect-[3/4] bg-gray-200">
                        <img 
                          src={modelImages[index % modelImages.length]} 
                          alt={`Model with ${category.name}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 bg-white/50 opacity-0 group-hover/container:opacity-100 group-hover:!opacity-0 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="bg-white text-black pl-0.5 pr-4 py-4">
                      <h3 className="text-sm font-light mb-4 tracking-wide text-left">{category.name.toUpperCase()}</h3>
                      <div className="flex items-center relative">
                        <img 
                          src={category.image || `https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100`} 
                          alt={category.name} 
                          className="w-16 max-h-12 object-cover"
                        />
                        <div className="absolute inset-0 bg-white/50 opacity-0 group-hover/container:opacity-100 group-hover:!opacity-0 transition-opacity duration-300"></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-[500px] h-px bg-black">
              <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-black rounded-full transition-all duration-300" id="scroll-dot" style={{left: '0%'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-left mb-8">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              NEW COLLECTION
            </h2>
            <button className="text-black font-light underline hover:text-gray-600 transition-colors">
              Discover More
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 group/container">
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
                  <div className="absolute inset-0 bg-white/50 opacity-0 group-hover/container:opacity-100 group-hover:!opacity-0 transition-opacity duration-300"></div>
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

      {/* Latest Stories Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-left mb-8">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              LATEST STORIES
            </h2>
            <button className="text-black font-light underline hover:text-gray-600 transition-colors">
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto scrollbar-hide" id="stories-scroll">
            <div className="flex gap-6 group/container">
              {stories.map((story: any) => (
                <a 
                  key={story.id} 
                  href={story.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex-shrink-0 transition-all duration-300 group-hover/container:opacity-70 hover:!opacity-100" 
                  style={{ width: 'calc(100vw / 4.5)' }}
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/5] bg-gray-200">
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-white/50 opacity-0 group-hover/container:opacity-100 group-hover:!opacity-0 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="bg-gray-50 text-black p-4">
                    <p className="text-xs text-gray-600 mb-2 font-light">{new Date(story.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <h3 className="text-sm font-light tracking-wide text-left leading-relaxed">{story.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-[500px] h-px bg-black">
              <div className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-black rounded-full transition-all duration-300" id="stories-scroll-dot" style={{left: '0%'}}></div>
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