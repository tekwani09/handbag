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
        return [
          { name: 'ALL HANDBAGS', href: '/handbags' },
          { name: 'TOTE BAGS', href: '/handbags/totes' },
          { name: 'CROSSBODY BAGS', href: '/handbags/crossbody' },
          { name: 'SHOULDER BAGS', href: '/handbags/shoulder' },
          { name: 'CLUTCHES', href: '/handbags/clutches' },
          { name: 'MINI BAGS', href: '/handbags/mini' }
        ]
      case 'accessories':
        return [
          { name: 'ALL ACCESSORIES', href: '/accessories' },
          { name: 'WALLETS & PURSES', href: '/accessories/wallets' },
          { name: 'SILKS', href: '/accessories/silks' },
          { name: 'STRAPS', href: '/accessories/straps' },
          { name: 'LIFESTYLE', href: '/accessories/lifestyle' },
          { name: 'BELTS', href: '/accessories/belts' },
          { name: 'GLOVES', href: '/accessories/gloves' }
        ]
      case 'gifts':
        return [
          { name: 'ALL GIFTS', href: '/gifts' },
          { name: 'GIFT CARDS', href: '/gifts/cards' },
          { name: 'UNDER £200', href: '/gifts/under-200' },
          { name: 'UNDER £500', href: '/gifts/under-500' },
          { name: 'LUXURY GIFTS', href: '/gifts/luxury' }
        ]
      default:
        return []
    }
  }

  const items = getNavigationItems(section)

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      
      <div className="flex md:flex-row md:justify-start flex-col relative min-h-full max-h-screen">
        <div className="bg-gray-50 h-screen block flex-none relative z-20 xl2:max-w-[499px] xl:max-w-[419px] lg:max-w-[397px] w-1/2">
          <div className="flex gap-2 justify-between items-center bg-gray-50 py-1.5 z-20 min-h-16 xl:px-8 md:px-6 px-4">
            <div>
              <nav>
                <ul className="flex items-center group max-w-max">
                  <li className="py-2 px-1.5 xl:px-2 text-center duration-300 group-hover:opacity-70 hover:!opacity-100 transition-opacity">
                    <button className="relative cursor-pointer transition-all uppercase whitespace-nowrap text-xs">
                      <div className="transition-opacity w-full">{section.toUpperCase()}</div>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <button onClick={onClose} className="relative hover:opacity-70 cursor-pointer transition-all inline-block uppercase text-left text-xs z-20 p-2 -m-2">
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round" />
                <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          
          <div className="xl:px-8 md:px-6 px-4 xl:pt-14 lg:pt-12 pt-8">
            <ul className="group block space-y-4">
              {items.map((item, index) => (
                <li key={index} className="navigation-item leading-none">
                  <Link 
                    to={item.href}
                    onClick={onClose}
                    className="hover:opacity-70 cursor-pointer transition-all px-0 py-0 uppercase text-left text-sm md:text-xs relative space-x-2 inline-block"
                  >
                    <div className="transition-opacity w-full space-x-2 leading-none">
                      <div className="flex items-center">
                        <div className="inline">{item.name}</div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}