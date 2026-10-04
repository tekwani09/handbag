import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'
import { API_BASE_URL } from '../config/api'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

// Luxury collection content with story, materials, and colorways
const COLLECTION_DETAILS: Record<string, {
  eyebrow: string
  tagline: string
  heroImage: string
  stories: Array<{
    title: string
    text: string
    image: string
    reverse?: boolean
  }>
  materialsTitle?: string
  materialsText?: string
  materialsImage?: string
  closeText: string
}> = {
  'mosaic-collection': {
    eyebrow: 'The Iconic Family',
    tagline: 'Crafted for the modern woman who moves between worlds',
    heroImage: 'https://dato-cdn.strathberry.com/1760628871-family_mosaic.jpg',
    stories: [
      {
        title: 'Timeless Design',
        text: 'The Mosaic collection represents the intersection of functionality and beauty. Each piece is meticulously crafted to accompany you through every chapter of your story.',
        image: 'https://dato-cdn.strathberry.com/1760628871-family_mosaic.jpg'
      },
      {
        title: 'Handcrafted Excellence',
        text: 'We believe in the power of craftsmanship. Every Mosaic bag is made with precision and care, using only the finest materials sourced from around the world.',
        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
        reverse: true
      }
    ],
    materialsTitle: 'Premium Materials',
    materialsText: 'Our bags are constructed using carefully selected leathers and materials that develop character over time. The Mosaic collection features rich vegetable-tanned leather and polished hardware.',
    materialsImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600',
    closeText: 'Each Mosaic piece tells a story. Make yours legendary.'
  },
  'travel-bags': {
    eyebrow: 'The Adventure Awaits',
    tagline: 'Built for journeys, designed for living',
    heroImage: 'https://dato-cdn.strathberry.com/1760628871-family_mosaic.jpg',
    stories: [
      {
        title: 'Travel Reimagined',
        text: 'Our travel collection combines luxury with practicality. Each bag is designed to carry your essentials while maintaining the elegance you expect from HEGĒTT.',
        image: 'https://dato-cdn.strathberry.com/1760628871-family_mosaic.jpg'
      }
    ],
    closeText: 'Travel in style. Travel in luxury.'
  }
}

// Virtual collections that don't exist as DB categories
const VIRTUAL_COLLECTIONS: Record<string, {
  name: string
  description: string
  image: string
  filter: (product: any) => boolean
}> = {
  'new-arrivals': {
    name: 'New Arrivals',
    description: 'The latest additions to our collection.',
    image: 'https://dato-cdn.strathberry.com/1766484148-desktop-portrait-not-top-main-newseason.jpg?w=1600&fm=webp&auto=compress%2Cenhance',
    filter: (product) => {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      return new Date(product.createdAt) > thirtyDaysAgo
    }
  },
  'bestsellers': {
    name: 'Bestsellers',
    description: 'The coveted styles on everybody\'s wishlist.',
    image: 'https://dato-cdn.strathberry.com/1766485478-desktop-portrait-not-top-main-bestsellers-update.jpg?w=1600&fm=webp&auto=compress%2Cenhance',
    filter: (product) => product.featured === true
  },
  'new-silhouettes': {
    name: 'New Silhouettes',
    description: 'Discover our latest bag shapes and silhouettes.',
    image: 'https://dato-cdn.strathberry.com/1760949947-family_stylist.jpg',
    filter: (product) => {
      const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
      return new Date(product.createdAt) > sixtyDaysAgo
    }
  },
  'mosaic-collection': {
    name: 'Mosaic Collection',
    description: 'Explore the iconic Mosaic family.',
    image: 'https://dato-cdn.strathberry.com/1760628871-family_mosaic.jpg',
    filter: (product) => product.family === 'MOSAIC'
  },
  'travel-bags': {
    name: 'The Travel Collection',
    description: 'Bags built for the journey ahead.',
    image: 'https://dato-cdn.strathberry.com/1760628871-family_mosaic.jpg',
    filter: (product) => (product.category || '').toUpperCase() === 'TRAVEL_BAGS'
  },
}

