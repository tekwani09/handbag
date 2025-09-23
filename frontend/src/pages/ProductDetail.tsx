import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'
import { API_BASE_URL } from '../config/api'
import Footer from '../components/Footer'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

export default function ProductDetail() {
  const { id } = useParams()
  const { selectedCountry } = useCurrency()
  const [product, setProduct] = useState<any>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [showSizeFitModal, setShowSizeFitModal] = useState(false)
  const [showFeaturesCareModal, setShowFeaturesCareModal] = useState(false)
  const [showDeliveryReturnsModal, setShowDeliveryReturnsModal] = useState(false)
  
  const { addItem, toggleCart } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      image: productImages[0],
      product: product
    })
    toggleCart()
  }

  const handleWishlist = () => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: getProductPrice(product, selectedCountry.currency),
      image: productImages[0]
    })
  }

  useEffect(() => {
    fetchProduct()
    fetchRelatedProducts()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`)
      const data = await response.json()
      setProduct(data.product)
    } catch (error) {
      console.error('Failed to fetch product')
    }
  }

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/products?limit=4`)
      const data = await response.json()
      setRelatedProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch related products')
    }
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const productImages = product.images || ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800']

  return (
    <main className="min-h-screen">
      <section className="relative flex flex-row-reverse min-h-[calc(100vh-68px)]">
        {/* Product Info Sidebar */}
        <div className="w-[35%]" style={{backgroundColor: '#FCFCFB'}}>
          <div className="sticky top-[68px] min-h-[calc(100vh-68px)] flex flex-col p-8">
            {/* Breadcrumb */}
            <nav className="opacity-75 mb-8 hidden lg:block">
              <ul className="text-sm">
                <li className="inline-block text-xs uppercase tracking-wide mr-2 after:content-['/'] after:pl-2">
                  <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li className="inline-block text-xs uppercase tracking-wide">
                  <Link to="/products" className="hover:underline">Products</Link>
                </li>
              </ul>
            </nav>

            {/* Product Title */}
            <div className="mb-6">
              <h1 className="sr-only">{product.name}</h1>
              <div className="font-light text-3xl relative">
                {product.name}
                <button 
                  onClick={handleWishlist}
                  className="absolute translate-x-1 -translate-y-1/4 p-2 -m-2 group"
                >
                  <svg 
                    className={`w-4 h-4 transition-all group-hover:scale-110 ${
                      isWishlisted(product.id) ? 'fill-black text-black' : 'text-white hover:text-black'
                    }`} 
                    fill={isWishlisted(product.id) ? 'currentColor' : 'none'} 
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="text-sm mb-4">
                {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 hidden lg:block">
              <p className="text-sm leading-relaxed">
                {product.description || "Inspired by graceful freedom, this bag is designed to accompany every woman's movement through life with effortless ease. Its soft silhouette and luxurious fine-grain leather reflect the fluidity and strength of those moments when we feel truly free."}
              </p>
            </div>

            {/* Trust Signals */}
            <div className="mb-8 hidden lg:block">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Shipping: end of October
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mb-8">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 px-6 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
              >
                Add to Bag
              </button>
            </div>

            {/* Accordion */}
            <div className="space-y-0 border-t border-gray-200">
              {['Size & Fit', 'Features & Care', 'Delivery & Returns'].map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button 
                    className="w-full py-4 flex items-center justify-between text-sm hover:opacity-70"
                    onClick={() => {
                      if (item === 'Size & Fit') setShowSizeFitModal(true)
                      if (item === 'Features & Care') setShowFeaturesCareModal(true)
                      if (item === 'Delivery & Returns') setShowDeliveryReturnsModal(true)
                    }}
                  >
                    <span>{item}</span>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 320 512">
                      <path d="M315.3 244.7c6.2 6.2 6.2 16.4 0 22.6l-208 208c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L281.4 256 84.7 59.3c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l208 208z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex-1"></div>

            {/* Bottom Links */}
            <div className="flex gap-8 mt-8">
              <button className="text-xs uppercase tracking-wide underline hover:no-underline">
                In-store availability
              </button>
              <a href="#" className="text-xs uppercase tracking-wide underline hover:no-underline">
                Book an appointment
              </a>
            </div>
          </div>
        </div>

        {/* Product Gallery */}
        <div className="flex-1 bg-surface-image">
          <ul className="pdp-gallery lg:flex-row lg:flex-wrap ml-0 mr-0 flex flex-col gap-0 transition-all bg-surface-image min-h-[calc(100vh-68px)] divide-y-2 divide-x-2 flex-1 content-start">
            {productImages.map((image, index) => (
              <li key={index} className="w-full lg:w-[50%] relative transition-all border-surface-secondary">
                <div className="cursor-zoom-in outline-none w-full aspect-image">
                  <img 
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="fadeIn object-cover z-[1] w-full aspect-image"
                    onClick={() => setSelectedImageIndex(index)}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Similar Styles */}
      <section className="bg-gray-50 p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-light mb-6">Similar Styles</h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {relatedProducts.slice(0, 4).map((relatedProduct: any) => (
            <div key={relatedProduct.id} className="group">
              <Link to={`/products/${relatedProduct.id}`}>
                <div className="aspect-square bg-gray-200 mb-4 overflow-hidden">
                  <img 
                    src={relatedProduct.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="px-2">
                <Link to={`/products/${relatedProduct.id}`}>
                  <h3 className="text-sm font-light mb-4 hover:underline">{relatedProduct.name}</h3>
                </Link>
                <button 
                  onClick={() => {
                    addItem({
                      id: relatedProduct.id,
                      name: relatedProduct.name,
                      image: relatedProduct.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                      product: relatedProduct
                    })
                    toggleCart()
                  }}
                  className="text-xs uppercase tracking-wide underline hover:no-underline"
                >
                  add to bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Fits */}
      <section className="block lg:flex items-start lg:w-full">
        <div className="block lg:flex lg:w-[65%] flex-none">
          <div className="overflow-hidden">
            <video 
              className="w-full h-full object-cover" 
              playsInline 
              preload="auto" 
              poster="https://image.mux.com/odOLJG01srBn3PODbQBksonEcOA3cooPU/thumbnail.jpg?ar=16:9&fm=jpg&format=auto" 
              loop
            >
              <source src="https://stream.mux.com/odOLJG01srBn3PODbQBksonEcOA3cooPU/high.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className="block lg:flex lg:w-[35%] flex-none">
          <div className="flex flex-col xl:pb-8 md:pb-6 xl:px-10 lg:px-8 md:px-6 px-4 pt-10 xl:pt-14 pb-10">
            <div className="mb-8 xl:mb-10">
              <h2 className="xl:text-5xl text-4xl font-light mb-8 xl:mb-10 mt-4 lg:mt-0">What Fits?</h2>
              <div className="text-sm mt-10 mb-6 w-[90%] md:w-2/3 lg:w-[90%]">
                <p>Large enough to carry your laptop, keys, wallet and more – the {product.name} is perfect for your 9-to-5.</p>
              </div>
              <button className="hover:bg-black hover:text-white cursor-pointer transition-all bg-transparent uppercase border border-black tracking-wide text-sm px-4 py-2">
                CHECK DEVICE SIZES
              </button>
            </div>
            <div className="flex-1"></div>
            <div className="grid grid-cols-2 lg:block gap-2">
              <ol className="flex flex-col">
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">01</span>
                  <span className="text-sm capitalize">14-inch Macbook Pro</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">02</span>
                  <span className="text-sm capitalize">11-inch iPad Pro</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">03</span>
                  <span className="text-sm capitalize underline">Multrees Notebook</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">04</span>
                  <span className="text-sm capitalize underline">Kite Medium Trifold</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">05</span>
                  <span className="text-sm capitalize">Water bottle</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">06</span>
                  <span className="text-sm capitalize">iPhone 14 Plus</span>
                </li>
              </ol>
              <ol className="flex flex-col">
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">07</span>
                  <span className="text-sm capitalize underline">Multrees Sunglasses Case</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">08</span>
                  <span className="text-sm capitalize">Hand cream</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">09</span>
                  <span className="text-sm capitalize">Perfume</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">10</span>
                  <span className="text-sm capitalize">Makeup Powder</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">11</span>
                  <span className="text-sm capitalize">Airpods</span>
                </li>
                <li className="relative pl-11 mb-2">
                  <span className="text-sm absolute left-0">12</span>
                  <span className="text-sm capitalize">Keys</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      <section className="p-8">
        <div className="mb-8">
          <h2 className="text-4xl font-light mb-6">You May Also Like</h2>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {relatedProducts.slice(0, 4).map((relatedProduct: any) => (
            <div key={`also-${relatedProduct.id}`} className="group">
              <Link to={`/products/${relatedProduct.id}`}>
                <div className="aspect-square bg-gray-200 mb-4 overflow-hidden relative">
                  <img 
                    src={relatedProduct.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
              <div className="px-2">
                <Link to={`/products/${relatedProduct.id}`}>
                  <h3 className="text-sm font-light mb-4 hover:underline">{relatedProduct.name}</h3>
                </Link>
                <button 
                  onClick={() => {
                    addItem({
                      id: relatedProduct.id,
                      name: relatedProduct.name,
                      image: relatedProduct.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
                      product: relatedProduct
                    })
                    toggleCart()
                  }}
                  className="text-xs uppercase tracking-wide underline hover:no-underline"
                >
                  add to bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />

      {/* Size & Fit Modal */}
      {showSizeFitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
          <div className="flex shadow-sm">
            <div className="flex flex-col text-left align-middle transition-all transform h-screen bg-white overflow-auto xl:max-w-[419px] lg:max-w-[355px] w-[100vw]">
              <header className="xl:p-8 md:p-6 p-4 z-20 flex justify-between sticky top-0 bg-white">
                <h2 className="text-lg">Size & Fit</h2>
                <button 
                  className="hover:opacity-70 cursor-pointer transition-all p-2 -m-2"
                  onClick={() => setShowSizeFitModal(false)}
                >
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                    <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                  </svg>
                </button>
              </header>
              <div className="text-sm whitespace-pre-line space-y-4 pt-6 pb-12 xl:px-8 md:px-6 px-4">
                <div>
                  <p>The {product.name} weighs 0.975kg (2.1lbs) and is shown on a model of 180cm (5'11"). The shoulder strap measures 36cm (14.2") - 48cm (18.9") with a width of 4cm (1.6").</p>
                </div>
                <button className="text-sm cursor-pointer transition-all underline">
                  What Fits in the {product.name}
                </button>
                <div className="mt-8">
                  <ul className="flex flex-wrap mt-8 gap-6">
                    <li className="relative overflow-hidden flex">
                      <div className="h-full object-contain" style={{maxWidth: '200px'}}>
                        <img 
                          className="object-contain w-full" 
                          src={productImages[0]} 
                          alt="Front view with dimensions"
                        />
                        <div className="absolute z-10 text-center text-xs uppercase" style={{width: '100%', left: '0px', bottom: '2%'}}>39cm (15.4")</div>
                        <div className="absolute z-10 text-center text-xs uppercase" style={{width: '100%', top: '39%', left: '47%', transform: 'rotate(270deg) translateX(-25%)'}}>37cm (14.6")</div>
                      </div>
                    </li>
                    <li className="relative overflow-hidden flex">
                      <div className="h-full object-contain" style={{maxWidth: '200px'}}>
                        <img 
                          className="object-contain w-full" 
                          src={productImages[1] || productImages[0]} 
                          alt="Depth view with dimensions"
                        />
                        <div className="absolute z-10 text-center text-xs uppercase" style={{width: '100%', bottom: '2%'}}>14cm (5.5")</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features & Care Modal */}
      {showFeaturesCareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
          <div className="flex shadow-sm">
            <div className="flex flex-col text-left align-middle transition-all transform h-screen bg-white overflow-auto xl:max-w-[419px] lg:max-w-[355px] w-[100vw]">
              <header className="xl:p-8 md:p-6 p-4 z-20 flex justify-between sticky top-0 bg-white">
                <h2 className="text-lg">Features & Care</h2>
                <button 
                  className="hover:opacity-70 cursor-pointer transition-all p-2 -m-2"
                  onClick={() => setShowFeaturesCareModal(false)}
                >
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                    <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                  </svg>
                </button>
              </header>
              <div className="text-sm space-y-4 pt-6 pb-12 xl:px-8 md:px-6 px-4">
                <div>
                  <h3 className="font-medium mb-2">Features</h3>
                  <ul className="space-y-1">
                    <li>• Premium fine-grain leather construction</li>
                    <li>• Adjustable shoulder strap</li>
                    <li>• Interior zip pocket</li>
                    <li>• Magnetic closure</li>
                    <li>• Signature Strathberry bar closure</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Care Instructions</h3>
                  <ul className="space-y-1">
                    <li>• Clean with a soft, dry cloth</li>
                    <li>• Avoid exposure to direct sunlight</li>
                    <li>• Store in dust bag when not in use</li>
                    <li>• Keep away from water and moisture</li>
                    <li>• Professional leather cleaning recommended</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery & Returns Modal */}
      {showDeliveryReturnsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
          <div className="flex shadow-sm">
            <div className="flex flex-col text-left align-middle transition-all transform h-screen bg-white overflow-auto xl:max-w-[419px] lg:max-w-[355px] w-[100vw]">
              <header className="xl:p-8 md:p-6 p-4 z-20 flex justify-between sticky top-0 bg-white">
                <h2 className="text-lg">Delivery & Returns</h2>
                <button 
                  className="hover:opacity-70 cursor-pointer transition-all p-2 -m-2"
                  onClick={() => setShowDeliveryReturnsModal(false)}
                >
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                    <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                    <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                  </svg>
                </button>
              </header>
              <div className="text-sm space-y-4 pt-6 pb-12 xl:px-8 md:px-6 px-4">
                <div>
                  <h3 className="font-medium mb-2">Delivery</h3>
                  <ul className="space-y-1">
                    <li>• Free standard delivery on orders over $200</li>
                    <li>• Express delivery available</li>
                    <li>• International shipping available</li>
                    <li>• Estimated delivery: 3-5 business days</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Returns</h3>
                  <ul className="space-y-1">
                    <li>• 30-day return policy</li>
                    <li>• Items must be in original condition</li>
                    <li>• Free returns within the US</li>
                    <li>• Return shipping label provided</li>
                    <li>• Refund processed within 5-7 business days</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}