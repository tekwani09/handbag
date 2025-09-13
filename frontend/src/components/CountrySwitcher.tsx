import { useState, createContext, useContext } from 'react'

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
  const { selectedCountry, setSelectedCountry } = useCurrency()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-1 text-sm font-light text-black hover:text-gray-600 transition-colors tracking-wide"
        >
          <span>Ship to:</span>
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="uppercase">{selectedCountry.code}</span>
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-50 z-[9999]"
          onClick={() => setIsOpen(false)}
          style={{ margin: 0, padding: 0 }}
        />
      )}

      {/* Slide-out Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-[10000] ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-light uppercase tracking-wide">Select Country</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-light hover:text-gray-600"
            >
              ×
            </button>
          </div>

          {/* Countries List */}
          <div className="space-y-4">
            {countries.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country)
                  setIsOpen(false)
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

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 font-light">
              Prices will be displayed in {selectedCountry.currency} and orders will be processed in {selectedCountry.name}.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}