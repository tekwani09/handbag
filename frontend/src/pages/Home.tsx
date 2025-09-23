import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import CountrySwitcher from '../components/CountrySwitcher'
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
    const scrollTrack = scrollDot?.parentElement
    
    if (scrollContainer && scrollDot && scrollTrack) {
      const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const scrollPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        scrollDot.style.left = `${Math.min(scrollPercentage, 100)}%`
      }
      
      let isDragging = false
      
      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true
        e.preventDefault()
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        const rect = scrollTrack.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
        const percentage = (x / rect.width) * 100
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        scrollContainer.scrollLeft = (percentage / 100) * maxScroll
      }
      
      const handleMouseUp = () => {
        isDragging = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      const handleTrackClick = (e: MouseEvent) => {
        if (e.target === scrollTrack) {
          const rect = scrollTrack.getBoundingClientRect()
          const x = e.clientX - rect.left
          const percentage = (x / rect.width) * 100
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
          scrollContainer.scrollLeft = (percentage / 100) * maxScroll
        }
      }
      
      scrollContainer.addEventListener('scroll', handleScroll)
      scrollDot.addEventListener('mousedown', handleMouseDown)
      scrollTrack.addEventListener('click', handleTrackClick)
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        scrollDot.removeEventListener('mousedown', handleMouseDown)
        scrollTrack.removeEventListener('click', handleTrackClick)
      }
    }
  }, [categories])

  useEffect(() => {
    const scrollContainer = document.getElementById('stories-scroll')
    const scrollDot = document.getElementById('stories-scroll-dot')
    const scrollTrack = scrollDot?.parentElement
    
    if (scrollContainer && scrollDot && scrollTrack) {
      const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const scrollPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        scrollDot.style.left = `${Math.min(scrollPercentage, 100)}%`
      }
      
      let isDragging = false
      
      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true
        e.preventDefault()
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        const rect = scrollTrack.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
        const percentage = (x / rect.width) * 100
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        scrollContainer.scrollLeft = (percentage / 100) * maxScroll
      }
      
      const handleMouseUp = () => {
        isDragging = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      const handleTrackClick = (e: MouseEvent) => {
        if (e.target === scrollTrack) {
          const rect = scrollTrack.getBoundingClientRect()
          const x = e.clientX - rect.left
          const percentage = (x / rect.width) * 100
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
          scrollContainer.scrollLeft = (percentage / 100) * maxScroll
        }
      }
      
      scrollContainer.addEventListener('scroll', handleScroll)
      scrollDot.addEventListener('mousedown', handleMouseDown)
      scrollTrack.addEventListener('click', handleTrackClick)
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        scrollDot.removeEventListener('mousedown', handleMouseDown)
        scrollTrack.removeEventListener('click', handleTrackClick)
      }
    }
  }, [stories])

  useEffect(() => {
    const scrollContainer = document.getElementById('stories-scroll')
    const scrollDot = document.getElementById('stories-scroll-dot')
    const scrollTrack = scrollDot?.parentElement
    
    if (scrollContainer && scrollDot && scrollTrack) {
      const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const scrollPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        scrollDot.style.left = `${Math.min(scrollPercentage, 100)}%`
      }
      
      let isDragging = false
      
      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true
        e.preventDefault()
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        const rect = scrollTrack.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
        const percentage = (x / rect.width) * 100
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        scrollContainer.scrollLeft = (percentage / 100) * maxScroll
      }
      
      const handleMouseUp = () => {
        isDragging = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      const handleTrackClick = (e: MouseEvent) => {
        if (e.target === scrollTrack) {
          const rect = scrollTrack.getBoundingClientRect()
          const x = e.clientX - rect.left
          const percentage = (x / rect.width) * 100
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
          scrollContainer.scrollLeft = (percentage / 100) * maxScroll
        }
      }
      
      scrollContainer.addEventListener('scroll', handleScroll)
      scrollDot.addEventListener('mousedown', handleMouseDown)
      scrollTrack.addEventListener('click', handleTrackClick)
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        scrollDot.removeEventListener('mousedown', handleMouseDown)
        scrollTrack.removeEventListener('click', handleTrackClick)
      }
    }
  }, [])

  useEffect(() => {
    const scrollContainer = document.getElementById('collection-scroll')
    const scrollDot = document.getElementById('collection-scroll-dot')
    const scrollTrack = scrollDot?.parentElement
    
    if (scrollContainer && scrollDot && scrollTrack) {
      const handleScroll = () => {
        const scrollLeft = scrollContainer.scrollLeft
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        const scrollPercentage = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
        scrollDot.style.left = `${Math.min(scrollPercentage, 100)}%`
      }
      
      let isDragging = false
      
      const handleMouseDown = (e: MouseEvent) => {
        isDragging = true
        e.preventDefault()
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
      }
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        const rect = scrollTrack.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
        const percentage = (x / rect.width) * 100
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
        scrollContainer.scrollLeft = (percentage / 100) * maxScroll
      }
      
      const handleMouseUp = () => {
        isDragging = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      
      const handleTrackClick = (e: MouseEvent) => {
        if (e.target === scrollTrack) {
          const rect = scrollTrack.getBoundingClientRect()
          const x = e.clientX - rect.left
          const percentage = (x / rect.width) * 100
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth
          scrollContainer.scrollLeft = (percentage / 100) * maxScroll
        }
      }
      
      scrollContainer.addEventListener('scroll', handleScroll)
      scrollDot.addEventListener('mousedown', handleMouseDown)
      scrollTrack.addEventListener('click', handleTrackClick)
      
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll)
        scrollDot.removeEventListener('mousedown', handleMouseDown)
        scrollTrack.removeEventListener('click', handleTrackClick)
      }
    }
  }, [featuredProducts])

  const fetchFeaturedProducts = async () => {
    try {
      // Mock data for now
      setFeaturedProducts([
        { id: '1', name: 'Classic Tote', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'], priceGBP: 299, priceUSD: 379, priceINR: 24999 },
        { id: '2', name: 'Mini Crossbody', images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'], priceGBP: 199, priceUSD: 249, priceINR: 16499 },
        { id: '3', name: 'Evening Clutch', images: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'], priceGBP: 149, priceUSD: 189, priceINR: 12399 },
        { id: '4', name: 'Shoulder Bag', images: ['https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400'], priceGBP: 249, priceUSD: 319, priceINR: 20699 }
      ])
    } catch (error) {
      console.error('Failed to fetch products')
      setFeaturedProducts([])
    }
  }

  const fetchCategories = async () => {
    try {
      // Mock data for now
      setCategories([
        { id: '1', name: 'Totes', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100' },
        { id: '2', name: 'Crossbody', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=100' },
        { id: '3', name: 'Clutches', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100' },
        { id: '4', name: 'Shoulder Bags', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=100' }
      ])
    } catch (error) {
      console.error('Failed to fetch categories')
      setCategories([])
    }
  }

  const fetchStories = async () => {
    try {
      // Mock data for now
      setStories([])
    } catch (error) {
      console.error('Failed to fetch stories')
      setStories([])
    }
  }

  return (
    <div>
      {/* Main Hero Video Section */}
      <section className="relative h-[calc(100vh-7rem)] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80" 
            alt="Luxury handbags" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/30">
          <div className="h-full flex items-end justify-center pb-16">
            <div className="text-center text-white px-4">
              <p className="text-sm font-medium uppercase tracking-widest mb-4 max-w-2xl mx-auto">
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
          {/* Handbags */}
          <div className="relative group overflow-hidden">
            <div className="h-[calc(100vh-7rem)] bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Handbags" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-light mb-2 tracking-wide">HANDBAGS</h3>
              <Link to="/handbags" className="text-sm font-light underline hover:no-underline transition-all">
                Shop now
              </Link>
            </div>
          </div>

          {/* Accessories */}
          <div className="relative group overflow-hidden">
            <div className="h-[calc(100vh-7rem)] bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Accessories" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-light mb-2 tracking-wide">ACCESSORIES</h3>
              <Link to="/accessories" className="text-sm font-light underline hover:no-underline transition-all">
                Shop now
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
            <div className="relative w-[500px] h-4 bg-transparent cursor-pointer flex items-center">
              <div className="w-full h-px bg-black rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-black rounded-full transition-all duration-200 cursor-grab active:cursor-grabbing hover:scale-110 shadow-md" id="scroll-dot" style={{left: '0%'}}></div>
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
          
          <div className="overflow-x-auto scrollbar-hide" id="collection-scroll">
            <div className="flex gap-1 group/container">
              {featuredProducts.map((product: any) => (
                <Link key={product.id} to={`/products/${product.id}`} className="group flex-shrink-0 transition-all duration-300" style={{ width: 'calc(100vw / 5.5)' }}>
                  <div className="relative overflow-hidden">
                    <div className="aspect-[3/4] bg-gray-200">
                      {product.images?.[0] ? (
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-500 font-light">{product.name.toUpperCase()}</span>
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-white/50 opacity-0 group-hover/container:opacity-100 group-hover:!opacity-0 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-5 h-5 text-white hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="bg-gray-50 text-black pl-0.5 pr-4 py-4">
                    <h3 className="text-sm font-light mb-4 tracking-wide text-left">{product.name.toUpperCase()}</h3>
                    <div className="flex items-center relative">
                      <p className="text-sm font-light text-black opacity-0 group-hover:opacity-100 transition-opacity duration-300">{formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-[500px] h-4 bg-transparent cursor-pointer flex items-center">
              <div className="w-full h-px bg-black rounded-full"></div>
              <div className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-black rounded-full transition-all duration-200 cursor-grab active:cursor-grabbing hover:scale-110 shadow-md" id="collection-scroll-dot" style={{left: '0%'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tiles */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative group overflow-hidden">
            <div className="h-[calc(100vh-7rem)] bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80" 
                alt="Leather Goods" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-light mb-2 tracking-wide">LEATHER GOODS</h3>
              <Link to="/leather" className="text-sm font-light underline hover:no-underline transition-all">
                Explore Collection
              </Link>
            </div>
          </div>
          <div className="relative group overflow-hidden">
            <div className="h-[calc(100vh-7rem)] bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&q=80" 
                alt="Gift Sets" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-light mb-2 tracking-wide">GIFT SETS</h3>
              <Link to="/gifts" className="text-sm font-light underline hover:no-underline transition-all">
                Find Perfect Gift
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* @lancaster Section */}
      <section className="bg-white py-12">
        <div className="max-w-full mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-left mb-8">
            <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-wide">
              @lancaster
            </h2>
          </div>
          
          <div className="relative">
            <button 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              onClick={() => {
                const container = document.getElementById('lancaster-scroll');
                if (container) {
                  container.scrollLeft -= 300;
                }
              }}
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
              onClick={() => {
                const container = document.getElementById('lancaster-scroll');
                if (container) {
                  container.scrollLeft += 300;
                }
              }}
            >
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="overflow-x-auto scrollbar-hide" id="lancaster-scroll">
              <div className="flex gap-2">
                {[
                  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=300&h=300&fit=crop',
                  'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop'
                ].map((image, index) => (
                  <div key={index} className="group relative overflow-hidden aspect-square bg-gray-100 flex-shrink-0" style={{ width: '280px' }}>
                    <img 
                      src={image} 
                      alt={`Lancaster community style ${index + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Bar */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgb(240, 238, 233)'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path fill="#000" fillRule="evenodd" d="M4.795 5.333h12.936c.74 0 1.324 0 1.795.038.481.039.885.12 1.254.304.6.3 1.089.781 1.396 1.374l.069.128c.097.177.193.353.236.6.045.252.045.615.044 1.275v.67h4.93c.15 0 .294.07.385.19l4.06 5.326c.065.084.1.187.1.294v7.987a.485.485 0 0 1-.485.485h-2.26c-.236 1.513-1.564 2.663-3.154 2.663-1.59 0-2.917-1.15-3.154-2.663H9.053c-.237 1.513-1.565 2.663-3.154 2.663-1.6 0-2.936-1.165-3.16-2.694C1.198 23.757 0 22.45 0 20.857V9.1c0-.53 0-1.375.35-2.051a3.17 3.17 0 0 1 1.396-1.374c.368-.185.773-.265 1.253-.304.471-.038 1.056-.038 1.796-.038Zm.021.97c-.766 0-1.312 0-1.739.035-.422.034-.686.098-.897.204a2.2 2.2 0 0 0-.97.953C.98 7.94.97 8.559.97 9.141v11.716c0 1.049.76 1.934 1.782 2.135.254-1.492 1.572-2.62 3.147-2.62 1.59 0 2.917 1.15 3.154 2.662h12.503V9.141c0-.774-.002-1.04-.03-1.196-.014-.08-.024-.1-.093-.226-.028-.053-.066-.123-.118-.224a2.2 2.2 0 0 0-.97-.953c-.21-.106-.474-.17-.896-.204-.428-.035-.974-.035-1.74-.035H4.816Zm18.13 16.731c.238-1.513 1.566-2.662 3.155-2.662 1.59 0 2.918 1.15 3.154 2.662h1.775v-7.017h-8.505v7.017h.422Zm-.42-7.987h8.01l-3.321-4.356h-4.69v4.356ZM5.899 21.342c-1.235 0-2.222.982-2.222 2.177 0 1.196.987 2.178 2.222 2.178 1.235 0 2.222-.982 2.222-2.178 0-1.195-.987-2.177-2.222-2.177Zm20.202 0c-1.235 0-2.222.982-2.222 2.177 0 1.196.987 2.178 2.222 2.178 1.235 0 2.222-.982 2.222-2.178 0-1.195-.987-2.177-2.222-2.177ZM4.762 10.502c0-.268.217-.485.485-.485h11.43a.485.485 0 0 1 0 .97H5.247a.485.485 0 0 1-.485-.485Zm5.247 2.326a.485.485 0 0 0 0 .97h6.668a.485.485 0 1 0 0-.97h-6.668Z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-light text-black">Delivery in 72h</p>
              <div className="w-8 h-px bg-gray-300 mx-auto mt-2"></div>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgb(240, 238, 233)'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path fill="#000" fillRule="evenodd" d="M22.927 3.5H5.714c-.81 0-1.449 0-1.962.042-.525.042-.963.13-1.361.332-.651.329-1.18.854-1.513 1.5-.204.398-.293.834-.336 1.355C.5 7.239.5 7.873.5 8.676v11.203c0 .804 0 1.437.042 1.948.043.52.132.957.336 1.353a3.449 3.449 0 0 0 1.513 1.502c.398.2.836.29 1.36.332.514.041 1.153.041 1.963.041h9.79a.5.5 0 1 0 0-1H5.737c-.837 0-1.435 0-1.904-.038-.463-.038-.755-.11-.99-.228a2.448 2.448 0 0 1-1.075-1.066c-.118-.231-.19-.52-.228-.978-.039-.465-.039-1.058-.039-1.888v-9.484h25.641v3.611a.5.5 0 1 0 1 0V8.676c0-.803 0-1.437-.042-1.947-.043-.521-.132-.957-.335-1.354a3.448 3.448 0 0 0-1.513-1.501c-.399-.202-.837-.29-1.361-.332-.514-.042-1.153-.042-1.963-.042Zm4.214 5.873H1.5v-.675c0-.83 0-1.423.039-1.887.037-.459.11-.748.228-.98a2.448 2.448 0 0 1 1.075-1.065c.235-.118.527-.19.99-.228C4.302 4.5 4.9 4.5 5.736 4.5h17.17c.836 0 1.434 0 1.903.038.463.038.756.11.99.228.464.234.84.608 1.075 1.066.119.231.191.52.229.979.038.464.038 1.057.038 1.887v.675Zm-20.22 8.81a.5.5 0 1 0 0 1h2.96a.5.5 0 0 0 0-1H6.92Zm18.273-2.203c-2.105 0-3.818 1.694-3.818 3.791v1.15a7.57 7.57 0 0 0-.465.02c-.307.025-.584.078-.844.21a2.152 2.152 0 0 0-.944.936c-.133.259-.186.536-.212.841-.024.295-.024.658-.024 1.101v1.359c0 .443 0 .806.024 1.1.026.306.08.583.212.842.208.404.538.732.944.937.26.13.537.184.845.209.296.024.662.024 1.109.024h6.345c.447 0 .813 0 1.11-.024.307-.025.584-.078.844-.21.406-.204.736-.532.944-.936.133-.259.187-.536.212-.841.024-.295.024-.658.024-1.101v-1.359c0-.443 0-.806-.024-1.1-.025-.306-.08-.583-.212-.842a2.152 2.152 0 0 0-.944-.937c-.26-.13-.537-.184-.844-.209a7.57 7.57 0 0 0-.464-.02v-1.15c0-2.097-1.714-3.791-3.819-3.791Zm-3.318 5.944a.501.501 0 0 1-.08-.007c-.344 0-.598.004-.804.02-.246.02-.378.057-.474.106-.218.11-.395.286-.505.501-.048.094-.085.223-.105.466-.02.25-.02.571-.02 1.04v1.317c0 .469 0 .79.02 1.04.02.243.057.372.105.466.11.215.287.391.505.501.096.049.228.085.474.105.252.02.577.021 1.05.021h6.304c.472 0 .797 0 1.049-.02.246-.02.378-.057.474-.106.218-.11.395-.286.505-.501.048-.094.085-.223.105-.466.02-.25.021-.571.021-1.04V24.05c0-.469 0-.79-.02-1.04-.021-.243-.058-.372-.106-.466a1.153 1.153 0 0 0-.505-.501c-.096-.049-.228-.085-.474-.105a10.81 10.81 0 0 0-.805-.02.501.501 0 0 1-.158 0h-6.476a.5.5 0 0 1-.08.006Zm.5-2.153v1.146h5.636v-1.146c0-1.538-1.258-2.791-2.819-2.791-1.56 0-2.817 1.253-2.817 2.791Z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-light text-black">Secure payment</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgb(240, 238, 233)'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path fill="#000" fillRule="evenodd" d="M9.444 4.5h13.112c1.288 0 2.285 0 3.084.066.809.067 1.459.204 2.04.503a5.19 5.19 0 0 1 2.258 2.28c.295.586.43 1.24.497 2.057a13.748 13.748 0 0 1 .024.353c.041.743.041 1.643.041 2.761v6.96c0 1.3 0 2.308-.065 3.114-.066.816-.202 1.471-.497 2.057a5.19 5.19 0 0 1-2.257 2.28c-.582.3-1.232.436-2.041.503-.8.066-1.796.066-3.084.066H9.444c-1.288 0-2.285 0-3.084-.066-.809-.067-1.459-.204-2.04-.503a5.19 5.19 0 0 1-2.258-2.28c-.295-.586-.43-1.24-.497-2.057C1.5 21.788 1.5 20.78 1.5 19.48v-6.96c0-1.15 0-2.071.045-2.827l.001-.02c.006-.09.012-.18.02-.267.065-.816.2-1.471.496-2.057a5.19 5.19 0 0 1 2.257-2.28c.582-.3 1.232-.436 2.041-.503.8-.066 1.796-.066 3.084-.066ZM2.51 10.632c-.01.543-.011 1.17-.011 1.91v6.915c0 1.328 0 2.295.062 3.056.061.756.18 1.265.393 1.688a4.19 4.19 0 0 0 1.822 1.84c.416.215.919.335 1.666.396.753.063 1.709.063 3.024.063h13.066c1.316 0 2.271 0 3.024-.063.747-.061 1.25-.181 1.666-.395a4.19 4.19 0 0 0 1.822-1.841c.213-.423.332-.932.393-1.688.062-.761.062-1.728.062-3.056v-6.914c0-.712 0-1.32-.01-1.847l-7.658 5.16-.101.069c-1.897 1.273-2.962 1.989-4.126 2.27a6.659 6.659 0 0 1-3.128 0c-1.164-.281-2.23-.997-4.125-2.27l-.1-.068h-.002l-7.74-5.225Zm26.93-1.109-.003-.036c-.061-.756-.18-1.265-.393-1.688a4.19 4.19 0 0 0-1.822-1.84c-.416-.215-.919-.335-1.666-.396-.753-.063-1.708-.063-3.024-.063H9.467c-1.315 0-2.271 0-3.024.063-.747.061-1.25.181-1.666.395A4.19 4.19 0 0 0 2.955 7.8c-.21.418-.33.92-.391 1.663l8.245 5.565c2.024 1.36 2.935 1.962 3.903 2.196a5.663 5.663 0 0 0 2.659 0c.968-.234 1.878-.836 3.902-2.196l8.168-5.504Z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-light text-black">contact@lancaster.com</p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgb(240, 238, 233)'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                  <path fill="#000" fillRule="evenodd" d="M26.145 2a.5.5 0 0 1 1 0v5.25a.5.5 0 0 1-.5.5h-5.207a.5.5 0 0 1 0-1h4.195c-2.442-2.618-5.907-4.25-9.749-4.25C8.496 2.5 2.5 8.54 2.5 16c0 .572.035 1.136.104 1.689a.5.5 0 0 1-.993.122A14.755 14.755 0 0 1 1.501 16c0-8.004 6.435-14.5 14.383-14.5 4.019 0 7.652 1.662 10.261 4.338V2Zm3.251 12.311a.5.5 0 0 1 .993-.122c.018.15.035.3.049.451a.5.5 0 0 1-.232.47.5.5 0 0 1 .287.436 14.875 14.875 0 0 1-.036 1.587.5.5 0 0 1-.997-.076 13.784 13.784 0 0 0 .034-1.48.5.5 0 0 1 .233-.438.5.5 0 0 1-.285-.407c-.013-.14-.028-.281-.046-.42Zm-.26 4.831a.5.5 0 1 1 .973.23 14.459 14.459 0 0 1-.692 2.158.5.5 0 0 1-.926-.38c.265-.645.481-1.316.645-2.008Zm-1.594 3.893a.5.5 0 1 1 .855.518 14.522 14.522 0 0 1-1.323 1.84.5.5 0 0 1-.764-.645c.453-.537.865-1.11 1.232-1.713ZM10.909 24.25a.5.5 0 1 1 0 1H9.607a.5.5 0 0 1 0-1h1.302Zm-3.905 0a.5.5 0 1 1 0 1h-.637c.118.126.238.25.36.372a.5.5 0 0 1-.525.824.5.5 0 0 1-1 0v-1.313c0-.044.006-.087.017-.128a.5.5 0 0 1-.017-.127v-.128a.5.5 0 0 1 .5-.5h1.302Zm17.823 2a.5.5 0 0 1 .655.755 14.43 14.43 0 0 1-1.825 1.345.5.5 0 0 1-.528-.85 13.441 13.441 0 0 0 1.698-1.25ZM7.564 27.66a.5.5 0 0 1 .598-.801c.505.377 1.038.72 1.594 1.023a.5.5 0 0 1-.48.877 14.387 14.387 0 0 1-1.712-1.099Zm-2.362 1.155a.5.5 0 0 1 1 0V30a.5.5 0 0 1-1 0v-1.185Zm16.054-.346a.5.5 0 0 1 .387.922c-.692.29-1.412.528-2.154.708a.5.5 0 1 1-.236-.972c.69-.167 1.36-.388 2.003-.658Zm-10.127 1.136a.5.5 0 1 1 .349-.937c.587.219 1.194.397 1.816.532a.5.5 0 1 1-.211.977 14.19 14.19 0 0 1-1.954-.572Zm6.042-.146a.5.5 0 1 1 .079.997 14.432 14.432 0 0 1-2.152.008.5.5 0 0 1 .07-.997 13.5 13.5 0 0 0 2.003-.008Z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm font-light text-black">Returns within 14 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        {/* Top Section - Social & Newsletter */}
        <div className="py-12 border-t border-gray-200" style={{backgroundColor: '#fcfcfb'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Social Media */}
              <div className="text-center">
                <h4 className="text-lg font-light text-black mb-4">Follow us</h4>
                <div className="flex justify-center space-x-4">
                  <a href="https://www.facebook.com/lancasterparis" target="_blank" rel="noopener" className="text-gray-600 hover:text-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 320 512">
                      <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/lancasterparis" target="_blank" rel="noopener" className="text-gray-600 hover:text-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.2048 2.25H21.5128L14.2858 10.51L22.7878 21.75H16.1308L10.9168 14.933L4.95084 21.75H1.64084L9.37084 12.915L1.21484 2.25H8.04084L12.7538 8.481L18.2048 2.25ZM17.0438 19.77H18.8768L7.04484 4.126H5.07784L17.0438 19.77Z"/>
                    </svg>
                  </a>
                  <a href="https://www.pinterest.fr/lancasterparis/" target="_blank" rel="noopener" className="text-gray-600 hover:text-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 384 512">
                      <path d="M204 6.5C101.4 6.5 0 74.9 0 185.6 0 256 39.6 296 63.6 296c9.9 0 15.6-27.6 15.6-35.4 0-9.3-23.7-29.1-23.7-67.8 0-80.4 61.2-137.4 140.4-137.4 68.1 0 118.5 38.7 118.5 109.8 0 53.1-21.3 152.7-90.3 152.7-24.9 0-46.2-18-46.2-43.8 0-37.8 26.4-74.4 26.4-113.4 0-66.2-93.9-54.2-93.9 25.8 0 16.8 2.1 35.4 9.6 50.7-13.8 59.4-42 147.9-42 209.1 0 18.9 2.7 37.5 4.5 56.4 3.4 3.8 1.7 3.4 6.9 1.5 50.4-69 48.6-82.5 71.4-172.8 12.3 23.4 44.1 36 69.3 36 106.2 0 153.9-103.5 153.9-196.8C384 71.3 298.2 6.5 204 6.5z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/lancaster/" target="_blank" rel="noopener" className="text-gray-600 hover:text-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@lancaster" target="_blank" rel="noopener" className="text-gray-600 hover:text-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 448 512">
                      <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/user/lancasterparis" target="_blank" rel="noopener" className="text-gray-600 hover:text-black transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 576 512">
                      <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="text-center">
                <h4 className="text-lg font-light text-black mb-4">Subscribe to the newsletter</h4>
                <form className="flex max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter email here" 
                    className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
                    required
                  />
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 14 10">
                      <path fillRule="evenodd" clipRule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor"/>
                    </svg>
                  </button>
                </form>
                <p className="text-xs text-gray-600 mt-2">
                  By subscribing to the newsletter, you agree to our <a href="/privacy-policy" className="underline hover:no-underline">privacy policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle Section */}
        <div className="border-t border-gray-200 py-16" style={{backgroundColor: '#f0eee9'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Customer Care */}
              <div>
                <h4 className="text-lg font-light text-black mb-6">Customer Care</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Contact Us</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Size Guide</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Shipping & Returns</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Care Instructions</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">FAQ</a></li>
                </ul>
              </div>
              
              {/* About */}
              <div>
                <h4 className="text-lg font-light text-black mb-6">About</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Our Story</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Craftsmanship</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Sustainability</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Careers</a></li>
                </ul>
              </div>
              
              {/* Legal */}
              <div>
                <h4 className="text-lg font-light text-black mb-6">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Terms & Conditions</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Cookie Policy</a></li>
                </ul>
              </div>
              
              {/* Connect */}
              <div>
                <h4 className="text-lg font-light text-black mb-6">Connect</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Instagram</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Facebook</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-sm text-gray-600 hover:text-black transition-colors">Pinterest</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-200 py-8" style={{backgroundColor: '#f0eee9'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Country Selector */}
              <div>
                <CountrySwitcher />
              </div>
              
              {/* Logo */}
              <div className="text-center">
                <Link to="/" className="text-2xl font-light tracking-widest text-black hover:text-gray-600 transition-colors">
                  STRATHBERRY
                </Link>
              </div>
              
              {/* Copyright */}
              <div className="text-sm text-gray-500">
                © 2024 Strathberry. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}