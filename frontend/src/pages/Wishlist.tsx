import { Link } from 'react-router-dom'
import { useWishlistStore } from '../store/wishlistStore'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/currency'
import { useCurrency } from '../components/CountrySwitcher'
import Footer from '../components/Footer'

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()
  const { selectedCountry } = useCurrency()

  const handleAddToBag = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      image: item.image,
      product: { id: item.id, name: item.name, price: item.price, images: [item.image] }
    })
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-light mb-4">Wishlist</h1>
          <p className="text-sm text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-light mb-4">Your wishlist is empty</h2>
            <p className="text-sm text-gray-600 mb-8">Save your favorite items to your wishlist</p>
            <Link 
              to="/products" 
              className="inline-block bg-black text-white px-8 py-3 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="group">
                <div className="aspect-square bg-gray-200 mb-4 overflow-hidden relative">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                      <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                    </svg>
                  </button>
                </div>
                <div className="space-y-2">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="text-sm font-light hover:underline">{item.name}</h3>
                  </Link>
                  <p className="text-sm">{formatPrice(item.price, selectedCountry.currency)}</p>
                  <button 
                    onClick={() => handleAddToBag(item)}
                    className="text-xs uppercase tracking-wide underline hover:no-underline"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}