export default function Collection() {
  const { slug } = useParams()
  const { selectedCountry } = useCurrency()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { addItem, toggleCart } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()
  const [collectionDetails, setCollectionDetails] = useState<any>(null)

  useEffect(() => {
    if (slug) {
      fetchCollection()
    }
  }, [slug])

  const fetchCollection = async () => {
    try {
      // Check if this is a virtual collection first
      const virtual = VIRTUAL_COLLECTIONS[slug!]
      if (virtual) {
        const productsResponse = await fetch(`${API_BASE_URL}/products`)
        const productsData = await productsResponse.json()
        const allProducts = productsData.products || []
        const filteredProducts = allProducts.filter(virtual.filter)
        setCategory({ name: virtual.name, description: virtual.description, image: virtual.image })
        setProducts(filteredProducts)
        
      // Generate dynamic collection details
        const dynamicDetails = {
          eyebrow: virtual.name.toUpperCase(),
          tagline: virtual.description,
          heroImage: virtual.image,
          stories: [
            {
              title: 'Our Craft',
              text: virtual.description,
              image: virtual.image,
              reverse: false
            },
            {
              title: 'The Story',
              text: virtual.description,
              image: virtual.image,
              reverse: true
            }
          ],
          closeText: `Discover the ${virtual.name} collection`
        }
        setCollectionDetails(dynamicDetails)
        return
      }

      // Otherwise treat as a DB category slug
      const categoryResponse = await fetch(`${API_BASE_URL}/categories/${slug}`)
      const categoryData = await categoryResponse.json()
      
      if (!categoryData.category) {
        setLoading(false)
        return
      }
      
      // Use the category ID (enum value) to fetch products
      const productsResponse = await fetch(`${API_BASE_URL}/products?category=${categoryData.category.id}`)
      const productsData = await productsResponse.json()
      const filteredProducts = productsData.products || []
      
      setCategory(categoryData.category)
      setProducts(filteredProducts)
      
      // Generate dynamic collection details for all categories with TWO story spreads
      const defaultImage = categoryData.category?.image || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200'
      const dynamicDetails = {
        eyebrow: categoryData.category?.name?.toUpperCase() || 'Collection',
        tagline: categoryData.category?.description || 'Explore our curated selection',
        heroImage: defaultImage,
        stories: [
          {
            title: 'Our Craft',
            text: categoryData.category?.description || 'Each piece in this collection is crafted with precision and care.',
            image: defaultImage,
            reverse: false
          },
          {
            title: 'The Story',
            text: categoryData.category?.description || 'Each piece in this collection is crafted with precision and care.',
            image: defaultImage,
            reverse: true
          }
        ],
        closeText: `Discover the ${categoryData.category?.name} collection`
      }
      setCollectionDetails(dynamicDetails)
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
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EC]">
        <div className="text-sm text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EC]">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Collection not found</h1>
          <Link to="/" className="text-sm underline hover:no-underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  // Use luxury layout for all featured collections with products
  if (collectionDetails && products.length > 0) {
    const isSingleColorway = products.length === 1
    
    return (
      <div style={{ backgroundColor: '#F5F2EC', color: '#211D19', fontFamily: "'Work Sans', sans-serif" }}>
        {/* Hero Image */}
        <div style={{ 
          width: '100%',
          marginBottom: '130px',
          overflow: 'hidden',
          aspectRatio: isSingleColorway ? '1448/1086' : '1536/1024',
          maxHeight: '82vh'
        }}>
          <img 
            src={products.length > 0 && products[0].productModelImage ? products[0].productModelImage : collectionDetails.heroImage}
            alt={category.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Title Block */}
        <div style={{ 
          maxWidth: '720px', 
          margin: '0 auto 100px', 
          textAlign: 'center', 
          padding: '0 24px' 
        }}>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#7A4B32',
            marginBottom: '18px'
          }}>
            {collectionDetails.eyebrow}
          </div>
          <h1 style={{
            fontFamily: "'Newsreader', serif",
            fontWeight: 400,
            fontSize: '44px',
            marginBottom: '16px',
            color: '#211D19'
          }}>
            {category.name}
          </h1>
          <p style={{
            fontFamily: "'Newsreader', serif",
            fontStyle: 'italic',
            fontSize: '18px',
            color: 'rgba(33, 29, 25, 0.65)'
          }}>
            {collectionDetails.tagline}
          </p>
        </div>

        {/* Story Spreads */}
        {collectionDetails.stories?.map((story: any, idx: number) => (
          <section key={idx} style={{
            maxWidth: '1200px',
            margin: '0 auto 130px',
            padding: '0 5vw',
            display: 'flex',
            alignItems: 'center',
            gap: '6vw',
            flexDirection: story.reverse ? 'row-reverse' : 'row'
          }}>
            <div style={{ maxWidth: '400px' }}>
              <div style={{
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#7A4B32',
                marginBottom: '18px'
              }}>
                Collection
              </div>
              <p style={{
                fontFamily: "'Newsreader', serif",
                fontWeight: 400,
                fontSize: '23px',
                lineHeight: '1.65',
                color: '#211D19'
              }}>
                {story.text}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <img 
                src={story.image}
                alt={story.title}
                style={{ width: '100%', objectFit: 'cover', display: 'block', height: isSingleColorway ? 'auto' : '520px' }}
              />
            </div>
          </section>
        ))}

        {/* Colorways Section */}
        {products.length > 0 && (
          <section style={{
            maxWidth: '1100px',
            margin: '0 auto 130px',
            padding: '0 5vw',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '12px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#7A4B32',
              marginBottom: '40px'
            }}>
              {isSingleColorway ? 'The Collection' : 'Available Colors'}
            </div>
            
            {/* Product Grid */}
            <div style={{
              display: 'flex',
              gap: '32px',
              flexDirection: isSingleColorway ? 'row' : 'row',
              justifyContent: isSingleColorway ? 'center' : 'flex-start',
              alignItems: isSingleColorway ? 'center' : 'flex-start',
              flexWrap: 'wrap'
            }}>
              {isSingleColorway ? (
                // Single colorway - center single item
                products.slice(0, 1).map((product: any) => (
                  <div key={product.id} style={{ flex: isSingleColorway ? 'none' : 1, minWidth: 0 }}>
                    <div style={{
                      height: '460px',
                      marginBottom: '16px',
                      overflow: 'hidden',
                      backgroundColor: '#f0f0f0'
                    }}>
                      <img 
                        src={product.productModelImage || product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <p style={{
                      fontFamily: "'Newsreader', serif",
                      fontStyle: 'italic',
                      fontSize: '17px',
                      marginBottom: '8px',
                      color: '#211D19'
                    }}>
                      {product.color}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      marginBottom: '16px',
                      color: '#211D19'
                    }}>
                      {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
                    </p>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      style={{
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        textDecoration: 'underline',
                        border: 'none',
                        background: 'transparent',
                        color: '#211D19',
                        cursor: 'pointer',
                        fontFamily: "'Work Sans', sans-serif"
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                ))
              ) : (
                // Multiple colorways - show grid
                products.slice(0, 2).map((product: any) => (
                  <div key={product.id} style={{ flex: 1, minWidth: '240px' }}>
                    <div style={{
                      height: '460px',
                      marginBottom: '16px',
                      overflow: 'hidden',
                      backgroundColor: '#f0f0f0'
                    }}>
                      <img 
                        src={product.productModelImage || product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    <p style={{
                      fontFamily: "'Newsreader', serif",
                      fontStyle: 'italic',
                      fontSize: '17px',
                      marginBottom: '8px',
                      color: '#211D19'
                    }}>
                      {product.color}
                    </p>
                    <p style={{
                      fontSize: '14px',
                      fontWeight: 400,
                      marginBottom: '16px',
                      color: '#211D19'
                    }}>
                      {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
                    </p>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      style={{
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        textDecoration: 'underline',
                        border: 'none',
                        background: 'transparent',
                        color: '#211D19',
                        cursor: 'pointer',
                        fontFamily: "'Work Sans', sans-serif"
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                ))
              )}
            </div>
          </section>
        )}

        {/* Materials Section (for two-colorway) */}
        {!isSingleColorway && collectionDetails.materialsText && (
          <section style={{
            maxWidth: '1200px',
            margin: '0 auto 130px',
            padding: '0 5vw',
            display: 'flex',
            alignItems: 'center',
            gap: '6vw'
          }}>
            <div style={{ maxWidth: '400px' }}>
              <div style={{
                fontSize: '12px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#7A4B32',
                marginBottom: '18px'
              }}>
                Materials
              </div>
              <p style={{
                fontFamily: "'Newsreader', serif",
                fontWeight: 400,
                fontSize: '23px',
                lineHeight: '1.65',
                color: '#211D19'
              }}>
                {collectionDetails.materialsText}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <img 
                src={collectionDetails.materialsImage}
                alt="Materials"
                style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </section>
        )}

        {/* Close Section */}
        <div style={{
          maxWidth: '520px',
          margin: '60px auto 0',
          textAlign: 'center',
          padding: '0 24px',
          paddingBottom: '60px'
        }}>
          <p style={{
            fontFamily: "'Newsreader', serif",
            fontSize: '20px',
            lineHeight: '1.6',
            marginBottom: '10px',
            color: '#211D19'
          }}>
            {collectionDetails.closeText}
          </p>
          <div style={{
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#7A4B32'
          }}>
            Discover your signature style
          </div>
        </div>

        {/* Mobile Styles */}
        <style>{`
          @media (max-width: 900px) {
            section {
              padding-left: 24px !important;
              padding-right: 24px !important;
            }
            section[style*="flex-direction: row"] {
              flex-direction: column !important;
              align-items: stretch !important;
            }
            section[style*="flex-direction: row-reverse"] {
              flex-direction: column !important;
              align-items: stretch !important;
            }
          }
        `}</style>
      </div>
    )
  }

  // Fallback to product grid for regular collections
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
                    
                    <div className="space-y-1">
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-light text-sm hover:underline">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-light text-gray-700">{product.color}</span>
                        <div className="flex gap-1 pr-1">
                          {product.colorHex && (
                            <div
                              title={product.color}
                              className="size-3.5 overflow-hidden rounded-full shadow"
                              style={{ backgroundColor: product.colorHex }}
                            />
                          )}
                          {products.filter((p: any) =>
                            (p.name === product.name && p.id !== product.id) ||
                            (p.parentProductId === product.id) ||
                            (product.parentProductId && p.parentProductId === product.parentProductId && p.id !== product.id) ||
                            (product.parentProductId === p.id)
                          ).slice(0, 2).map((variant: any) => (
                            <Link
                              key={variant.id}
                              to={`/products/${variant.id}`}
                              title={variant.color}
                              className="size-3.5 overflow-hidden rounded-full shadow cursor-pointer hover:scale-110 transition-transform"
                              style={{ backgroundColor: variant.colorHex }}
                            />
                          ))}
                          {products.filter((p: any) =>
                            (p.name === product.name && p.id !== product.id) ||
                            (p.parentProductId === product.id) ||
                            (product.parentProductId && p.parentProductId === product.parentProductId && p.id !== product.id) ||
                            (product.parentProductId === p.id)
                          ).length > 2 && (
                            <span className="text-xs text-black/50">
                              +{products.filter((p: any) =>
                                (p.name === product.name && p.id !== product.id) ||
                                (p.parentProductId === product.id) ||
                                (product.parentProductId && p.parentProductId === product.parentProductId && p.id !== product.id) ||
                                (product.parentProductId === p.id)
                              ).length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm font-normal text-black">
                        {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <button 
                          onClick={() => handleAddToCart(product)}
                          className="text-sm uppercase tracking-wide underline hover:no-underline transition-all"
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