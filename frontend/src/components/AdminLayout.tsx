import { Link, useLocation } from 'react-router-dom'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Products', href: '/admin/products', icon: '📦' },
    { name: 'Orders', href: '/admin/orders', icon: '🛒' },
    { name: 'Customers', href: '/admin/customers', icon: '👥' },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-light tracking-wider text-black">
              STRATHBERRY
            </Link>
            <span className="text-gray-400">|</span>
            <span className="text-sm font-light text-gray-600 uppercase tracking-wide">Admin Portal</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-light text-gray-600">Welcome, Admin</span>
            <Link to="/" className="text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
              View Store
            </Link>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm font-light transition-colors ${
                      location.pathname === item.href
                        ? 'bg-gray-100 text-black'
                        : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="uppercase tracking-wide">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  )
}