import { ReactNode, useState } from 'react'
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

const countries: Country[] = [
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', flag: '🇮🇳' }
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

  // Auto-show country selector when country modal is active
  const isCountryModal = activeModal === 'country'
  const displayCountrySelector = showCountrySelector || isCountryModal

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      
      <div className={`absolute top-0 right-0 h-screen w-screen max-w-none 2xl:max-w-[499px] xl:max-w-[419px] lg:max-w-[397px] ${bgClasses.modal} shadow-lg flex flex-col`}>
        {displayCountrySelector ? (
          /* Country Selector View */
          <>
            <div className={`sticky top-0 z-20 flex min-h-16 items-center justify-between gap-2 ${bgClasses.modal} py-1.5 xl:px-8 md:px-6 px-4`}>
              {!isCountryModal && (
                <button
                  onClick={() => setShowCountrySelector(false)}
                  className="text-sm hover:opacity-70 transition-opacity"
                >
                  ← Back
                </button>
              )}
              {isCountryModal && <div></div>}
              <h2 className="text-lg font-light uppercase tracking-wide">Select Country</h2>
              <button 
                type="button" 
                onClick={onClose} 
                className="relative hover:opacity-70 cursor-pointer transition-all inline-block uppercase text-left tracking-wide z-20 -m-2 p-2 text-xs"
              >
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                  <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                  <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-auto xl:px-8 md:px-6 px-4 py-6">
              <div className="space-y-4">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country)
                      setShowCountrySelector(false)
                      if (isCountryModal) {
                        onClose()
                      }
                    }}
                    className={`w-full text-left p-4 border transition-colors ${
                      selectedCountry.code === country.code 
                        ? 'border-black bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <div className="font-light text-black">{country.name}</div>
                          <div className="text-sm text-gray-600 uppercase tracking-wide">
                            {country.code} | {country.currency}
                          </div>
                        </div>
                      </div>
                      {selectedCountry.code === country.code && (
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 font-light">
                  Prices will be displayed in {selectedCountry.currency} and orders will be processed in {selectedCountry.name}.
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Normal Modal View */
          <>
        <div className={`sticky top-0 z-20 flex min-h-16 items-center justify-between gap-2 ${bgClasses.modal} py-1.5 xl:px-8 md:px-6 px-4`}>
          <div className="gap-4 sticky top-0 hidden lg:flex">
            <div className="group flex items-center -ml-2 mr-8">
              <button
                onClick={() => setShowCountrySelector(true)}
                className="flex items-center space-x-1 text-sm font-light text-black hover:text-gray-600 transition-colors tracking-wide"
              >
                <span>Ship to:</span>
                <span className="text-lg">{selectedCountry.flag}</span>
                <span className="uppercase">{selectedCountry.code}</span>
              </button>
            </div>
          </div>
          <div className="relative flex items-center gap-2 -ml-16">
            <button 
              onClick={() => openModal('search')}
              className="group relative -m-2 flex items-center justify-center p-2 focus:ring-black/5 lg:-m-1 lg:p-1 hover:opacity-80 transition-opacity duration-300"
            >
              <svg className={`size-6 xxs:size-[1.625rem] lg:size-4 transition-all ${activeModal === 'search' ? 'fill-black text-black' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button 
              onClick={() => openModal('wishlist')}
              className="group relative -m-2 flex items-center justify-center p-2 focus:ring-black/5 lg:-m-1 lg:p-1 hover:opacity-80 transition-opacity duration-300"
            >
              <svg className={`size-6 xxs:size-[1.625rem] lg:size-4 transition-all ${activeModal === 'wishlist' ? 'fill-black text-black' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                  {wishlistItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => openModal('account')}
              className="group relative -m-2 flex items-center justify-center p-2 focus:ring-black/5 lg:-m-1 lg:p-1 hover:opacity-80 transition-opacity duration-300"
            >
              <svg className={`size-6 xxs:size-[1.625rem] lg:size-4 transition-all ${activeModal === 'account' ? 'fill-black text-black' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button 
              onClick={() => openModal('cart')}
              className="group relative -m-2 flex items-center justify-center p-2 focus:ring-black/5 lg:-m-1 lg:p-1 hover:opacity-80 transition-opacity duration-300"
            >
              <svg className={`size-6 xxs:size-[1.625rem] lg:size-4 transition-all ${activeModal === 'cart' ? 'fill-black text-black' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>
          <div></div>
          <button 
            type="button" 
            onClick={onClose} 
            className="relative hover:opacity-70 cursor-pointer transition-all inline-block uppercase text-left tracking-wide z-20 -m-2 p-2 text-xs"
          >
            <div className="w-full transition-opacity space-x-1 flex items-center">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round"></path>
              </svg>
            </div>
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
