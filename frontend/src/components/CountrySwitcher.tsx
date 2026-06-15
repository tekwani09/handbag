import { useState, createContext, useContext } from 'react'
import { useModalStore } from '../store/modalStore'

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
  { code: 'UK', name: 'United Kingdom', currency: 'GBP', symbol: '£', flag: 'gb' },
  { code: 'US', name: 'United States', currency: 'USD', symbol: '$', flag: 'us' },
  { code: 'IN', name: 'India', currency: 'INR', symbol: '₹', flag: 'in' }
]

const CurrencyContext = createContext<{
  selectedCountry: Country
  setSelectedCountry: (country: Country) => void
}>({ 
  selectedCountry: countries[2], 
  setSelectedCountry: () => {} 
})

export const useCurrency = () => useContext(CurrencyContext)

export const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[2])
  
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
          <FlagIcon code={selectedCountry.flag} className="inline-block w-5 h-5" />
          <span className="uppercase">{selectedCountry.code}</span>
        </button>
      </div>
    </>
  )
}