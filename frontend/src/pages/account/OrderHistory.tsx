import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { API_BASE_URL } from '../../config/api'
import { formatPrice } from '../../utils/currency'

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

export default function OrderHistory() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/account')
      return
    }
    fetchOrders()
  }, [isAuthenticated, navigate])

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'text-green-600 border-green-600'
      case 'SHIPPED':
      case 'IN_TRANSIT':
        return 'text-blue-600 border-blue-600'
      case 'RETURNED':
        return 'text-gray-600 border-gray-400'
      case 'PENDING':
        return 'text-yellow-600 border-yellow-600'
      case 'CANCELLED':
        return 'text-red-600 border-red-600'
      default:
        return 'text-gray-600 border-gray-600'
    }
  }

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'Delivered'
      case 'SHIPPED':
        return 'In transit'
      case 'IN_TRANSIT':
        return 'In transit'
      case 'RETURNED':
        return 'Returned'
      case 'PENDING':
        return 'Pending'
      case 'CANCELLED':
        return 'Cancelled'
      default:
        return status
    }
  }

  const isInProgress = (status: string) => {
    return status === 'PENDING' || status === 'SHIPPED' || status === 'IN_TRANSIT'
  }

  const inProgressOrders = orders.filter(order => isInProgress(order.status))
  const pastOrders = orders.filter(order => !isInProgress(order.status))

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 lg:flex-shrink-0" style={{backgroundColor: '#f0eee9'}}>
          <div className="p-8 lg:p-12 sticky top-0">
            <h2 className="text-3xl md:text-4xl font-light mb-20" style={{fontFamily: 'Cormorant Garamond'}}>
              Hello, {user?.firstName}
            </h2>
            
            <nav className="space-y-3 mb-12">
              <Link 
                to="/account"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                My Information
              </Link>
              <Link 
                to="/account/orders"
                className="block text-xs uppercase tracking-wider font-medium text-black"
              >
                My Orders &amp; Returns
              </Link>
              <Link 
                to="/account/wishlist"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Wishlist
              </Link>
              <Link 
                to="/account/addresses"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Address Book
              </Link>
              <Link 
                to="/account/payment"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Preferences
              </Link>
            </nav>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
            >
              <span>←</span> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-light mb-8" style={{fontFamily: 'Cormorant Garamond'}}>
            My Orders &amp; Returns
          </h1>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your orders...</p>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
              <Link 
                to="/" 
                className="inline-block bg-black text-white py-3 px-8 text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors rounded"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* In Progress Orders */}
              {inProgressOrders.length > 0 && (
                <div className="mb-12">
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-6">In progress</p>
                  
                  <div className="space-y-6">
                    {inProgressOrders.map(order => (
                      <OrderCard 
                        key={order.id} 
                        order={order}
                        onViewDetails={() => navigate(`/order/${order.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Past Orders */}
              {pastOrders.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-6" style={{marginTop: inProgressOrders.length > 0 ? '52px' : '0'}}>
                    Past orders
                  </p>
                  
                  <div className="space-y-6">
                    {pastOrders.map(order => (
                      <OrderCard 
                        key={order.id} 
                        order={order}
                        onViewDetails={() => navigate(`/order/${order.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}

interface OrderCardProps {
  order: Order
  onViewDetails: () => void
}

function OrderCard({ order, onViewDetails }: OrderCardProps) {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'Delivered'
      case 'SHIPPED':
        return 'In transit'
      case 'IN_TRANSIT':
        return 'In transit'
      case 'RETURNED':
        return 'Returned'
      case 'PENDING':
        return 'Pending'
      case 'CANCELLED':
        return 'Cancelled'
      default:
        return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'text-green-600 border-green-600'
      case 'SHIPPED':
      case 'IN_TRANSIT':
        return 'text-blue-600 border-blue-600'
      case 'RETURNED':
        return 'text-gray-600 border-gray-400'
      case 'PENDING':
        return 'text-yellow-600 border-yellow-600'
      case 'CANCELLED':
        return 'text-red-600 border-red-600'
      default:
        return 'text-gray-600 border-gray-600'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isInProgress = order.status === 'PENDING' || order.status === 'SHIPPED' || order.status === 'IN_TRANSIT'

  return (
    <div className="border border-gray-200 rounded overflow-hidden">
      {/* Card Header */}
      <div className="flex flex-wrap gap-6 items-start p-6 md:p-8 border-b border-gray-200">
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">Order</div>
          <div className="text-sm">#{order.orderNumber}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">Placed</div>
          <div className="text-sm">{formatDate(order.createdAt)}</div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest text-gray-600 mb-2">Total</div>
          <div className="text-sm">{formatPrice(order.total, 'GBP')}</div>
        </div>
        <div className={`ml-auto px-4 py-2 border text-xs uppercase tracking-widest font-medium rounded whitespace-nowrap ${getStatusColor(order.status)}`}>
          {getStatusDisplay(order.status)}
        </div>
      </div>

      {/* Track/Status Section */}
      {isInProgress && (
        <div className="p-6 md:p-8 border-b border-gray-200">
          <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">Status</p>
          <p className="text-2xl font-light mb-6" style={{fontFamily: 'Cormorant Garamond'}}>
            {getStatusDisplay(order.status)}
          </p>
          {order.shippingAddress && (
            <p className="text-sm text-gray-700">
              Delivering to {order.shippingAddress.address1}, {order.shippingAddress.city}
            </p>
          )}
        </div>
      )}

      {/* Items */}
      {order.items.map((item, index) => (
        <div key={item.id} className={`flex items-center gap-6 p-6 md:p-8 ${index < order.items.length - 1 ? 'border-b border-gray-200' : ''}`}>
          <div className="w-20 h-20 bg-gray-200 flex-shrink-0 rounded overflow-hidden">
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
            <div className="text-sm font-light mb-1" style={{fontFamily: 'Cormorant Garamond'}}>
              {item.product.name}
            </div>
            <div className="text-xs text-gray-600">Quantity {item.quantity}</div>
          </div>
          <div className="text-sm font-medium text-right">
            {formatPrice(item.price * item.quantity, 'GBP')}
          </div>
        </div>
      ))}

      {/* Card Actions */}
      <div className="flex flex-wrap gap-6 p-6 md:p-8 border-t border-gray-200 bg-gray-50">
        <Link 
          to={`/order/${order.id}`}
          className="text-xs uppercase tracking-widest border-b border-gray-800 hover:text-gray-600 transition-colors"
        >
          Order details
        </Link>
        <button 
          className="text-xs uppercase tracking-widest border-b border-gray-300 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Need help?
        </button>
      </div>
    </div>
  )
}
