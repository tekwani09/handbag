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

export default function AccountOrders() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string[]>([])

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

  const isInProgress = (status: string) => {
    return status === 'PENDING' || status === 'SHIPPED' || status === 'IN_TRANSIT'
  }

  // Calculate counts for filters
  const inProgressCount = orders.filter(order => isInProgress(order.status)).length
  const deliveredCount = orders.filter(o => o.status === 'DELIVERED').length
  const returnedCount = orders.filter(o => o.status === 'RETURNED').length

  const statusCounts = {
    'ALL': orders.length,
    'IN_PROGRESS': inProgressCount,
    'DELIVERED': deliveredCount,
    'RETURNED': returnedCount
  }

  const yearCounts = orders.reduce((acc: {[key: string]: number}, order) => {
    const year = new Date(order.createdAt).getFullYear().toString()
    acc[year] = (acc[year] || 0) + 1
    return acc
  }, {})

  // Get filtered orders
  const filteredOrders = orders.filter(order => {
    const year = new Date(order.createdAt).getFullYear().toString()
    
    // If filters are not set, show all
    if (selectedStatus.length === 0 && selectedYear.length === 0) {
      return true
    }
    
    let statusMatch = selectedStatus.length === 0 ? true : false
    if (selectedStatus.length > 0) {
      const statusType = isInProgress(order.status) ? 'IN_PROGRESS' : order.status
      statusMatch = selectedStatus.includes(statusType) || selectedStatus.includes('ALL')
    }
    
    const yearMatch = selectedYear.length === 0 ? true : selectedYear.includes(year) || selectedYear.includes('ALL_YEARS')
    
    return statusMatch && yearMatch
  })

  const filteredInProgress = filteredOrders.filter(order => isInProgress(order.status))
  const filteredPastOrders = filteredOrders.filter(order => !isInProgress(order.status))

  const handleClearFilters = () => {
    setSelectedStatus([])
    setSelectedYear([])
    setFilterOpen(false)
  }

  const handleApplyFilters = () => {
    setFilterOpen(false)
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
            <div className="pt-2" style={{maxWidth: '560px'}}>
              <p className="text-2xl font-light leading-relaxed mb-3" style={{fontFamily: 'Cormorant Garamond'}}>
                You haven't placed any orders yet.
              </p>
              <p className="text-sm leading-relaxed text-gray-600 mb-12" style={{color: 'rgba(33,29,25,0.65)'}}>
                When you do, you will find the summary of all of your orders and returns.
              </p>
              <Link 
                to="/" 
                className="inline-block bg-black text-white py-4 px-12 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Filter Bar and In Progress Label */}
              <div className="mb-6 flex justify-between items-center relative">
                <p className="text-xs uppercase tracking-widest text-gray-600">In progress</p>
                
                <button 
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="flex items-center gap-2 text-xs uppercase tracking-widest text-gray-600 hover:text-black border-b border-gray-300 hover:border-black pb-1 transition-colors"
                >
                  Filters
                  <svg className="w-2 h-1.5" viewBox="0 0 10 7" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </button>

                {/* Filter Panel */}
                {filterOpen && (
                  <div className="absolute top-8 right-0 bg-white border border-gray-200 z-20 min-w-56 p-6 shadow-sm">
                    {/* Status Group */}
                    <div className="mb-5">
                      <div className="text-xs uppercase tracking-widest text-gray-600 mb-3">Status</div>
                      <div className="space-y-2">
                        {[
                          {label: 'All', value: 'ALL', count: statusCounts['ALL']},
                          {label: 'In progress', value: 'IN_PROGRESS', count: statusCounts['IN_PROGRESS']},
                          {label: 'Delivered', value: 'DELIVERED', count: statusCounts['DELIVERED']},
                          {label: 'Returned', value: 'RETURNED', count: statusCounts['RETURNED']}
                        ].map(option => (
                          <label key={option.value} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-black">
                            <input 
                              type="checkbox" 
                              checked={selectedStatus.includes(option.value)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedStatus([...selectedStatus, option.value])
                                } else {
                                  setSelectedStatus(selectedStatus.filter(s => s !== option.value))
                                }
                              }}
                              className="w-3 h-3 border border-gray-400 accent-black cursor-pointer"
                            />
                            <span className="flex-1">{option.label}</span>
                            <span className="text-xs text-gray-500">{option.count}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Year Group */}
                    <div className="mb-4">
                      <div className="text-xs uppercase tracking-widest text-gray-600 mb-3">Year</div>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-black">
                          <input 
                            type="checkbox" 
                            checked={selectedYear.includes('ALL_YEARS') || selectedYear.length === 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedYear(['ALL_YEARS'])
                              } else {
                                setSelectedYear([])
                              }
                            }}
                            className="w-3 h-3 border border-gray-400 accent-black cursor-pointer"
                          />
                          <span>All years</span>
                        </label>
                        {Object.entries(yearCounts).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([year, count]) => (
                          <label key={year} className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer hover:text-black">
                            <input 
                              type="checkbox" 
                              checked={selectedYear.includes(year)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedYear([...selectedYear.filter(y => y !== 'ALL_YEARS'), year])
                                } else {
                                  setSelectedYear(selectedYear.filter(y => y !== year))
                                }
                              }}
                              className="w-3 h-3 border border-gray-400 accent-black cursor-pointer"
                            />
                            <span className="flex-1">{year}</span>
                            <span className="text-xs text-gray-500">{count}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-4">
                      <button 
                        onClick={handleClearFilters}
                        className="text-xs uppercase tracking-widest text-gray-600 hover:text-black transition-colors"
                      >
                        Clear
                      </button>
                      <button 
                        onClick={handleApplyFilters}
                        className="text-xs uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-600 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* In Progress Orders */}
              {filteredInProgress.length > 0 && (
                <div className="mb-12">
                  
                  <div className="space-y-6">
                    {filteredInProgress.map(order => (
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
              {filteredPastOrders.length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-600 mb-6" style={{marginTop: '52px'}}>
                    Past orders
                  </p>
                  
                  <div className="space-y-6">
                    {filteredPastOrders.map(order => (
                      <OrderCard 
                        key={order.id} 
                        order={order}
                        onViewDetails={() => navigate(`/order/${order.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {filteredOrders.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No orders match your filters.</p>
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
