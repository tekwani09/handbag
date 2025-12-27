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
                { name: 'ALL HANDBAGS', href: '/products' },
                { name: 'COLLECTIONS', href: '/products' },
                { name: 'NEW ARRIVALS', href: '/products' }
              ]
            },
            {
              title: 'Bags',
              items: [
                { name: 'Tote bags', href: '/products?filter=Totes', icon: true },
                { name: 'Crossbody bags', href: '/products?filter=Crossbody', icon: true },
                { name: 'Shoulder bags', href: '/products?filter=Shoulder', icon: true },
                { name: 'Clutches', href: '/products?filter=Clutches', icon: true },
                { name: 'Mini bags', href: '/products?filter=Mini', icon: true },
                { name: 'See all', href: '/products', highlight: true }
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
                { name: 'ALL PRODUCTS', href: '/products' },
                { name: 'FEATURED', href: '/products' },
                { name: 'NEW ARRIVALS', href: '/products' }
              ]
            },
            {
              title: 'Categories',
              items: [
                { name: 'Handbags', href: '/products?category=handbags', icon: true },
                { name: 'Accessories', href: '/products?category=accessories', icon: true },
                { name: 'See all', href: '/products', highlight: true }
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
                { name: 'ALL PRODUCTS', href: '/products' },
                { name: 'FEATURED GIFTS', href: '/products' },
                { name: 'LUXURY COLLECTION', href: '/products' }
              ]
            },
            {
              title: 'Collections',
              items: [
                { name: 'Under £150', href: '/gifts?filter=Under150', icon: true },
                { name: 'Under £500', href: '/gifts?filter=Under500', icon: true },
                { name: 'Under £800', href: '/gifts?filter=Under800', icon: true },
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
                  <Link to="/products" onClick={onClose} className="block group">
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