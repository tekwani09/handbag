import { Link } from 'react-router-dom'

interface NavigationModalProps {
  isOpen: boolean
  onClose: () => void
  section: string
}

export default function NavigationModal({ isOpen, onClose, section }: NavigationModalProps) {
  if (!isOpen) return null

  const getNavigationItems = (section: string) => {
    switch (section) {
      case 'handbags':
        return {
          columns: [
            {
              title: 'Our selection',
              items: [
                { name: 'NEW ARRIVALS', href: '/handbags/new' },
                { name: 'BEST SELLERS', href: '/handbags/bestsellers' },
                { name: 'THE ICONICS', href: '/handbags/iconics' },
                { name: 'MADE IN BRITAIN', href: '/handbags/british' }
              ]
            },
            {
              title: 'Bags',
              items: [
                { name: 'Tote bags', href: '/handbags/totes', icon: true },
                { name: 'Crossbody bags', href: '/handbags/crossbody', icon: true },
                { name: 'Shoulder bags', href: '/handbags/shoulder', icon: true },
                { name: 'Clutches', href: '/handbags/clutches', icon: true },
                { name: 'Mini bags', href: '/handbags/mini', icon: true },
                { name: 'Backpacks', href: '/handbags/backpacks', icon: true },
                { name: 'See all', href: '/handbags', highlight: true }
              ]
            },
            {
              title: 'Small leather goods',
              items: [
                { name: 'Card holders', href: '/accessories/cards', icon: true },
                { name: 'Wallets', href: '/accessories/wallets', icon: true },
                { name: 'Purses', href: '/accessories/purses', icon: true },
                { name: 'See all', href: '/accessories', highlight: true }
              ]
            },
            {
              title: 'Accessories',
              items: [
                { name: 'Belts', href: '/accessories/belts', icon: true },
                { name: 'Gloves', href: '/accessories/gloves', icon: true },
                { name: 'Straps', href: '/accessories/straps', icon: true },
                { name: 'See all', href: '/accessories', highlight: true }
              ]
            }
          ]
        }
      case 'collections':
        return {
          columns: [
            {
              title: 'Our selection',
              items: [
                { name: 'NEW ARRIVALS', href: '/accessories/new' },
                { name: 'BEST SELLERS', href: '/accessories/bestsellers' },
                { name: 'GIFT SETS', href: '/accessories/gifts' }
              ]
            },
            {
              title: 'Small leather goods',
              items: [
                { name: 'Wallets', href: '/accessories/wallets', icon: true },
                { name: 'Card holders', href: '/accessories/cards', icon: true },
                { name: 'Purses', href: '/accessories/purses', icon: true },
                { name: 'See all', href: '/accessories', highlight: true }
              ]
            },
            {
              title: 'Accessories',
              items: [
                { name: 'Belts', href: '/accessories/belts', icon: true },
                { name: 'Gloves', href: '/accessories/gloves', icon: true },
                { name: 'Straps', href: '/accessories/straps', icon: true },
                { name: 'Keyrings', href: '/accessories/keyrings', icon: true },
                { name: 'See all', href: '/accessories', highlight: true }
              ]
            }
          ]
        }
      case 'gifts':
        return {
          columns: [
            {
              title: 'Gift Ideas',
              items: [
                { name: 'GIFT CARDS', href: '/gifts/cards' },
                { name: 'UNDER £200', href: '/gifts/under-200' },
                { name: 'UNDER £500', href: '/gifts/under-500' },
                { name: 'LUXURY GIFTS', href: '/gifts/luxury' }
              ]
            },
            {
              title: 'Collections',
              items: [
                { name: 'Gift sets', href: '/gifts/sets', icon: true },
                { name: 'For her', href: '/gifts/her', icon: true },
                { name: 'For him', href: '/gifts/him', icon: true },
                { name: 'See all', href: '/gifts', highlight: true }
              ]
            }
          ]
        }
      default:
        return { columns: [] }
    }
  }

  const navigationData = getNavigationItems(section)

  return (
    <div 
      className="absolute top-[111px] left-0 right-0 z-50"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
        <div className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex">
              {navigationData.columns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 p-8 border-r border-gray-100 last:border-r-0">
                  <Link 
                    to={`/${section}`}
                    onClick={onClose}
                    className="block mb-6 text-sm font-medium text-black hover:opacity-70 transition-opacity"
                  >
                    {column.title}
                  </Link>
                  
                  <ul className="space-y-3">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link 
                          to={item.href}
                          onClick={onClose}
                          className={`flex items-center text-sm hover:opacity-70 transition-opacity ${
                            item.highlight ? 'font-medium' : 'font-light'
                          }`}
                        >
                          {item.icon && (
                            <div className="w-6 h-6 mr-3 bg-gray-100 rounded flex-shrink-0"></div>
                          )}
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Gift Card Promo Section for Handbags */}
              {section === 'handbags' && (
                <div className="w-80 p-8">
                  <Link to="/gifts/cards" onClick={onClose} className="block group">
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=200&fit=crop" 
                        alt="Gift Card" 
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="w-8 h-8 mx-auto mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 6H4c-1.11 0-2 .89-2 2v8c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm0 2v2H4V8h16zm0 6v2H4v-2h16z"/>
                            </svg>
                          </div>
                          <div className="text-sm font-medium">Gift card</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
    </div>
  )
}