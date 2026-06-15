import { Link } from 'react-router-dom'
import { useWishlistStore } from '../store/wishlistStore'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import { useModalStore } from '../store/modalStore'
import { useCurrency } from './CountrySwitcher'
import { formatPrice } from '../utils/currency'
import BaseModal from './BaseModal'

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
}

const INSPIRATION_CATEGORIES = [
  {
    label: 'New Arrivals',
    href: '/collections/new-arrivals',
    image:
      'https://dato-cdn.strathberry.com/1748961110-wishlist-newarrivals.jpg?auto=format&fit=crop&h=844&w=675',
  },
  {
    label: 'Bestsellers',
    href: '/collections/bestsellers',
    image:
      'https://dato-cdn.strathberry.com/1748961098-wishlist-bestsellers.jpg?auto=format&fit=crop&h=844&w=675',
  },
]

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { items, removeItem, clearWishlist } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()
  const { token } = useAuthStore()
  const { openModal } = useModalStore()
  const { selectedCountry } = useCurrency()

  const isGuest = !token

  const handleMoveToBag = (item: (typeof items)[number]) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      product: { id: item.id, name: item.name, price: item.price, images: [item.image] },
    })
    removeItem(item.id)
  }

  const handleMoveAllToBag = () => {
    items.forEach((item) => {
      addToCart({
        id: item.id,
        name: item.name,
        image: item.image,
        product: { id: item.id, name: item.name, price: item.price, images: [item.image] },
      })
    })
    clearWishlist()
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-screen flex-col bg-gray-50">

        {/* ── Mobile-only title row ── */}
        <div className="xl:px-8 md:px-6 px-4 pt-6 pb-4 lg:hidden">
          <h2 className="text-lg font-body">
            Wishlist
          </h2>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto flex flex-col">

          {items.length === 0 ? (
            /* ── Empty state ── */
            <div className="flex flex-1 flex-col">
              <div className="w-full pb-4 xl:px-8 md:px-6 px-4 pt-3">
                {/* Desktop title */}
                <h2 className="text-lg font-body pt-6 pb-4 hidden lg:block">
                  Wishlist
                </h2>
                <p className="text-sm mb-6 text-black/70">
                  Your wishlist is empty. Explore our popular categories for inspiration:
                </p>
              </div>

              {/* Inspiration grid */}
              <div className="flex w-full flex-wrap justify-between gap-x-[2px] gap-y-6 px-0">
                {INSPIRATION_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.href}
                    to={cat.href}
                    onClick={onClose}
                    className="w-[calc(50%-1px)] text-left"
                  >
                    <div className="mb-4 overflow-hidden">
                      <div
                        className="relative w-full"
                        style={{ paddingBottom: '125%' /* 844/675 ≈ 1.25 */ }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: 'rgb(247,247,247)' }}
                        />
                        <img
                          alt={cat.label}
                          src={cat.image}
                          loading="eager"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        />
                      </div>
                    </div>
                    <span className="text-sm font-body ml-4 block">{cat.label}</span>
                  </Link>
                ))}
              </div>

              <div className="flex-1" />

              {/* Start Shopping CTA */}
              <div className="sticky bottom-0 z-40 w-full py-4 bg-gray-50 px-4">
                <button
                  onClick={onClose}
                  className="relative hover:bg-black hover:text-white cursor-pointer transition-all inline-block py-4 px-6 bg-transparent uppercase text-center border border-black tracking-widest w-full text-sm"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            /* ── Items list ── */
            <div className="flex flex-1 flex-col pt-0 pb-0">

              {/* Sticky sub-header: desktop title + guest note */}
              <div className="sticky top-0 z-10 bg-gray-50 pt-3">
                <h2 className="text-lg font-body pt-6 pb-4 xl:mx-8 md:mx-6 mx-4">
                  Wishlist
                </h2>
                {isGuest && (
                  <p className="whitespace-pre-wrap tracking-normal normal-case mt-3 mb-6 text-sm xl:mx-8 md:mx-6 mx-4 text-black/70">
                    Your wishlist will be saved for a limited time.{' '}
                    <button
                      onClick={() => openModal('account')}
                      className="underline hover:no-underline cursor-pointer"
                    >
                      Sign in
                    </button>{' '}
                    or{' '}
                    <button
                      onClick={() => openModal('register')}
                      className="underline hover:no-underline cursor-pointer"
                    >
                      create an account
                    </button>{' '}
                    to save it and view your items on different devices.
                  </p>
                )}
              </div>

              {/* Items */}
              <ul className="xl:ml-8 md:ml-6 ml-4 xl:mr-8 md:mr-6 mr-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-6 p-2 px-0">

                    {/* Product image */}
                    <div className="flex w-[121px] flex-col justify-center lg:w-[99px]">
                      <Link to={`/products/${item.id}`} onClick={onClose} className="relative">
                        <div className="group relative overflow-hidden" style={{ aspectRatio: '4/5' }}>
                          <img
                            alt={item.name}
                            src={
                              item.image ||
                              'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'
                            }
                            loading="lazy"
                            className="h-full w-full object-cover opacity-100 transition-opacity"
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Details */}
                    <div className="flex flex-auto flex-col justify-start gap-2 py-3">
                      <div className="flex justify-between">
                        <h3 className="whitespace-pre-wrap tracking-normal capitalize font-light font-body text-sm">
                          {item.name}
                        </h3>
                        <div className="flex gap-1">
                          {/* Delete button */}
                          <button
                            aria-label="Delete"
                            onClick={() => removeItem(item.id)}
                            className="relative hover:opacity-70 cursor-pointer text-sm transition-all inline-block uppercase text-left -m-1 p-1"
                          >
                            <svg
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 15 13"
                              className="size-5"
                            >
                              <path
                                d="M13.9998 3.10059H0.799805"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4.40137 0.700195H10.4014"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M11.7975 2.7002V11.8202C11.7975 11.9475 11.7483 12.0696 11.6608 12.1596C11.5733 12.2496 11.4546 12.3002 11.3308 12.3002H3.86413C3.74036 12.3002 3.62166 12.2496 3.53414 12.1596C3.44663 12.0696 3.39746 11.9475 3.39746 11.8202V2.7002"
                                stroke="currentColor"
                                strokeLinecap="square"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </div>

                      {/* Color variant */}
                      {item.color && (
                        <p className="whitespace-pre-wrap tracking-normal normal-case text-sm text-black/70">
                          {item.color}
                        </p>
                      )}

                      {/* Price + Move to bag */}
                      <div className="mt-auto flex w-full items-center justify-between">
                        <div>
                          <span className="text-sm subpixel-antialiased">
                            {formatPrice(item.price, selectedCountry.currency)}
                          </span>
                        </div>
                        <div>
                          <button
                            onClick={() => handleMoveToBag(item)}
                            className="relative hover:opacity-70 cursor-pointer text-sm transition-all inline-block px-0 py-0 uppercase text-left tracking-wide"
                          >
                            Move to bag
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex-1" />

              {/* Sticky footer */}
              <div className="sticky bottom-0 z-40 w-full border-t border-solid border-black/15 bg-gray-50 py-6">
                <div className="xl:ml-8 md:ml-6 ml-4 xl:mr-8 md:mr-6 mr-4">
                  <button
                    onClick={handleMoveAllToBag}
                    className="relative hover:bg-black hover:text-white cursor-pointer transition-all inline-block px-6 bg-transparent uppercase text-center border border-black tracking-widest w-full py-3 text-xs"
                  >
                    Move all items to bag
                  </button>
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={clearWishlist}
                      className="relative cursor-pointer hover:opacity-70 transition-opacity flex items-center justify-center uppercase text-xs tracking-widest"
                    >
                      Clear wishlist
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </BaseModal>
  )
}
