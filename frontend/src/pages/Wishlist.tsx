import { Link, useNavigate } from 'react-router-dom'
import { useWishlistStore } from '../store/wishlistStore'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/currency'
import { useCurrency } from '../components/CountrySwitcher'
import { useAuthStore } from '../store/authStore'

export default function Wishlist() {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem } = useCartStore()
  const { selectedCountry } = useCurrency()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const handleAddToBag = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      image: item.image,
      product: { id: item.id, name: item.name, price: item.price, images: [item.image] }
    })
  }

  const handleAddAllToBag = () => {
    items.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        image: item.image,
        product: { id: item.id, name: item.name, price: item.price, images: [item.image] }
      })
    })
  }

  const handleLogout = () => {
    const { logout } = useAuthStore.getState()
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 lg:flex-shrink-0" style={{backgroundColor: '#f0eee9'}}>
          <div className="p-8 lg:p-12 sticky top-0">
            <h2 className="text-3xl md:text-4xl font-light mb-20" style={{fontFamily: 'Cormorant Garamond'}}>
              Hello, {user?.firstName || 'Guest'}
            </h2>
            
            <nav className="space-y-3 mb-12">
              <Link 
                to="/account"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                My Information
              </Link>
              <Link 
                to="/account/orders"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                My Orders &amp; Returns
              </Link>
              <Link 
                to="/account/wishlist"
                className="block text-xs uppercase tracking-wider font-medium text-black"
              >
                Wishlist
              </Link>
              <Link 
                to="/account/addresses"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Address Book
              </Link>
              <Link 
                to="/account/payment"
                className="block text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
              >
                Preferences
              </Link>
            </nav>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-600 hover:text-black transition-colors"
            >
              <span>←</span> Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:p-12 max-w-5xl">
          <div className="mb-8 flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-6">
            <h1 className="text-4xl md:text-5xl font-light" style={{fontFamily: 'Cormorant Garamond'}}>
              Wishlist
            </h1>
            
            {/* Desktop Actions */}
            <div className="items-center gap-6 text-sm hidden lg:flex">
              <button className="uppercase tracking-widest border-b border-gray-400 hover:border-black transition-colors pb-1">
                Share Wishlist
              </button>
              <button 
                onClick={() => clearWishlist()}
                className="uppercase tracking-widest border-b border-gray-400 hover:border-black transition-colors pb-1"
              >
                Clear Wishlist
              </button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 lg:hidden mb-8">
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <button className="uppercase tracking-widest border-b border-gray-400 hover:border-black transition-colors pb-1">
                Share Wishlist
              </button>
              <button 
                onClick={() => clearWishlist()}
                className="uppercase tracking-widest border-b border-gray-400 hover:border-black transition-colors pb-1"
              >
                Clear Wishlist
              </button>
            </div>
            <div className="text-gray-600 text-sm">{items.length} Item{items.length !== 1 ? 's' : ''}</div>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-light mb-4" style={{fontFamily: 'Cormorant Garamond'}}>Your wishlist is empty</h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
                Save your favorite items to your wishlist to view them later
              </p>
              <Link 
                to="/products" 
                className="inline-block bg-black text-white px-8 py-4 text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Add All to Bag Button */}
              <div className="mb-8 flex items-center justify-between gap-4">
                <button 
                  onClick={handleAddAllToBag}
                  className="w-full lg:w-auto border-2 border-black text-black py-4 px-8 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                >
                  Move all items to bag
                </button>
                <div className="text-gray-600 text-sm hidden lg:block">{items.length} Item{items.length !== 1 ? 's' : ''}</div>
              </div>

              {/* Wishlist Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {items.map((item) => (
                  <div key={item.id} className="group">
                    <div className="relative mb-4 overflow-hidden bg-gray-200 aspect-square">
                      <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded transition-all"
                        title="Remove from wishlist"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                          <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <Link to={`/products/${item.id}`}>
                        <h3 className="text-sm font-light hover:underline">{item.name}</h3>
                      </Link>
                      
                      {item.color && (
                        <p className="text-xs text-gray-600">{item.color}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{formatPrice(item.price, selectedCountry.currency)}</p>
                        <button 
                          onClick={() => handleAddToBag(item)}
                          className="text-xs uppercase tracking-widest text-gray-600 border-b border-gray-400 hover:border-black hover:text-black transition-colors pb-0.5"
                        >
                          Add to bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}