import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-light mb-4">Payment Failed</h1>
          <p className="text-gray-600 mb-8">
            We were unable to process your payment. Please try again or use a different payment method.
          </p>

          <div className="space-y-4">
            <Link
              to="/checkout"
              className="block w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800"
            >
              Try Again
            </Link>
            <Link
              to="/cart"
              className="block w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50"
            >
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailed