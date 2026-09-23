import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'
import { formatPrice } from '../utils/currency'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    images: string[]
  }
}

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  total: number
  subtotal: number
  shipping: number
  tax: number
  createdAt: string
  items: OrderItem[]
  shippingAddress: {
    firstName: string
    lastName: string
    address1: string
    city: string
    state: string
    zipCode: string
    country: string
    phone: string
  }
}

export default function OrderDetail() {
  const { id } = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrder()
  }, [id])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return (
          <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m7 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'SHIPPED':
        return (
          <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
        )
      case 'PENDING':
        return (
          <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'CANCELLED':
        return (
          <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return (
          <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'DELIVERED':
      case 'CONFIRMED':
        return 'border-green-600 text-green-600'
      case 'SHIPPED':
        return 'border-blue-600 text-blue-600'
      case 'PENDING':
        return 'border-yellow-600 text-yellow-600'
      case 'CANCELLED':
        return 'border-red-600 text-red-600'
      default:
        return 'border-gray-600 text-gray-600'
    }
  }

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

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#fcfcfb'}}>
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Order not found</h1>
          <Link to="/account/orders" className="text-sm uppercase tracking-wide underline hover:no-underline">
            Back to Orders
          </Link>
        </div>
      </div>
    )
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
      <main className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/account/orders" 
            className="text-xs uppercase tracking-widest text-gray-600 hover:text-black mb-6 inline-block transition-colors"
          >
            ← Back to Orders
          </Link>
          
          <div className="flex items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-light mb-2">Order #{order.orderNumber}</h1>
              <p className="text-sm text-gray-600">
                Placed on <span className="font-medium">{orderDate}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="mb-2">
                {getStatusIcon(order.status)}
              </div>
              <div className={`inline-block px-4 py-2 border rounded text-xs font-medium uppercase tracking-wide ${getStatusBadgeClass(order.status)}`}>
                {order.status}
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          {/* Order Items Section */}
          <div className="border-b border-gray-200 p-6 md:p-8">
            <h2 className="text-sm font-semibold text-gray-700 mb-6 uppercase tracking-wide">Items Ordered</h2>
            <div className="space-y-6">
              {order.items.map((item, index) => (
                <div key={item.id} className={`flex gap-4 ${index !== order.items.length - 1 ? 'pb-6 border-b border-gray-100' : ''}`}>
                  <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
                    <img 
                      src={item.product.images?.[0] || 'https://via.placeholder.com/80'} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80'
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-light mb-1 text-sm">{item.product.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">Quantity: {item.quantity}</p>
                    <p className="text-sm font-medium">{formatPrice(item.price, 'GBP')}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-medium">{formatPrice(item.price * item.quantity, 'GBP')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status & Payment Section */}
          <div className="border-b border-gray-200 p-6 md:p-8 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Order Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${getStatusBadgeClass(order.status)}`}>{order.status}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment:</span>
                    <span className={`font-medium ${getStatusBadgeClass(order.paymentStatus)}`}>{order.paymentStatus}</span>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Order Total</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>{formatPrice(order.subtotal, 'GBP')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping, 'GBP')}</span>
                  </div>
                  {order.tax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>{formatPrice(order.tax, 'GBP')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-gray-300">
                    <span>Total</span>
                    <span>{formatPrice(order.total, 'GBP')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="p-6 md:p-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Shipping Address</h3>
            <p className="text-sm leading-relaxed text-gray-700">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br/>
              {order.shippingAddress.address1}<br/>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br/>
              {order.shippingAddress.country}<br/>
              <span className="text-gray-600">{order.shippingAddress.phone}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mt-12">
          <Link 
            to="/" 
            className="flex-1 md:flex-none border-2 border-black text-black py-4 px-8 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors text-center rounded"
          >
            Continue Shopping
          </Link>
          <Link 
            to="/account/orders" 
            className="flex-1 md:flex-none bg-black text-white py-4 px-8 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors text-center rounded"
          >
            View All Orders
          </Link>
        </div>

        {/* Support Info */}
        <div className="text-center text-sm text-gray-600 max-w-md mx-auto mt-8">
          <p>Questions about your order? <a href="#" className="underline hover:no-underline">Contact our customer care team</a></p>
        </div>
      </main>
    </div>
  )
}