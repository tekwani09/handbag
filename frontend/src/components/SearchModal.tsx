import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'
import BaseModal from './BaseModal'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchInput, setSearchInput] = useState('')
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchInput.trim()) {
      searchProducts(searchInput)
    } else {
      setProducts([])
    }
  }, [searchInput])

  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      setProducts([])
      return
    }
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(query)}`)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Search failed:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchInput('')
    setProducts([])
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
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
                    className="hover:opacity-70 cursor-pointer transition-all inline-block px-0 py-0 uppercase text-left tracking-wide absolute top-1/2 right-2 z-20 -translate-y-1/2 transform text-sm"
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
                <ul className="my-8 grid grid-cols-2 gap-x-1 gap-y-4 sm:grid-cols-3">
                  {products.slice(0, 12).map((product: any) => (
                    <li key={product.id}>
                      <div className="group product-card relative flex flex-col justify-between gap-1">
                        <Link to={`/products/${product.id}`} onClick={onClose} className="relative block">
                          <div className="relative">
                            <div className="group relative aspect-square overflow-hidden">
                              <img 
                                alt=""
                                loading="lazy"
                                src={product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                                className="h-full w-full object-cover opacity-100 transition-opacity group-hover:opacity-0"
                                style={{ width: '100%' }}
                              />
                              <div className="absolute top-0 right-0 bottom-0 left-0 z-10 w-full object-cover opacity-0 transition-opacity group-hover:opacity-100">
                                <img 
                                  alt=""
                                  loading="lazy"
                                  src={product.productModelImage || product.images?.[1] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'}
                                  className="hidden group-hover:block h-full w-full object-cover"
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
    </BaseModal>
  )
}