import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AccountAddresses() {
  const [addresses] = useState([
    {
      id: 1,
      type: 'Shipping',
      firstName: 'John',
      lastName: 'Smith',
      address1: '123 Oxford Street',
      city: 'London',
      postcode: 'W1D 2HX',
      country: 'United Kingdom',
      isDefault: true
    }
  ])
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/account" className="text-sm font-light text-black hover:text-gray-600 uppercase tracking-wide">
            ← Back to Account
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-light tracking-wider text-black mb-4">
            ADDRESS BOOK
          </h1>
          <p className="text-sm font-light text-gray-600">
            Manage your shipping and billing addresses
          </p>
        </div>

        <div className="flex justify-end mb-8">
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-black text-white px-6 py-3 text-sm font-light uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            Add New Address
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div key={address.id} className="border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-light text-black uppercase tracking-wide">
                  {address.type} Address
                </h3>
                {address.isDefault && (
                  <span className="bg-black text-white px-2 py-1 text-sm font-light uppercase tracking-wide">
                    Default
                  </span>
                )}
              </div>

              <div className="text-sm font-light text-gray-700 space-y-1 mb-6">
                <p>{address.firstName} {address.lastName}</p>
                <p>{address.address1}</p>
                <p>{address.city} {address.postcode}</p>
                <p>{address.country}</p>
              </div>

              <div className="flex space-x-4">
                <button className="border border-black text-black px-4 py-2 text-sm font-light uppercase tracking-wide hover:bg-black hover:text-white transition-colors">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-800 px-4 py-2 text-sm font-light uppercase tracking-wide">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Address Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-8 max-w-md w-full mx-4">
              <h2 className="text-2xl font-light mb-6 uppercase tracking-wide">Add New Address</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="px-3 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black" />
                  <input type="text" placeholder="Last Name" className="px-3 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black" />
                </div>
                <input type="text" placeholder="Address Line 1" className="w-full px-3 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black" />
                <input type="text" placeholder="Address Line 2 (Optional)" className="w-full px-3 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="City" className="px-3 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black" />
                  <input type="text" placeholder="Postcode" className="px-3 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black" />
                </div>
                <select className="w-full px-3 py-2 border border-gray-300 text-sm font-light focus:outline-none focus:border-black">
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>India</option>
                </select>
                <div className="flex space-x-4 pt-4">
                  <button type="submit" className="bg-black text-white px-6 py-2 text-sm font-light uppercase tracking-wide hover:bg-gray-800 transition-colors">
                    Save Address
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="border border-gray-300 text-black px-6 py-2 text-sm font-light uppercase tracking-wide hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}