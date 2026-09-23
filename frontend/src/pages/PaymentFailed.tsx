import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#fcfcfb'}}>
      <main className="max-w-2xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-20">
        {/* Error Message */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <svg className="w-16 h-16 text-red-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-light mb-4">Payment Failed</h1>
          <p className="text-lg text-gray-600 mb-2">
            We were unable to process your payment. Please review the details and try again.
          </p>
          <p className="text-sm text-gray-500">
            Your cart has been saved and is ready for you to complete your purchase.
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-white border border-red-200 rounded-lg p-6 md:p-8 mb-12 bg-red-50">
          <h2 className="text-lg font-light mb-4 text-red-900">What happened?</h2>
          <ul className="space-y-2 text-sm text-red-800">
            <li>• Your card was declined</li>
            <li>• Please check your billing information</li>
            <li>• Try a different payment method</li>
            <li>• Contact your bank or card issuer if the issue persists</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Link
            to="/checkout"
            className="flex-1 md:flex-none bg-black text-white py-4 px-8 text-sm uppercase tracking-wide hover:bg-gray-800 transition-colors text-center rounded"
          >
            Try Again
          </Link>
          <Link
            to="/cart"
            className="flex-1 md:flex-none border-2 border-black text-black py-4 px-8 text-sm uppercase tracking-wide hover:bg-black hover:text-white transition-colors text-center rounded"
          >
            Back to Cart
          </Link>
          <Link
            to="/"
            className="flex-1 md:flex-none border-2 border-gray-300 text-gray-700 py-4 px-8 text-sm uppercase tracking-wide hover:bg-gray-100 transition-colors text-center rounded"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Support Text */}
        <div className="text-center text-sm text-gray-600 max-w-md mx-auto">
          <p>Need help? <a href="#" className="underline hover:no-underline">Contact our support team</a></p>
        </div>
      </main>
    </div>
  )
}

export default PaymentFailed
