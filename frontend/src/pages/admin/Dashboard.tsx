export default function AdminDashboard() {
  const stats = [
    { title: 'Total Products', value: '24', change: '+2 this week' },
    { title: 'Total Orders', value: '156', change: '+12 today' },
    { title: 'Revenue', value: '£12,450', change: '+8% this month' },
    { title: 'Low Stock Items', value: '3', change: 'Needs attention' }
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-light mb-8">Admin Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 border border-gray-200">
            <h3 className="text-sm font-light text-gray-600 uppercase tracking-wide mb-2">
              {stat.title}
            </h3>
            <p className="text-2xl font-light text-black mb-1">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-light">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { id: '#1001', customer: 'John Smith', amount: '£295', status: 'Completed' },
                { id: '#1002', customer: 'Sarah Johnson', amount: '£450', status: 'Processing' },
                { id: '#1003', customer: 'Mike Brown', amount: '£320', status: 'Shipped' }
              ].map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm font-light text-black">{order.id}</td>
                  <td className="px-6 py-4 text-sm font-light text-black">{order.customer}</td>
                  <td className="px-6 py-4 text-sm font-light text-black">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-light rounded ${
                      order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}