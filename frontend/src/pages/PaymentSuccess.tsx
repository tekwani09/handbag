import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'
import { useCurrency } from '../components/CountrySwitcher'
import { formatPrice, getProductPrice } from '../utils/currency'

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { selectedCountry } = useCurrency()
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setLoading(false)
        return
      }
      
      try {
        const token = localStorage.getItem('token')
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        })
        
        if (response.ok) {
          const data = await response.json()
          setOrder(data.order)
        } else {
          setError(true)
        }
      } catch (error) {
        console.error('Failed to fetch order:', error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    // Set a timeout to stop loading after 5 seconds
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    fetchOrder()

    return () => clearTimeout(timer)
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#fcfcfb'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
      <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        {/* Success Message */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <svg className="w-16 h-16 text-green-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Order Confirmed</h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase! Your order has been successfully placed.
          </p>
          {orderId && (
            <p className="text-sm text-gray-500">
              Order ID: <span className="font-semibold">{orderId}</span>
            </p>
          )}
        </div>

        {/* Order Summary Card - Only show if order data is available */}
        {order && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-12 shadow-sm">
            {/* Card Header */}
            <div className="border-b border-gray-200 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-light mb-2">Order Details</h2>
                  <p className="text-sm text-gray-600">Order #{order.id || orderId}</p>
                </div>
                <div className="inline-block px-4 py-2 border border-gray-800 rounded text-sm font-medium text-gray-800">
                  Confirmed
                </div>
              </div>
            </div>

            {/* Order Items */}
            {order.items && order.items.length > 0 && (
              <div className="border-b border-gray-200 p-6 md:p-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wide">Items</h3>
                <div className="space-y-6">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                      <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                        <img 
                          src={item.product?.images?.[0] || 'https://via.placeholder.com/80'} 
                          alt={item.product?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-light mb-1 text-sm">{item.product?.name}</h4>
                        <p className="text-xs text-gray-600 mb-2">Quantity: {item.quantity}</p>
                        <p className="text-sm font-medium">{formatPrice(item.price, selectedCountry.currency)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Address */}
            {order.shippingAddress && (
              <div className="border-b border-gray-200 p-6 md:p-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Shipping To</h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br/>
                  {order.shippingAddress.address1}<br/>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br/>
                  {order.shippingAddress.country}<br/>
                  {order.shippingAddress.phone}
                </p>
              </div>
            )}

            {/* Order Summary */}
            <div className="p-6 md:p-8 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wide">Order Summary</h3>
              <div className="space-y-3 max-w-xs">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(order.subtotal, selectedCountry.currency)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{formatPrice(order.shipping, selectedCountry.currency)}</span>
                </div>
                <div className="flex justify-between text-sm pb-3 border-b border-gray-300">
                  <span className="text-gray-600">Tax</span>
                  <span>{formatPrice(order.tax || 0, selectedCountry.currency)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-2">
                  <span>Total</span>
                  <span>{formatPrice(order.total, selectedCountry.currency)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          {orderId && (
            <Link 
              to={`/orders/${orderId}`}
              className="flex-1 md:flex-none bg-black text-white py-4 px-8 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors text-center rounded"
            >
              View Order Tracking
            </Link>
          )}
          <Link 
            to="/account/orders" 
            className="flex-1 md:flex-none bg-black text-white py-4 px-8 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors text-center rounded"
          >
            View All Orders
          </Link>
          <Link 
            to="/" 
            className="flex-1 md:flex-none border-2 border-black text-black py-4 px-8 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors text-center rounded"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Info Text */}
        <div className="text-center text-sm text-gray-600 max-w-md mx-auto">
          <p>You will receive an email confirmation shortly with your order details.</p>
          <p className="mt-4">Questions? <a href="#" className="underline hover:no-underline">Contact our customer care team</a></p>
        </div>
      </main>
    </div>
  )
}

export default PaymentSuccess
