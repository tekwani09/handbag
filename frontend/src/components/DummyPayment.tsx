import { useState } from 'react'
import { API_BASE_URL } from '../config/api'

interface DummyPaymentProps {
  amount: number
  currency: string
  orderId: string
  onSuccess: () => void
  onError: (error: string) => void
}

const DummyPayment = ({ amount, currency, orderId, onSuccess, onError }: DummyPaymentProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const token = localStorage.getItem('token')
      console.log('DummyPayment - Token exists:', !!token)
      
      if (!token) {
        onError('Please login first to complete payment')
        return
      }
      
      const response = await fetch(`${API_BASE_URL}/payments/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderId, paymentMethod })
      })
      
      console.log('DummyPayment - Response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('DummyPayment - Payment successful:', result)
        onSuccess()
      } else {
        const errorData = await response.json()
        console.error('DummyPayment - Payment failed:', errorData)
        onError(`Payment failed: ${errorData.error}`)
      }
    } catch (error) {
      onError('Payment processing failed')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="p-4 border border-gray-200 rounded-lg bg-yellow-50">
        <h3 className="font-medium mb-2 text-yellow-800">Demo Payment System</h3>
        <p className="text-sm text-yellow-700">
          This is a dummy payment system for testing. No real payment will be processed.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-black focus:outline-none"
          >
            <option value="card">Credit/Debit Card</option>
            <option value="upi">UPI</option>
            <option value="netbanking">Net Banking</option>
            <option value="wallet">Digital Wallet</option>
          </select>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          <h4 className="font-medium mb-2">Order Summary</h4>
          <div className="flex justify-between text-sm">
            <span>Amount:</span>
            <span>{currency.toUpperCase()} {amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Payment Method:</span>
            <span className="capitalize">{paymentMethod}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? 'Processing Payment...' : `Pay ${currency.toUpperCase()} ${amount.toFixed(2)}`}
      </button>

      <div className="text-sm text-gray-500 text-center">
        <p>🔒 This is a demo payment system</p>
        <p>No actual payment will be charged</p>
      </div>
    </div>
  )
}

export default DummyPayment