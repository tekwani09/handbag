import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { formatPrice, getProductPrice } from '../utils/currency'
import { useCurrency } from './CountrySwitcher'

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const { selectedCountry } = useCurrency()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black bg-opacity-50">
      <div className="flex shadow-sm">
        <div className="flex flex-col text-left align-middle transition-all transform h-screen bg-white overflow-auto xl:max-w-[419px] lg:max-w-[355px] w-[100vw]">
          <header className="xl:p-8 md:p-6 p-4 z-20 flex justify-between sticky top-0 bg-white border-b">
            <h2 className="text-lg">Shopping Bag ({items.length})</h2>
            <button 
              className="hover:opacity-70 cursor-pointer transition-all p-2 -m-2"
              onClick={toggleCart}
            >
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round"></path>
              </svg>
            </button>
          </header>

          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <p className="text-sm mb-4">Your bag is empty</p>
                <button 
                  onClick={toggleCart}
                  className="text-sm underline hover:no-underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 p-4 xl:p-8 md:p-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                    <div className="w-20 h-20 bg-gray-200 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-light mb-2">{item.name}</h3>
                      <p className="text-sm mb-2">{formatPrice(getProductPrice(item.product, selectedCountry.currency), selectedCountry.currency)}</p>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="text-sm w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 border border-gray-300 flex items-center justify-center text-xs hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-xs hover:opacity-70"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t p-4 xl:p-8 md:p-6 bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">{formatPrice(getTotalPrice(selectedCountry.currency, getProductPrice), selectedCountry.currency)}</span>
                </div>
                <Link to="/checkout" className="block w-full bg-black text-white py-4 px-6 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors mb-2 text-center">
                  Checkout
                </Link>
                <button 
                  onClick={toggleCart}
                  className="w-full border border-black text-black py-4 px-6 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}