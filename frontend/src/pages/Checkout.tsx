import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useCurrency } from '../components/CountrySwitcher'
import { formatPrice, getProductPrice } from '../utils/currency'
import DummyPayment from '../components/DummyPayment'
import { API_BASE_URL } from '../config/api'

export default function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { selectedCountry } = useCurrency()
  const [step, setStep] = useState(1)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: selectedCountry.code,
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const subtotal = getTotalPrice(selectedCountry.currency, getProductPrice)
  const shipping = subtotal > 200 ? 0 : 15
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const navigate = useNavigate()

  const createOrder = async () => {
    try {
      const token = localStorage.getItem('token')
      console.log('Frontend - Token exists:', !!token)
      
      if (!token) {
        alert('Please login first to place an order')
        navigate('/login')
        return
      }
      
      console.log('Frontend - API URL:', `${API_BASE_URL}/orders`)
      
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: getProductPrice(item.product, selectedCountry.currency)
        })),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address1: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone
        },
        total,
        subtotal,
        shipping,
        tax: 0
      }
      
      console.log('Frontend - Order data:', orderData)
      
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      })
      
      console.log('Frontend - Response status:', response.status)
      
      if (response.ok) {
        const { order } = await response.json()
        console.log('Frontend - Order created:', order)
        setOrderId(order.id)
      } else {
        const errorData = await response.json()
        console.error('Frontend - Order creation failed:', errorData)
        alert(`Failed to create order: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Frontend - Order creation error:', error)
      alert('Failed to create order')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      if (step === 2) {
        // Moving to payment step - create order automatically
        setStep(step + 1)
        setTimeout(() => createOrder(), 100) // Small delay to show step transition
      } else {
        setStep(step + 1)
      }
    }
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light tracking-wide mb-4">CHECKOUT</h1>
          <div className="flex justify-center space-x-8 text-sm">
            <span className={`${step >= 1 ? 'text-black' : 'text-gray-400'}`}>1. INFORMATION</span>
            <span className={`${step >= 2 ? 'text-black' : 'text-gray-400'}`}>2. SHIPPING</span>
            <span className={`${step >= 3 ? 'text-black' : 'text-gray-400'}`}>3. PAYMENT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Form */}
          <div>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-light mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                        required
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                        required
                      />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-light mb-6">Shipping Address</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                        required
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State/Province"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Postal code"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                      required
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full p-4 border border-gray-300 focus:border-black focus:outline-none text-sm"
                      required
                    >
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                    </select>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-light mb-6">Payment Information</h2>
                  {!orderId ? (
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
                      <p className="text-gray-600">Creating your order...</p>
                    </div>
                  ) : (
                    <DummyPayment
                      amount={total}
                      currency={selectedCountry.currency}
                      orderId={orderId}
                      onSuccess={() => {
                        console.log('Payment successful - clearing cart')
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
              )}

              {step < 3 && (
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="text-sm uppercase tracking-wide underline hover:no-underline"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="bg-black text-white px-8 py-4 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors ml-auto"
                  >
                    Continue
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white p-8">
            <h2 className="text-xl font-light mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-light">{item.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm">{formatPrice(getProductPrice(item.product, selectedCountry.currency), selectedCountry.currency)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal, selectedCountry.currency)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping, selectedCountry.currency)}</span>
              </div>
              <div className="flex justify-between text-lg font-medium border-t pt-2">
                <span>Total</span>
                <span>{formatPrice(total, selectedCountry.currency)}</span>
              </div>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>• Free shipping on orders over {formatPrice(200, selectedCountry.currency)}</p>
              <p>• Secure payment processing</p>
              <p>• 30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}