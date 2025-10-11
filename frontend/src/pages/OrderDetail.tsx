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
      console.log('Fetching order with ID:', id)
      console.log('API URL:', `${API_BASE_URL}/orders/${id}`)
      
      const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      console.log('Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('Order data:', data)
        setOrder(data.order)
      } else {
        const errorData = await response.json()
        console.error('Failed to fetch order:', errorData)
      }
    } catch (error) {
      console.error('Failed to fetch order:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'text-green-600'
      case 'PENDING': return 'text-yellow-600'
      case 'SHIPPED': return 'text-blue-600'
      case 'DELIVERED': return 'text-green-700'
      case 'CANCELLED': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#fcfcfb'}}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
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

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/account/orders" className="text-sm uppercase tracking-wide underline hover:no-underline mb-4 inline-block">
            ← Back to Orders
          </Link>
          <h1 className="text-3xl font-light">Order #{order.orderNumber}</h1>
          <p className="text-gray-600 mt-2">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-light mb-6">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                    <div className="w-20 h-20 bg-gray-200 flex-shrink-0 rounded">
                      <img 
                        src={item.product.images?.[0] || 'https://via.placeholder.com/80x80?text=No+Image'} 
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/80x80?text=No+Image'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                      <p className="text-sm mt-1">{formatPrice(item.price, 'GBP')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(item.price * item.quantity, 'GBP')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Details */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-light mb-4">Order Status</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Order Status:</span>
                  <span className={`font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span className={`font-medium ${getStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-light mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(order.subtotal, 'GBP')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping, 'GBP')}</span>
                </div>
                {order.tax > 0 && (
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{formatPrice(order.tax, 'GBP')}</span>
                  </div>
                )}
                <div className="flex justify-between font-medium text-base border-t pt-2">
                  <span>Total:</span>
                  <span>{formatPrice(order.total, 'GBP')}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-light mb-4">Shipping Address</h3>
              <div className="text-sm space-y-1">
                <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.address1}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}