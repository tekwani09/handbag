import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchInput, setSearchInput] = useState('')
  const [products, setProducts] = useState<any[]>([])

  const mockProducts = [
    { id: 1, name: 'Nano Tote', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
    { id: 2, name: 'Mini Tote', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
    { id: 3, name: 'Nano Tote', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
    { id: 4, name: 'Nano Tote', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
    { id: 5, name: 'Mini Tote', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' },
    { id: 6, name: 'Nano Tote', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400' },
    { id: 7, name: 'Mini Tote', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
    { id: 8, name: 'Midi Tote', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400' },
    { id: 9, name: 'Mini Tote', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400' },
    { id: 10, name: 'Nano Tote', image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400' },
    { id: 11, name: 'Mini Tote', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400' },
    { id: 12, name: 'Mini Tote', image: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400' }
  ]

  useEffect(() => {
    if (searchInput.trim()) {
      setProducts(mockProducts.filter(p => 
        p.name.toLowerCase().includes(searchInput.toLowerCase())
      ))
    } else {
      setProducts([])
    }
  }, [searchInput])

  const clearSearch = () => {
    setSearchInput('')
    setProducts([])
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      
      {/* Right Sidebar */}
      <div className="absolute top-0 right-0 h-screen w-[499px] max-w-[499px] bg-gray-50 shadow-lg">
        {/* Header */}
        <div className="bg-gray-50 mt-2.5">
          <div className="flex min-h-16 items-center justify-between gap-2 py-1.5 px-4">
            <nav>
              <ul className="group flex max-w-max items-center">
                <li className="px-1.5 py-2 text-center duration-300 xl:px-2 group-hover:opacity-70 hover:opacity-100 transition-opacity opacity-70">
                  <button className="relative cursor-pointer transition-all text-xs uppercase tracking-wide whitespace-nowrap">
                    <div className="w-full transition-opacity">Bags</div>
                  </button>
                </li>
                <li className="px-1.5 py-2 text-center duration-300 xl:px-2 group-hover:opacity-70 hover:opacity-100 transition-opacity opacity-70">
                  <button className="relative cursor-pointer transition-all text-xs uppercase tracking-wide whitespace-nowrap">
                    <div className="w-full transition-opacity">Accessories</div>
                  </button>
                </li>
                <li className="px-1.5 py-2 text-center duration-300 xl:px-2 group-hover:opacity-70 hover:opacity-100 transition-opacity opacity-70">
                  <button className="relative cursor-pointer transition-all text-xs uppercase tracking-wide whitespace-nowrap">
                    <div className="w-full transition-opacity">New</div>
                  </button>
                </li>
                <li className="px-1.5 py-2 text-center duration-300 xl:px-2 group-hover:opacity-70 hover:opacity-100 transition-opacity opacity-70">
                  <button className="relative cursor-pointer transition-all text-xs uppercase tracking-wide whitespace-nowrap">
                    <div className="w-full transition-opacity">Cashmere</div>
                  </button>
                </li>
                <li className="px-1.5 py-2 text-center duration-300 xl:px-2 group-hover:opacity-70 hover:opacity-100 transition-opacity opacity-70">
                  <button className="relative cursor-pointer transition-all text-xs uppercase tracking-wide whitespace-nowrap">
                    <div className="w-full transition-opacity">Gifts</div>
                  </button>
                </li>
                <li className="pl-3">
                  <button type="button" onClick={onClose} className="relative text-sm cursor-pointer transition-opacity flex items-center group-hover:opacity-70 hover:opacity-100">
                    <div className="w-full transition-opacity">
                      <svg viewBox="0 0 16 16" fill="none" className="size-4">
                        <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round" />
                        <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
          
        {/* Search Form */}
        <div className="bg-gray-50 px-4 py-4">
          <form className="flex w-full flex-col" onSubmit={(e) => e.preventDefault()}>
            <div className="group relative w-full">
              <div className="flex w-full flex-col">
                <input 
                  type="search" 
                  placeholder="Type to search" 
                  maxLength={320}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-transparent border-solid border-b border-t-0 border-x-0 border-black placeholder-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 w-full placeholder:text-black/75 placeholder:uppercase text-base md:text-sm appearance-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
                  autoFocus
                />
                {searchInput && (
                  <button 
                    type="button"
                    onClick={clearSearch}
                    className="hover:opacity-70 cursor-pointer transition-all inline-block px-0 py-0 uppercase text-left tracking-wide absolute top-1/2 right-2 z-20 -translate-y-1/2 transform text-xs"
                  >
                    <div className="w-full transition-opacity space-x-1 flex items-center">
                      <div className="sr-only">Clear</div>
                      <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-3">
                        <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round" />
                        <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* Content */}
        <div className="h-[calc(100vh-12rem)] overflow-auto">
          <div className="p-4">

            {/* Results */}
            {products.length > 0 && (
              <>
                <ul className="my-8 grid grid-cols-2 gap-x-1 gap-y-4 xs:grid-cols-3">
                  {products.slice(0, 12).map((product: any) => (
                    <li key={product.id}>
                      <div className="group product-card relative flex flex-col justify-between gap-1">
                        <Link to={`/products/${product.id}`} onClick={onClose} className="relative block">
                          <div className="relative">
                            <div className="group relative aspect-square overflow-hidden">
                              <img 
                                alt=""
                                loading="lazy"
                                src={product.image}
                                className="h-full w-full object-cover opacity-100 transition-opacity group-hover:opacity-0"
                                style={{ width: '100%' }}
                              />
                              <div className="absolute top-0 right-0 bottom-0 left-0 z-10 w-full object-cover opacity-0 transition-opacity group-hover:opacity-100">
                                <img 
                                  alt=""
                                  loading="lazy"
                                  src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"
                                  className="hidden group-hover:block"
                                  style={{ width: '100%' }}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="mx-1 xl:mx-2">
                              <div className="flex flex-col flex-wrap items-baseline justify-between gap-x-3 gap-y-1 lg:gap-y-2">
                                <div className="flex flex-col">
                                  <span className="text-sm">{product.name}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {/* View All Button */}
                <div className="sticky bottom-0 z-10 bg-white pt-4 -mx-4 px-4 pb-4">
                  <Link to={`/search?q=${searchInput}`} onClick={onClose} className="flex">
                    <div className="relative hover:bg-black hover:text-white cursor-pointer text-sm transition-all inline-block py-4 px-6 bg-transparent uppercase text-center border border-black w-full">
                      <div className="w-full transition-opacity">View all {products.length} results</div>
                    </div>
                  </Link>
                </div>
              </>
            )}

            {/* No Results */}
            {searchInput && products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-sm text-gray-600">No results found for "{searchInput}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}