import { ReactNode, useState, useEffect } from 'react'
import { useModalStore } from '../store/modalStore'
import { useCartStore } from '../store/cartStore'
import { useWishlistStore } from '../store/wishlistStore'
import { useCurrency } from './CountrySwitcher'
import { bgClasses } from '../styles/colors'

interface Country {
  code: string
  name: string
  currency: string
  symbol: string
  flag: string
}

const FlagIcon = ({ code, className = '' }: { code: string; className?: string }) => {
  const flagUrls: { [key: string]: string } = {
    'gb': 'https://www.datocms-assets.com/17511/1624285088-united-kingdom-flag.svg',
    'us': 'https://www.datocms-assets.com/17511/1624523694-united-states-flag.svg',
    'in': 'https://nelkinda.com/blog/svg-flag-of-india/img/India.svg'
  }
  return <img src={flagUrls[code]} alt={`${code} flag`} className={className} />
}

const countries: Country[] = [
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: 'gb' },
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: 'us' },
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', flag: 'in' }
]

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function BaseModal({ isOpen, onClose, children }: BaseModalProps) {
  const { openModal, activeModal } = useModalStore()
  const { getTotalItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { selectedCountry, setSelectedCountry } = useCurrency()
  const [showCountrySelector, setShowCountrySelector] = useState(false)

  // Lock body scroll only while modal is open
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const isCountryModal = activeModal === 'country'
  const displayCountrySelector = showCountrySelector || isCountryModal

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />

      <div className={`absolute top-0 right-0 h-screen w-screen max-w-none 2xl:max-w-[499px] xl:max-w-[419px] lg:max-w-[397px] ${bgClasses.modal} shadow-lg flex flex-col`}>
        {displayCountrySelector ? (
          <>
            <div className={`sticky top-0 z-20 flex min-h-16 items-center justify-between gap-2 ${bgClasses.modal} py-1.5 xl:px-8 md:px-6 px-4`}>
              {!isCountryModal ? (
                <button onClick={() => setShowCountrySelector(false)} className="text-sm hover:opacity-70 transition-opacity">← Back</button>
              ) : <div />}
              <h2 className="text-lg font-light uppercase tracking-wide">Select Country</h2>
              <button type="button" onClick={onClose} className="relative hover:opacity-70 cursor-pointer transition-all -m-2 p-2">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round" />
                  <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto scrollbar-hide xl:px-8 md:px-6 px-4 py-6">
              <div className="space-y-4">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country)
                      setShowCountrySelector(false)
                      if (isCountryModal) onClose()
                    }}
                    className={`w-full text-left p-4 border transition-colors ${selectedCountry.code === country.code ? 'border-black bg-black/5' : 'border-black/20 hover:border-black'}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FlagIcon code={country.flag} className="w-6 h-6" />
                        <div>
                          <div className="font-light text-black">{country.name}</div>
                          <div className="text-sm text-black/60 uppercase tracking-wide">{country.code} | {country.currency}</div>
                        </div>
                      </div>
                      {selectedCountry.code === country.code && <div className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-12 pt-6 border-t border-black/20">
                <p className="text-sm text-black/60 font-light">
                  Prices will be displayed in {selectedCountry.currency} and orders will be processed in {selectedCountry.name}.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ── Modal header: icons left, close right ── */}
            <div className={`sticky top-0 z-20 flex min-h-14 items-center justify-between gap-2 ${bgClasses.modal} py-1.5 xl:px-8 md:px-6 px-4`}>
              {/* Left: nav icons */}
              <div className="flex items-center gap-2">
                <button onClick={() => setShowCountrySelector(true)} className="hidden lg:flex items-center space-x-1 text-sm font-light text-black hover:opacity-70 transition-opacity tracking-wide mr-4">
                  <span>Ship to:</span>
                  <FlagIcon code={selectedCountry.flag} className="inline-block w-5 h-5" />
                  <span className="uppercase">{selectedCountry.code}</span>
                </button>
                <button onClick={() => openModal('search')} className="text-black group relative -m-1 flex items-center justify-center p-1 hover:opacity-70 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="6" strokeWidth="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35" />
                  </svg>
                </button>
                <button onClick={() => openModal('wishlist')} className="text-black group relative -m-1 flex items-center justify-center p-1 hover:opacity-70 transition-opacity">
                  <svg className={`w-5 h-5 ${activeModal === 'wishlist' ? 'fill-black' : 'fill-none stroke-black group-hover:fill-black'}`} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistItems.length > 0 && (
                    <span className="absolute top-0.5 right-0 bg-black text-white text-[9px] rounded-full h-3 w-3 flex items-center justify-center font-light">{wishlistItems.length}</span>
                  )}
                </button>
                <button onClick={() => openModal('account')} className="text-black group relative -m-1 flex items-center justify-center p-1 hover:opacity-70 transition-opacity">
                  <svg className={`w-5 h-5 ${activeModal === 'account' ? 'fill-black' : 'fill-none stroke-black group-hover:fill-black'}`} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button onClick={() => openModal('cart')} className="text-black group relative -m-1 flex items-center justify-center p-1 hover:opacity-70 transition-opacity">
                  <svg className="w-6 h-6" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                    <path className={`transition-all duration-200 ${activeModal === 'cart' ? 'fill-black' : 'group-hover:fill-black'}`} d="M10 26 L54 26 L46 53 Q44.5 55 40 55 L24 55 Q19.5 55 18 53 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
                    <path d="M22 28 C22 14, 27 8, 32 8 C37 8, 42 14, 42 28" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  {getTotalItems() > 0 && (
                    <span className="absolute top-0.5 right-0 bg-black text-white text-[9px] rounded-full h-3 w-3 flex items-center justify-center font-light">{getTotalItems()}</span>
                  )}
                </button>
              </div>

              {/* Right: close */}
              <button type="button" onClick={onClose} className="relative hover:opacity-70 cursor-pointer transition-all -m-2 p-2">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round" />
                  <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Content */}
            {children}
          </>
        )}
      </div>
    </div>
  )
}
