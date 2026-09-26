import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { API_BASE_URL } from '../config/api'
import IssueReportModal from '../components/IssueReportModal'

interface Order {
  id: string
  orderNumber: string
  status: string
  createdAt: string
  items: any[]
}

export default function NeedHelp() {
  const { orderId } = useParams()
  const { user, isAuthenticated } = useAuthStore()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null)
  const [showIssueModal, setShowIssueModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/account')
      return
    }
    if (orderId) {
      fetchOrder()
    }
  }, [orderId, isAuthenticated])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const topics = [
    {
      id: 'wrong_bag',
      name: 'Something is wrong with my bag',
      description: 'Damage, a fault, or something that does not look right on arrival.'
    },
    {
      id: 'wrong_order',
      name: 'Something is wrong with my order',
      description: 'A different bag or colour than ordered, or something missing from the parcel.'
    },
    {
      id: 'delivery',
      name: 'Delivery and address',
      description: 'Questions about where an order is, or a delivery that did not arrive.'
    },
    {
      id: 'payment',
      name: 'Payment, invoice or duties',
      description: 'Charges, refunds, and requesting a copy of your invoice.'
    },
    {
      id: 'returns',
      name: 'Returns and exchanges',
      description: 'Start a return, exchange a colour, or ask about the return window.'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Order not found</h1>
          <Link to="/account/orders" className="text-sm uppercase tracking-wide underline">
            Back to orders
          </Link>
        </div>
      </div>
    )
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
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
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
              onClick={() => {
                const { logout } = useAuthStore.getState()
                logout()
                navigate('/')
              }}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
            >
              <span>←</span> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 max-w-4xl">
          <Link 
            to={`/order/${orderId}`}
            className="text-xs uppercase tracking-widest text-gray-600 hover:text-black transition-colors mb-8 inline-block"
          >
            ‹ Back to order
          </Link>

          <h1 className="text-4xl md:text-5xl font-light mb-4" style={{fontFamily: 'Cormorant Garamond'}}>
            Need help?
          </h1>

          <p className="text-xs uppercase tracking-widest text-gray-600 mb-2">
            Order #{order.orderNumber} · {formatDate(order.createdAt)}
          </p>

          <p className="text-sm leading-relaxed text-gray-700 mb-12 max-w-lg">
            Choose what this is about and we will take you to the right place. If nothing fits, write to us and a person will read it.
          </p>

          {/* Topics */}
          <div className="mb-16 max-w-2xl border-t border-gray-200">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic.id)
                  setShowIssueModal(true)
                }}
                className="w-full text-left flex items-start justify-between gap-6 py-6 px-0 border-b border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex-1">
                  <div className="text-lg font-light mb-1" style={{fontFamily: 'Cormorant Garamond'}}>
                    {topic.name}
                  </div>
                  <p className="text-sm text-gray-600">
                    {topic.description}
                  </p>
                </div>
                <span className="text-lg text-gray-400 group-hover:text-gray-600 transition-colors flex-shrink-0 mt-1">
                  ›
                </span>
              </button>
            ))}
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-8 max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-gray-600 mb-8">
              Or write to us directly
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-light mb-3" style={{fontFamily: 'Cormorant Garamond'}}>
                  Email
                </h3>
                <p className="text-sm">
                  <a href="mailto:care@hegett.com" className="border-b border-gray-400 hover:border-black transition-colors">
                    care@hegett.com
                  </a>
                </p>
              </div>

              <div>
                <h3 className="text-lg font-light mb-3" style={{fontFamily: 'Cormorant Garamond'}}>
                  WhatsApp
                </h3>
                <p className="text-sm mb-4 text-gray-700">
                  Our customer service is available Monday to Friday.
                </p>
                <a 
                  href="https://wa.me/your-number"
                  className="inline-block px-8 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
                >
                  Send us a message
                </a>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-8">
              Quote order #{order.orderNumber} and we will have your details to hand.
            </p>
          </div>
        </main>
      </div>

      {/* Issue Report Modal */}
      {showIssueModal && selectedTopic && (
        <IssueReportModal
          order={order}
          topicId={selectedTopic}
          onClose={() => {
            setShowIssueModal(false)
            setSelectedTopic(null)
          }}
          onSubmit={(data) => {
            console.log('Issue submitted:', data)
            setShowIssueModal(false)
            setSelectedTopic(null)
          }}
        />
      )}
    </div>
  )
}
