import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'

export default function Wishlist() {
  const { selectedCountry } = useCurrency()
  const [wishlistItems, setWishlistItems] = useState([])

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
  }, [])

  const removeFromWishlist = (productId: string) => {
    const updatedWishlist = wishlistItems.filter((item: any) => item.id !== productId)
    setWishlistItems(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
  }

  const addToCart = (product: any) => {
    // Add to cart logic here
    console.log('Added to cart:', product)
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light mb-4 tracking-wide">WISHLIST</h1>
          <p className="text-gray-600 font-light">Your saved items</p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-light mb-4">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 font-light">Save items you love to view them here later</p>
            <Link 
              to="/products" 
              className="inline-block bg-black text-white px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistItems.map((product: any) => (
              <div key={product.id} className="group relative">
                <div className="relative overflow-hidden bg-white aspect-square mb-4">
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
                  
                  {/* Remove from wishlist button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="text-center">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-light text-black mb-1 hover:text-gray-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2">{product.category?.name}</p>
                  <p className="text-lg font-light text-black mb-4">
                    {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
                  </p>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-black text-white py-2 px-4 text-sm font-medium uppercase tracking-wide hover:bg-gray-800 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <Link
                      to={`/products/${product.id}`}
                      className="block w-full border border-black text-black py-2 px-4 text-sm font-medium uppercase tracking-wide hover:bg-black hover:text-white transition-colors text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}