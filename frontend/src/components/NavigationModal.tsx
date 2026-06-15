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
              title: 'Bags By Style',
              items: [
                { name: 'CROSSBODY BAGS', href: '/products?style=crossbody' },
                { name: 'TOTES & TOP-HANDLE BAGS', href: '/products?style=totes' },
                { name: 'SMALL & MINI BAGS', href: '/products?style=mini' },
                { name: 'SHOULDER BAGS', href: '/products?style=shoulder' },
                { name: 'EVENING BAGS', href: '/products?style=evening' },
                { name: 'TRAVEL BAGS', href: '/products?style=travel' },
                { name: 'RAFFIA BAGS', href: '/products?style=raffia' },
                { name: 'EMBOSSED BAGS', href: '/products?style=embossed' },
                { name: 'SUEDE BAGS', href: '/products?style=suede' }
              ]
            },
            {
              title: 'Bags By Family',
              items: [
                { name: 'Kite', href: '/products?family=kite' },
                { name: 'Mosaic', href: '/products?family=mosaic' },
                { name: 'Tote', href: '/products?family=tote' },
                { name: 'Osette', href: '/products?family=osette' },
                { name: 'East/West', href: '/products?family=east-west' },
                { name: 'Multrees', href: '/products?family=multrees' },
                { name: 'Lana', href: '/products?family=lana' },
                { name: 'Crescent', href: '/products?family=crescent' }
              ]
            }
          ]
        }
      case 'collections':
        return {
          columns: [
            {
              title: 'Collections',
              items: [
                { name: 'ALL PRODUCTS', href: '/products' },
                { name: 'MOSAIC COLLECTION', href: '/collections/mosaic-collection' },
                { name: 'NEW ARRIVALS', href: '/collections/new-arrivals' },
                { name: 'BESTSELLERS', href: '/collections/bestsellers' },
                { name: 'NEW SILHOUETTES', href: '/collections/new-silhouettes' },
                { name: 'THE TRAVEL COLLECTION', href: '/collections/travel-bags' },
              ]
            }
          ]
        }
      case 'new':
        return {
          columns: [
            {
              title: 'New In',
              items: [
                { name: 'NEW ARRIVALS', href: '/collections/new-arrivals' },
                { name: 'NEW SILHOUETTES', href: '/collections/new-silhouettes' },
                { name: 'BESTSELLERS', href: '/collections/bestsellers' }
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
      className="absolute top-[120px] left-0 right-0 z-50"
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
    >
        <div className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto">
            <div className="flex">
              {navigationData.columns.map((column, columnIndex) => (
                <div key={columnIndex} className={`${section === 'collections' || section === 'new' ? 'flex-1' : 'flex-1'} py-6 px-4 last:border-r-0 ml-16 pr-2 pb-12`}>
                  <Link 
                    to={`/${section}`}
                    onClick={onClose}
                    className="block mb-4 text-sm font-medium text-black hover:opacity-70 transition-opacity uppercase tracking-wide"
                  >
                    {column.title}
                  </Link>
                  
                  <ul className="space-y-3">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link 
                          to={item.href}
                          onClick={onClose}
                          className={`text-sm hover:opacity-70 transition-opacity uppercase tracking-wide ${
                            item.highlight ? 'font-medium' : 'font-light'
                          }`}
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              
              {/* Collections Grid for Handbags */}
              {section === 'handbags' && (
                <div className="p-8">
                  <ul className="grid grid-cols-4 gap-x-1 gap-y-3 group">
                    <li>
                      <Link
                        to="/products?family=kite"
                        onClick={onClose}
                        className="transition-opacity group-hover:opacity-75 hover:opacity-100!"
                      >
                        <div className="max-w-20 pt-4">
                          <div className="max-w-20 transition-transform hover:-translate-y-2 overflow-hidden relative w-full">
                            <img
                              src="https://dato-cdn.strathberry.com/1745228778-family-kite.webp?w=200&auto=compress%2Cenhance"
                              alt="Kite Collection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center text-wrap text-sm">Kite</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?family=mosaic"
                        onClick={onClose}
                        className="transition-opacity group-hover:opacity-75 hover:opacity-100!"
                      >
                        <div className="max-w-20 pt-4">
                          <div className="max-w-20 transition-transform hover:-translate-y-2 overflow-hidden relative w-full">
                            <img
                              src="https://dato-cdn.strathberry.com/1736358730-family-mosaic.webp?w=200&auto=compress%2Cenhance"
                              alt="Mosaic Collection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center text-wrap text-sm">Mosaic</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?family=tote"
                        onClick={onClose}
                        className="transition-opacity group-hover:opacity-75 hover:opacity-100!"
                      >
                        <div className="max-w-20 pt-4">
                          <div className="max-w-20 transition-transform hover:-translate-y-2 overflow-hidden relative w-full">
                            <img
                              src="https://dato-cdn.strathberry.com/1736423684-strathberry-mini-tote-black-crossbody-bag-producttype.webp?w=200&auto=compress%2Cenhance"
                              alt="Tote Collection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center text-wrap text-sm">Tote</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?family=osette"
                        onClick={onClose}
                        className="transition-opacity group-hover:opacity-75 hover:opacity-100!"
                      >
                        <div className="max-w-20 pt-4">
                          <div className="max-w-20 transition-transform hover:-translate-y-2 overflow-hidden relative w-full">
                            <img
                              src="https://dato-cdn.strathberry.com/1736423741-strathberry-osette-midi-pouch-black-crossbody-bag-producttype.webp?w=200&auto=compress%2Cenhance"
                              alt="Osette Collection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center text-wrap text-sm">Osette</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?family=east-west"
                        onClick={onClose}
                        className="transition-opacity group-hover:opacity-75 hover:opacity-100!"
                      >
                        <div className="max-w-20 pt-4">
                          <div className="max-w-20 transition-transform hover:-translate-y-2 overflow-hidden relative w-full">
                            <img
                              src="https://dato-cdn.strathberry.com/1736423769-strathberry-stylist-black-crossbody-bag-producttype.webp?w=200&auto=compress%2Cenhance"
                              alt="East/West Collection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center text-wrap text-sm">East/West</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?family=multrees"
                        onClick={onClose}
                        className="transition-opacity group-hover:opacity-75 hover:opacity-100!"
                      >
                        <div className="max-w-20 pt-4">
                          <div className="max-w-20 transition-transform hover:-translate-y-2 overflow-hidden relative w-full">
                            <img
                              src="https://dato-cdn.strathberry.com/1736358821-family-multrees.webp?w=200&auto=compress%2Cenhance"
                              alt="Multrees Collection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center text-wrap text-sm">Multrees</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?family=lana"
                        onClick={onClose}
                        className="transition-opacity group-hover:opacity-75 hover:opacity-100!"
                      >
                        <div className="max-w-20 pt-4">
                          <div className="max-w-20 transition-transform hover:-translate-y-2 overflow-hidden relative w-full">
                            <img
                              src="https://dato-cdn.strathberry.com/1736423665-strathberry-lana-hobo-black-handbag-producttype.webp?w=200&auto=compress%2Cenhance"
                              alt="Lana Collection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center text-wrap text-sm">Lana</div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/products?family=crescent"
                        onClick={onClose}
                        className="transition-opacity group-hover:opacity-75 hover:opacity-100!"
                      >
                        <div className="max-w-20 pt-4">
                          <div className="max-w-20 transition-transform hover:-translate-y-2 overflow-hidden relative w-full">
                            <img
                              src="https://dato-cdn.strathberry.com/1744981364-family-crescent-moon.webp?w=200&auto=compress%2Cenhance"
                              alt="Crescent Collection"
                              className="w-full h-auto object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center text-wrap text-sm">Crescent</div>
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
              
              {/* New Images */}
              {section === 'new' && (
                <div className="flex-1 py-6 px-2 pb-12">
                  <Link
                    to="/collections/new-arrivals"
                    onClick={onClose}
                    className="block group"
                  >
                    <div className="overflow-hidden">
                      <img
                        src="https://d1d1r0t5t0enyr.cloudfront.net/products/8fb96f3e-ade6-4347-8b0f-3e8184d95922.avif"
                        alt="New Arrivals"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>
              )}
              
              {/* Second New Image */}
              {section === 'new' && (
                <div className="flex-1 py-6 px-2 pb-12">
                  <Link
                    to="/collections/new-silhouettes"
                    onClick={onClose}
                    className="block group"
                  >
                    <div className="overflow-hidden">
                      <img
                        src="https://d1d1r0t5t0enyr.cloudfront.net/products/8fb96f3e-ade6-4347-8b0f-3e8184d95922.avif"
                        alt="New Silhouettes"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>
              )}
              
              {/* Collections Images */}
              {section === 'collections' && (
                <div className="flex-1 py-6 px-2 pb-12">
                  <Link
                    to="/products?filter=featured"
                    onClick={onClose}
                    className="block group"
                  >
                    <div className="overflow-hidden">
                      <img
                        src="https://d1d1r0t5t0enyr.cloudfront.net/products/8fb96f3e-ade6-4347-8b0f-3e8184d95922.avif"
                        alt="Featured Collection"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>
              )}
              
              {/* Second Collections Image */}
              {section === 'collections' && (
                <div className="flex-1 py-6 px-2 pb-12">
                  <Link
                    to="/products?filter=new"
                    onClick={onClose}
                    className="block group"
                  >
                    <div className="overflow-hidden">
                      <img
                        src="https://d1d1r0t5t0enyr.cloudfront.net/products/8fb96f3e-ade6-4347-8b0f-3e8184d95922.avif"
                        alt="New Arrivals"
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
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