import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../../config/api'
import { formatPrice } from '../../utils/currency'

interface Order {
  id: string
  orderNumber: string
  status: string
  paymentStatus: string
  total: number
  createdAt: string
  items: {
    id: string
    quantity: number
    product: {
      name: string
      images: string[]
    }
  }[]
}

export default function AccountOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800'
      case 'PENDING': return 'bg-yellow-100 text-yellow-800'
      case 'SHIPPED': return 'bg-blue-100 text-blue-800'
      case 'DELIVERED': return 'bg-green-100 text-green-800'
      case 'CANCELLED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/account" className="text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
            ← Back to Account
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-wider text-black mb-4">
            ORDER HISTORY
          </h1>
          <p className="text-sm font-light text-gray-600">
            View and track your orders
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
            <Link to="/products" className="text-sm uppercase tracking-wide underline hover:no-underline">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-light text-black mb-1">#{order.orderNumber}</h3>
                    <p className="text-sm font-light text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-light text-black mb-1">{formatPrice(order.total, 'GBP')}</p>
                    <span className={`px-3 py-1 text-sm font-light uppercase tracking-wide ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={order.items[0]?.product.images[0]} 
                    alt={order.items[0]?.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="text-sm font-light text-black">{order.items[0]?.product.name}</p>
                    {order.items.length > 1 && (
                      <p className="text-sm text-gray-600">+{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Link 
                    to={`/orders/${order.id}`}
                    className="border border-black text-black px-6 py-2 text-sm font-light uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
                  >
                    View Details
                  </Link>
                  {order.status === 'SHIPPED' && (
                    <button className="border border-black text-black px-6 py-2 text-sm font-light uppercase tracking-wide hover:bg-black hover:text-white transition-colors">
                      Track Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}