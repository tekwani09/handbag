import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'
import { API_BASE_URL } from '../config/api'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [searchInput, setSearchInput] = useState(query)
  const { selectedCountry } = useCurrency()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { addItem, toggleCart } = useCartStore()
  const { toggleItem, isWishlisted } = useWishlistStore()

  useEffect(() => {
    if (query) {
      setSearchInput(query)
      searchProducts(query)
    }
  }, [query])

  const searchProducts = async (searchQuery: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_BASE_URL}/products?search=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Search failed:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() })
    }
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearchParams({})
    setProducts([])
  }

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

  const displayProducts = query ? (products.length > 0 ? products : mockProducts) : []

  return (
    <div className="fixed inset-0 z-50">
      {/* Right Sidebar */}
      <div className="absolute top-[111px] right-0 h-[calc(100vh-111px)] w-[499px] max-w-[499px] bg-gray-50 shadow-lg">
        {/* Header */}
        <div className="flex min-h-16 items-center justify-between gap-2 bg-gray-50 py-1.5 px-4">
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
                <button type="button" aria-label="Search Site" className="relative text-sm cursor-pointer transition-opacity flex items-center group-hover:opacity-70 hover:opacity-100">
                  <div className="w-full transition-opacity">
                    <svg viewBox="0 0 20 20" fill="none" className="size-5 fill-black lg:size-4">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.5732 8.39276C13.5732 9.07235 13.4393 9.74529 13.1793 10.3731C12.9192 11.001 12.538 11.5715 12.0575 12.052C11.5769 12.5326 11.0064 12.9138 10.3786 13.1738C9.75071 13.4339 9.07777 13.5678 8.39818 13.5678C7.71859 13.5678 7.04566 13.4339 6.4178 13.1738C5.78994 12.9138 5.21945 12.5326 4.73891 12.052C4.25837 11.5715 3.87718 11.001 3.61711 10.3731C3.35705 9.74529 3.22319 9.07235 3.22319 8.39276C3.22319 7.02027 3.76841 5.70399 4.73891 4.73349C5.70941 3.76299 7.02569 3.21777 8.39818 3.21777C9.77067 3.21777 11.087 3.76299 12.0575 4.73349C13.028 5.70399 13.5732 7.02027 13.5732 8.39276ZM12.5111 13.4648C11.213 14.5185 9.55996 15.0336 7.89311 14.9039C6.22625 14.7742 4.6728 14.0095 3.55335 12.7677C2.43391 11.5259 1.83391 9.90174 1.87719 8.23041C1.92046 6.55907 2.60371 4.96813 3.78592 3.78592C4.96813 2.60371 6.55907 1.92046 8.23041 1.87719C9.90174 1.83391 11.5259 2.43391 12.7677 3.55335C14.0095 4.6728 14.7742 6.22625 14.9039 7.89311C15.0336 9.55996 14.5185 11.213 13.4648 12.5111L18.125 17.1713L17.1604 18.125L12.5002 13.4648H12.5111Z" fill="currentColor" />
                    </svg>
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Content */}
        <div className="h-[calc(100%-4rem)] overflow-auto">
          <div className="p-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex w-full flex-col sticky top-0 z-20 bg-gray-50 pb-4">
              <div className="group relative w-full">
                <div className="flex w-full flex-col">
                  <input 
                    type="search" 
                    placeholder="Type to search" 
                    maxLength={320}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="bg-transparent border-solid border-b border-t-0 border-x-0 border-black placeholder-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 w-full placeholder:text-black/75 placeholder:uppercase text-base md:text-sm"
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
              <button className="sr-only absolute right-0 py-2" type="submit">Search all products...</button>
            </form>

            {/* Results */}
            {displayProducts.length > 0 && (
              <>
                <ul className="my-8 grid grid-cols-2 gap-x-1 gap-y-4 xs:grid-cols-3">
                  {displayProducts.slice(0, 12).map((product: any) => (
                    <li key={product.id}>
                      <div className="group product-card relative flex flex-col justify-between gap-1">
                        <Link to={`/products/${product.id}`} className="relative block">
                          <div className="relative">
                            <div className="group relative aspect-square overflow-hidden">
                              <img 
                                alt=""
                                loading="lazy"
                                src={product.image || product.images?.[0] || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                                className="h-full w-full object-cover opacity-100 transition-opacity group-hover:opacity-0"
                                style={{ width: '100%' }}
                              />
                              <div className="absolute top-0 right-0 bottom-0 left-0 z-10 w-full object-cover opacity-0 transition-opacity group-hover:opacity-100">
                                <img 
                                  alt=""
                                  loading="lazy"
                                  src={product.hoverImage || product.images?.[1] || 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400'}
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
                <div className="sticky bottom-0 z-10 bg-gray-50 pt-4 xl:-mx-8 md:-mx-6 -mx-4 xl:px-8 md:px-6 px-4 xl:pb-8 md:pb-6 pb-4">
                  <Link to={`/search?q=${query}`} className="flex">
                    <div className="relative hover:bg-black hover:text-white cursor-pointer text-sm transition-all inline-block py-4 px-6 bg-transparent uppercase text-center border border-black w-full">
                      <div className="w-full transition-opacity">View all {displayProducts.length} results</div>
                    </div>
                  </Link>
                </div>
              </>
            )}

            {/* No Results */}
            {query && displayProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-sm text-gray-600">No results found for "{query}"</p>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-sm text-gray-600">Searching...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}