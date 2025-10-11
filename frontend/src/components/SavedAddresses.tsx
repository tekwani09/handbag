import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../config/api'

interface Address {
  id: string
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault?: boolean
}

interface SavedAddressesProps {
  onSelectAddress: (address: Address | null) => void
  selectedAddressId: string | null
}

export default function SavedAddresses({ onSelectAddress, selectedAddressId }: SavedAddressesProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/addresses`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAddresses(data.addresses || [])
      }
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddressSelect = (address: Address) => {
    onSelectAddress(address)
  }

  const handleNewAddress = () => {
    onSelectAddress(null)
  }

  if (loading) {
    return (
      <div className="mb-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (addresses.length === 0) {
    return null
  }

  const displayedAddresses = showAll ? addresses : addresses.slice(0, 2)

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3 text-gray-900">Saved addresses</h3>
      
      <div className="space-y-3">
        {/* New Address Option */}
        <div 
          onClick={handleNewAddress}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            !selectedAddressId 
              ? 'border-black bg-gray-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
              !selectedAddressId ? 'border-black bg-black' : 'border-gray-300'
            }`}>
              {!selectedAddressId && <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>}
            </div>
            <span className="font-medium text-gray-900">Use a new address</span>
          </div>
        </div>

        {/* Saved Addresses */}
        {displayedAddresses.map((address) => (
          <div
            key={address.id}
            onClick={() => handleAddressSelect(address)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedAddressId === address.id
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start">
              <div className={`w-4 h-4 rounded-full border-2 mr-3 mt-0.5 flex-shrink-0 ${
                selectedAddressId === address.id ? 'border-black bg-black' : 'border-gray-300'
              }`}>
                {selectedAddressId === address.id && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">
                    {address.firstName} {address.lastName}
                  </span>
                  {address.isDefault && (
                    <span className="px-2 py-0.5 text-xs bg-black text-white rounded">
                      Default
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 space-y-0.5">
                  <div>{address.address1}</div>
                  {address.address2 && <div>{address.address2}</div>}
                  <div>{address.city}, {address.state} {address.zipCode}</div>
                  <div>{address.country}</div>
                  {address.phone && <div>{address.phone}</div>}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Show More/Less Button */}
        {addresses.length > 2 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full p-3 text-sm text-gray-600 hover:text-black border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            {showAll ? 'Show less' : `Show ${addresses.length - 2} more address${addresses.length - 2 > 1 ? 'es' : ''}`}
          </button>
        )}
      </div>
    </div>
  )
}