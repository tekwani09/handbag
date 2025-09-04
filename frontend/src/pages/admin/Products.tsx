import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'

export default function AdminProducts() {
  const { token } = useAuthStore()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    inventory: '',
    categoryId: '',
    images: ['']
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      const data = await response.json()
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products')
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/categories', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('Failed to fetch categories')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          priceGBP: parseFloat(formData.price),
          priceUSD: Math.round(parseFloat(formData.price) * 1.27),
          priceINR: Math.round(parseFloat(formData.price) * 83),
          sku: formData.sku,
          inventory: parseInt(formData.inventory),
          categoryId: formData.categoryId,
          images: formData.images.filter(img => img.trim())
        })
      })

      if (response.ok) {
        setShowAddForm(false)
        setFormData({
          name: '',
          description: '',
          price: '',
          sku: '',
          inventory: '',
          categoryId: '',
          images: ['']
        })
        fetchProducts()
      }
    } catch (error) {
      console.error('Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchProducts()
    } catch (error) {
      console.error('Failed to delete product')
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-light">Products</h1>
        <button 
          onClick={() => setShowAddForm(true)}
          className="bg-black text-white px-6 py-3 text-sm font-light uppercase tracking-wide hover:bg-gray-800 transition-colors"
        >
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-light text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product: any) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 mr-4 flex items-center justify-center">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xs text-gray-400">IMG</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-light text-black">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.sku}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-light text-black">{product.category?.name}</td>
                  <td className="px-6 py-4 text-sm font-light text-black">£{product.priceGBP}</td>
                  <td className="px-6 py-4 text-sm font-light text-black">{product.inventory}</td>
                  <td className="px-6 py-4 text-sm font-light">
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-2xl w-full mx-4 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-light mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">Product Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                />
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black h-24" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Price (£)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Stock Quantity</label>
                  <input 
                    type="number" 
                    required
                    value={formData.inventory}
                    onChange={(e) => setFormData(prev => ({ ...prev, inventory: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">SKU</label>
                  <input 
                    type="text" 
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Category</label>
                  <select 
                    required
                    value={formData.categoryId}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">Image URL</label>
                <input 
                  type="url" 
                  value={formData.images[0]}
                  onChange={(e) => setFormData(prev => ({ ...prev, images: [e.target.value] }))}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-6 py-2 text-sm font-light uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Adding...' : 'Add Product'}
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
  )
}