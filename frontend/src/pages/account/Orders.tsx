import { Link } from 'react-router-dom'

export default function AccountOrders() {
  const orders = [
    {
      id: '#STR001',
      date: '2024-01-15',
      status: 'Delivered',
      total: '£295.00',
      items: [{ name: 'The Constance - Black', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&h=100&fit=crop' }]
    },
    {
      id: '#STR002',
      date: '2024-01-10',
      status: 'Shipped',
      total: '£450.00',
      items: [{ name: 'The Adeline - Cognac', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop' }]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/account" className="text-xs font-light text-black hover:text-gray-600 uppercase tracking-wide">
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

        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-light text-black mb-1">{order.id}</h3>
                  <p className="text-sm font-light text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-light text-black mb-1">{order.total}</p>
                  <span className={`px-3 py-1 text-xs font-light uppercase tracking-wide ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={order.items[0].image} 
                  alt={order.items[0].name}
                  className="w-16 h-16 object-cover"
                />
                <div>
                  <p className="text-sm font-light text-black">{order.items[0].name}</p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button className="border border-black text-black px-6 py-2 text-xs font-light uppercase tracking-wide hover:bg-black hover:text-white transition-colors">
                  View Details
                </button>
                {order.status === 'Shipped' && (
                  <button className="border border-black text-black px-6 py-2 text-xs font-light uppercase tracking-wide hover:bg-black hover:text-white transition-colors">
                    Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}