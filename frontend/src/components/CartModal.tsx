import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useModalStore } from '../store/modalStore'
import { formatPrice, getProductPrice } from '../utils/currency'
import { useCurrency } from './CountrySwitcher'
import BaseModal from './BaseModal'

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

const FLAG_URLS: Record<string, string> = {
  gb: 'https://www.datocms-assets.com/17511/1624285088-united-kingdom-flag.svg',
  us: 'https://www.datocms-assets.com/17511/1624523694-united-states-flag.svg',
  in: 'https://nelkinda.com/blog/svg-flag-of-india/img/India.svg',
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const { selectedCountry } = useCurrency()
  const { openModal } = useModalStore()
  const [giftNote, setGiftNote] = useState(false)

  const total = getTotalPrice(
    selectedCountry.currency,
    (product, currency) => getProductPrice(product || {}, currency)
  )

  const flagUrl = FLAG_URLS[selectedCountry.flag] || FLAG_URLS['gb']

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col bg-gray-50" style={{ height: '100vh' }}>

        {/* ── Sticky header ── */}
        <header className="xl:px-8 md:px-6 px-4 bg-gray-50 flex-none">
          <div className="pt-6 pb-4 flex justify-between items-center">
            <h2 className="text-lg font-body">
              Shopping bag{items.length > 0 && ` (${items.reduce((s, i) => s + i.quantity, 0)} item${items.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''})`}
            </h2>
          </div>
        </header>

        {/* ── Items / empty state ── */}
        <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col h-full">
              <div className="flex-1 flex items-center justify-center px-4">
                <p className="text-sm">Your bag is empty</p>
              </div>
              <div className="flex-none px-4 py-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="relative hover:bg-black hover:text-white cursor-pointer transition-all inline-block py-4 px-6 bg-transparent uppercase text-center border border-black tracking-widest w-full text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <ul className="space-y-5 py-6 lg:space-y-6">
              {items.map((item) => {
                const itemPrice = getProductPrice(item.product || item, selectedCountry.currency)
                return (
                  <li key={item.id} className="px-4">
                    <div className="flex gap-5">
                      {/* Product image */}
                      <div className="flex w-[100px] flex-none flex-col justify-start">
                        <Link to={`/products/${item.id}`} onClick={onClose}>
                          <img
                            alt={item.name}
                            loading="lazy"
                            width={160}
                            height={200}
                            src={item.image || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'}
                            className="rounded object-cover object-center w-full"
                            style={{ aspectRatio: '160 / 200' }}
                          />
                        </Link>
                      </div>

                      {/* Details */}
                      <div className="flex w-full flex-col gap-2">
                        {/* Name + color + remove */}
                        <div className="flex w-full justify-between">
                          <Link
                            to={`/products/${item.id}`}
                            onClick={onClose}
                            className="block space-y-1"
                          >
                            <div className="text-sm font-body">{item.name}</div>
                            {item.color && (
                              <p className="text-sm font-body text-black/70">{item.color}</p>
                            )}
                          </Link>
                          <div className="flex min-w-8 items-start justify-end">
                            <button
                              type="button"
                              title="Remove from Cart"
                              onClick={() => removeItem(item.id)}
                              className="relative cursor-pointer transition-all -m-1 flex items-center justify-center p-1 px-1 py-2"
                            >
                              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13" className="size-4 transition-transform hover:scale-110">
                                <path d="M13.9998 3.10059H0.799805" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.40137 0.700195H10.4014" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M11.7975 2.7002V11.8202C11.7975 11.9475 11.7483 12.0696 11.6608 12.1596C11.5733 12.2496 11.4546 12.3002 11.3308 12.3002H3.86413C3.74036 12.3002 3.62166 12.2496 3.53414 12.1596C3.44663 12.0696 3.39746 11.9475 3.39746 11.8202V2.7002" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Quantity + price */}
                        <div className="flex flex-wrap items-baseline justify-between gap-4 mt-auto">
                          {/* Quantity stepper */}
                          <div className="flex items-center gap-1.5">
                            <button
                              aria-label="Decrease quantity"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="relative cursor-pointer -m-1 p-1 w-6 h-6 grid items-center justify-center"
                            >
                              <span className="flex items-center justify-center rounded-[4px] bg-black/8 w-4 h-4 text-[9px]">
                                <span>−</span>
                              </span>
                            </button>
                            <div className="text-center text-[12px] tabular-nums w-4">{item.quantity}</div>
                            <button
                              aria-label="Increase quantity"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="relative cursor-pointer -m-1 p-1 w-6 h-6 grid items-center justify-center"
                            >
                              <span className="flex items-center justify-center rounded-[4px] bg-black/8 w-4 h-4 text-[9px]">
                                <span>+</span>
                              </span>
                            </button>
                          </div>

                          {/* Price */}
                          <div className="flex flex-row items-baseline gap-1 text-sm">
                            <div className="text-black">
                              {formatPrice(itemPrice * item.quantity, selectedCountry.currency)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* ── Sticky footer ── */}
        {items.length > 0 && (
          <footer className="sticky bottom-0 z-10 bg-gray-50 px-4">
            <div className="space-y-4 border-t border-black/10 pb-4">

              {/* Gift note toggle */}
              <div className="flex items-end space-x-2 border-b border-black/10 py-4">
                <div className="flex items-center text-sm">
                  <input
                    className="cursor-pointer h-4 mr-2 accent-black"
                    id="gift-note"
                    type="checkbox"
                    checked={giftNote}
                    onChange={(e) => setGiftNote(e.target.checked)}
                  />
                  <label htmlFor="gift-note" className="cursor-pointer font-normal text-sm">
                    Add complimentary gift note + ribbon
                  </label>
                </div>
              </div>

              {/* Estimated delivery + total */}
              <div className="my-3">
                <div className="flex items-center justify-between space-x-2 my-3">
                  <span className="text-sm font-normal">Estimated delivery</span>
                  <span className="text-sm font-normal uppercase">Free</span>
                </div>
                <div className="flex items-center justify-between space-x-2 my-3 border-t border-black/60 pt-3">
                  <span className="text-sm font-medium capitalize">Total</span>
                  <div className="text-sm font-medium">
                    {formatPrice(total, selectedCountry.currency)}
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="flex flex-col">
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="relative cursor-pointer text-sm transition-all inline-block py-4 px-6 text-white uppercase text-center bg-black border border-black tracking-widest w-full hover:bg-transparent hover:text-black"
                >
                  <div className="w-full transition-opacity flex justify-center">
                    Continue to checkout
                  </div>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-col gap-2 pb-2">
                {/* Free shipping */}
                <div className="flex items-center space-x-2">
                  <div className="inline-flex size-4 flex-none items-center justify-center">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 6.75L12 1.75L20.5 6.75V17.25L12 22.25L3.5 17.25V6.75Z" stroke="currentColor" strokeOpacity="0.9" strokeWidth="0.85" strokeLinejoin="round" />
                      <path d="M12 22.25V11.75M12 11.75L3.5 6.75M12 11.75L20.5 6.75" stroke="currentColor" strokeOpacity="0.9" strokeWidth="0.85" />
                      <path d="M8 9.25L16 4.25" stroke="currentColor" strokeOpacity="0.9" strokeWidth="0.85" />
                    </svg>
                  </div>
                  <span className="text-sm font-normal">Free standard shipping on all orders</span>
                </div>

                {/* Free returns */}
                <div className="flex items-center space-x-2">
                  <div className="inline-flex size-4 flex-none items-center justify-center">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.125 3.714C3.125 3.503 3.296 3.332 3.507 3.332H16.493C16.704 3.332 16.875 3.503 16.875 3.714V15.554C16.875 15.637 16.848 15.717 16.799 15.783L15.653 17.311C15.591 17.394 15.498 17.448 15.395 17.461C15.293 17.474 15.189 17.445 15.109 17.38L13.466 16.066L12.18 17.352C12.042 17.49 11.823 17.502 11.671 17.38L10.028 16.066L8.742 17.352C8.605 17.49 8.386 17.502 8.234 17.38L6.591 16.066L5.305 17.352C5.156 17.501 4.914 17.501 4.765 17.352L3.237 15.824C3.165 15.753 3.125 15.656 3.125 15.554V3.714ZM3.889 4.096V15.396L5.035 16.542L6.292 15.284C6.43 15.147 6.649 15.134 6.801 15.256L8.444 16.57L9.73 15.284C9.868 15.147 10.087 15.134 10.239 15.256L11.881 16.57L13.167 15.284C13.305 15.147 13.524 15.134 13.676 15.256L15.278 16.538L16.111 15.427V4.096H3.889Z" fill="currentColor" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.035 6.005C5.035 5.794 5.206 5.623 5.417 5.623H14.584C14.795 5.623 14.966 5.794 14.966 6.005C14.966 6.216 14.795 6.387 14.584 6.387H5.417C5.206 6.387 5.035 6.216 5.035 6.005Z" fill="currentColor" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.035 8.298C5.035 8.087 5.206 7.916 5.417 7.916H14.584C14.795 7.916 14.966 8.087 14.966 8.298C14.966 8.509 14.795 8.68 14.584 8.68H5.417C5.206 8.68 5.035 8.509 5.035 8.298Z" fill="currentColor" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M5.035 10.589C5.035 10.378 5.206 10.207 5.417 10.207H12.292C12.503 10.207 12.674 10.378 12.674 10.589C12.674 10.8 12.503 10.971 12.292 10.971H5.417C5.206 10.971 5.035 10.8 5.035 10.589Z" fill="currentColor" />
                    </svg>
                  </div>
                  <span className="text-sm font-normal">Free returns*</span>
                </div>

                {/* Shipping to country */}
                <div className="flex items-center space-x-2">
                  <div className="inline-flex size-4 flex-none items-center justify-center">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeOpacity="0.9" strokeWidth="0.85" strokeLinejoin="round" />
                      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeOpacity="0.9" strokeWidth="0.85" />
                    </svg>
                  </div>
                  <span className="text-sm font-normal flex items-center gap-1">
                    Shipping to{' '}
                    <img
                      alt=""
                      className="inline-block shadow mx-1"
                      width={18}
                      src={flagUrl}
                    />
                    {selectedCountry.name}{' '}
                    <button
                      className="underline outline-none hover:no-underline"
                      onClick={() => openModal('country')}
                    >
                      Change
                    </button>
                  </span>
                </div>
              </div>

            </div>
          </footer>
        )}
      </div>
    </BaseModal>
  )
}
