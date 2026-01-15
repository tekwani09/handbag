import { useState, createContext, useContext } from 'react'
import { useModalStore } from '../store/modalStore'

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

const CurrencyContext = createContext<{
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
}>({ 
  selectedCountry: countries[0], 
  setSelectedCountry: () => {} 
})

export const useCurrency = () => useContext(CurrencyContext)

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  
  return (
    <CurrencyContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </CurrencyContext.Provider>
  )
}

interface CountrySwitcherProps {
  className?: string
}

export default function CountrySwitcher({ className = '' }: CountrySwitcherProps) {
  const { selectedCountry } = useCurrency()
  const { openModal } = useModalStore()

  return (
    <>
      <div className="relative ${className}">
        <button
          onClick={() => openModal('country')}
          className="flex items-center space-x-1 text-sm font-light text-black hover:text-gray-600 transition-colors tracking-wide"
        >
          <span>Ship to:</span>
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="uppercase">{selectedCountry.code}</span>
        </button>
      </div>
    </>
  )
}