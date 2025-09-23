import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useCurrency } from '../components/CountrySwitcher'
import { formatPrice, getProductPrice } from '../utils/currency'
import Footer from '../components/Footer'

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const { selectedCountry } = useCurrency()

  const subtotal = getTotalPrice(selectedCountry.currency, getProductPrice)
  const shipping = subtotal > 200 ? 0 : 15
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-light mb-8">Shopping Bag</h1>
            <p className="text-lg mb-8">Your bag is empty</p>
            <Link 
              to="/products" 
              className="inline-block bg-black text-white px-8 py-4 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light mb-12 text-center">Shopping Bag ({items.length})</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-200">
                  <div className="w-32 h-32 bg-gray-200 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-light mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {formatPrice(getProductPrice(item.product, selectedCountry.currency), selectedCountry.currency)}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-sm uppercase tracking-wide underline hover:no-underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 h-fit">
            <h2 className="text-xl font-light mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, selectedCountry.currency)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping, selectedCountry.currency)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium border-t pt-4">
                <span>Total</span>
                <span>{formatPrice(total, selectedCountry.currency)}</span>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="block w-full bg-black text-white py-4 px-6 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors text-center mb-4"
            >
              Checkout
            </Link>
            
            <Link 
              to="/products"
              className="block w-full border border-black text-black py-4 px-6 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors text-center"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 text-xs text-gray-600">
              <p>• Free shipping on orders over {formatPrice(200, selectedCountry.currency)}</p>
              <p>• Secure payment processing</p>
              <p>• 30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}