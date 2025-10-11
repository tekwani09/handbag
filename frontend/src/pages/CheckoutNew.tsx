import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useCurrency } from '../components/CountrySwitcher'
import { formatPrice, getProductPrice } from '../utils/currency'
import DummyPayment from '../components/DummyPayment'
import SavedAddresses from '../components/SavedAddresses'
import { useAuthStore } from '../store/authStore'
import { API_BASE_URL } from '../config/api'

interface Address {
  id: string
  firstName: string
  lastName: string
  address1: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { selectedCountry } = useCurrency()
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [orderId, setOrderId] = useState<string | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    company: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: selectedCountry.code,
    phone: '',
    marketingOptIn: false,
    smsOptIn: false
  })

  const subtotal = getTotalPrice(selectedCountry.currency, getProductPrice)
  const shipping = subtotal > 200 ? 0 : 15
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }))
    }
  }, [user])

  const handleAddressSelect = (address: Address | null) => {
    setSelectedAddress(address)
    
    if (address) {
      setFormData(prev => ({
        ...prev,
        firstName: address.firstName,
        lastName: address.lastName,
        address1: address.address1,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        phone: address.phone || ''
      }))
    }
  }

  const createOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      
      if (!token) {
        alert('Please login first to place an order')
        navigate('/login')
        return
      }
      
      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
        phone: formData.phone
      }
      
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: getProductPrice(item.product, selectedCountry.currency)
        })),
        shippingAddress,
        total,
        subtotal,
        shipping,
        tax: 0
      }
      
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      })
      
      if (response.ok) {
        const { order } = await response.json()
        setOrderId(order.id)
      } else {
        const errorData = await response.json()
        alert(`Failed to create order: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Order creation error:', error)
      alert('Failed to create order')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    createOrder()
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#fcfcfb'}}>
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Your cart is empty</h1>
          <Link to="/products" className="text-sm uppercase tracking-wide underline hover:no-underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Form */}
          <div>
            {!orderId ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Section */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium">Contact</h2>
                    {user && (
                      <div className="text-sm text-gray-600">
                        {user.firstName} {user.lastName} ({user.email})
                        <Link to="/login" className="ml-2 text-black underline hover:no-underline">
                          Sign out
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="marketingOptIn"
                        checked={formData.marketingOptIn}
                        onChange={(e) => setFormData(prev => ({ ...prev, marketingOptIn: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="marketingOptIn" className="text-sm text-gray-700">
                        Sign up for email to hear about our new launches, restocks and special offers
                      </label>
                    </div>
                  </div>
                </section>

                {/* Shipping Address Section */}
                <section>
                  <h2 className="text-lg font-medium mb-6">Shipping address</h2>
                  
                  <SavedAddresses
                    onSelectAddress={handleAddressSelect}
                    selectedAddressId={selectedAddress?.id || null}
                  />

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none"
                      required
                    >
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="company"
                    placeholder="Company (optional)"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none mb-4"
                  />

                  <input
                    type="text"
                    name="address1"
                    placeholder="Address"
                    value={formData.address1}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none mb-4"
                    required
                  />

                  <input
                    type="text"
                    name="address2"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.address2}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none mb-4"
                  />

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none"
                      required
                    />
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none"
                      required
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Delhi">Delhi</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="PIN code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded focus:border-black focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="smsOptIn"
                      checked={formData.smsOptIn}
                      onChange={(e) => setFormData(prev => ({ ...prev, smsOptIn: e.target.checked }))}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="smsOptIn" className="text-sm text-gray-700">
                      Sign-up for text alerts and be the first to hear about exclusive offers
                    </label>
                  </div>
                </section>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-4 px-6 rounded font-medium hover:bg-gray-800 transition-colors"
                >
                  Complete Order
                </button>
              </form>
            ) : (
              <DummyPayment
                amount={total}
                currency={selectedCountry.currency}
                orderId={orderId}
                onSuccess={() => {
                  clearCart()
                  navigate(`/payment-success?orderId=${orderId}`)
                }}
                onError={(error) => {
                  console.error('Payment error:', error)
                  navigate('/payment-failed')
                }}
              />
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white p-6 rounded-lg h-fit sticky top-8">
            <h2 className="text-lg font-medium mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-200 flex-shrink-0 rounded">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium">{formatPrice(getProductPrice(item.product, selectedCountry.currency), selectedCountry.currency)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, selectedCountry.currency)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping, selectedCountry.currency)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold border-t pt-3">
                <span>Total</span>
                <span>{formatPrice(total, selectedCountry.currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}