import { useState, useEffect } from 'react'
import { useAuthStore } from '../../store/authStore'
import ImageUpload from '../../components/ImageUpload'

export default function AdminProducts() {
  const { token } = useAuthStore()
  const [products, setProducts] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    priceGBP: '',
    priceUSD: '',
    priceINR: '',
    comparePrice: '',
    sku: '',
    inventory: '',
    category: '',
    family: '',
    images: [''],
    productModelImage: '',
    color: '',
    colorHex: '#000000',
    featured: false,
    active: true,
    parentProductId: ''
  })

  const categories = [
    { value: 'CROSSBODY_BAGS', label: 'Crossbody Bags' },
    { value: 'TOTES_TOP_HANDLE_BAGS', label: 'Totes & Top-Handle Bags' },
    { value: 'SMALL_MINI_BAGS', label: 'Small & Mini Bags' },
    { value: 'SHOULDER_BAGS', label: 'Shoulder Bags' },
    { value: 'EVENING_BAGS', label: 'Evening Bags' },
    { value: 'TRAVEL_BAGS', label: 'Travel Bags' },
    { value: 'RAFFIA_BAGS', label: 'Raffia Bags' },
    { value: 'EMBOSSED_BAGS', label: 'Embossed Bags' },
    { value: 'SUEDE_BAGS', label: 'Suede Bags' }
  ]

  const families = [
    { value: 'KITE', label: 'Kite' },
    { value: 'MOSAIC', label: 'Mosaic' },
    { value: 'TOTE', label: 'Tote' },
    { value: 'OSETTE', label: 'Osette' },
    { value: 'EAST_WEST', label: 'East/West' },
    { value: 'MULTREES', label: 'Multrees' },
    { value: 'LANA', label: 'Lana' },
    { value: 'CRESCENT', label: 'Crescent' }
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      console.log('Fetching products with token:', !!token)
      const response = await fetch('/api/products?admin=true', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Products data:', data)
      setProducts(data.products || [])
    } catch (error) {
      console.error('Failed to fetch products:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        priceGBP: parseFloat(formData.priceGBP),
        priceUSD: parseFloat(formData.priceUSD) || Math.round(parseFloat(formData.priceGBP) * 1.27),
        priceINR: parseFloat(formData.priceINR) || Math.round(parseFloat(formData.priceGBP) * 83),
        comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
        sku: formData.sku,
        inventory: parseInt(formData.inventory),
        category: formData.category,
        family: formData.family || null,
        images: formData.images.filter(img => img.trim()),
        productModelImage: formData.productModelImage || null,
        color: formData.color || null,
        colorHex: formData.colorHex || null,
        featured: formData.featured,
        active: formData.active,
        parentProductId: formData.parentProductId || null
      }

      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      })

      if (response.ok) {
        setShowAddForm(false)
        setShowEditForm(false)
        setEditingProduct(null)
        resetForm()
        fetchProducts()
      }
    } catch (error) {
      console.error('Failed to save product')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      priceGBP: '',
      priceUSD: '',
      priceINR: '',
      comparePrice: '',
      sku: '',
      inventory: '',
      category: '',
      family: '',
      images: [''],
      productModelImage: '',
      color: '',
      colorHex: '#000000',
      featured: false,
      active: true,
      parentProductId: ''
    })
  }

  const addImageField = () => {
    setFormData(prev => ({ ...prev, images: [...prev.images, ''] }))
  }

  const removeImageField = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }))
  }

  const updateImageField = (index: number, value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      images: prev.images.map((img, i) => i === index ? value : img) 
    }))
  }

  const editProduct = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      priceGBP: product.priceGBP.toString(),
      priceUSD: product.priceUSD.toString(),
      priceINR: product.priceINR.toString(),
      comparePrice: product.comparePrice?.toString() || '',
      sku: product.sku,
      inventory: product.inventory.toString(),
      category: product.category,
      family: product.family || '',
      images: product.images.length > 0 ? product.images : [''],
      productModelImage: product.productModelImage || '',
      color: product.color || '',
      colorHex: product.colorHex || '#000000',
      featured: product.featured,
      active: product.active,
      parentProductId: product.parentProductId || ''
    })
    setShowEditForm(true)
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

  const parentProducts = products.filter((p: any) => !p.parentProductId)

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
                <th className="px-6 py-3 text-left text-sm font-light text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-sm font-light text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-sm font-light text-gray-500 uppercase tracking-wider">Family</th>
                <th className="px-6 py-3 text-left text-sm font-light text-gray-500 uppercase tracking-wider">Color</th>
                <th className="px-6 py-3 text-left text-sm font-light text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-sm font-light text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-light text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-light text-gray-500 uppercase tracking-wider">Actions</th>
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
                          <span className="text-sm text-gray-400">IMG</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-light text-black">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.sku}</div>
                        {product.parentProductId && (
                          <div className="text-sm text-blue-600">Variant</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-light text-black">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-light text-black">{product.family || '-'}</td>
                  <td className="px-6 py-4">
                    {product.color && (
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-2 border" 
                          style={{ backgroundColor: product.colorHex }}
                        ></div>
                        <span className="text-sm font-light">{product.color}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-light text-black">£{product.priceGBP}</td>
                  <td className="px-6 py-4 text-sm font-light text-black">{product.inventory}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-sm font-light rounded ${
                      product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.active ? 'Active' : 'Inactive'}
                    </span>
                    {product.featured && (
                      <span className="ml-2 px-2 py-1 text-sm font-light rounded bg-blue-100 text-blue-800">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-light">
                    <button 
                      onClick={() => editProduct(product)}
                      className="text-blue-600 hover:text-blue-800 mr-4"
                    >
                      Edit
                    </button>
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

      {/* Add/Edit Product Modal */}
      {(showAddForm || showEditForm) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 max-w-4xl w-full mx-4 max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-light mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Product Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">SKU *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">Description *</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black h-24" 
                />
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Price GBP (£) *</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={formData.priceGBP}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceGBP: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Price USD ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.priceUSD}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceUSD: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Price INR (₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.priceINR}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceINR: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                    placeholder="Auto-calculated"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Compare Price (£)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={formData.comparePrice}
                    onChange={(e) => setFormData(prev => ({ ...prev, comparePrice: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                  />
                </div>
              </div>

              {/* Category and Family */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Category *</label>
                  <select 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Family</label>
                  <select 
                    value={formData.family}
                    onChange={(e) => setFormData(prev => ({ ...prev, family: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                  >
                    <option value="">Select Family (Optional)</option>
                    {families.map((family) => (
                      <option key={family.value} value={family.value}>{family.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Inventory */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">Stock Quantity *</label>
                <input 
                  type="number" 
                  required
                  value={formData.inventory}
                  onChange={(e) => setFormData(prev => ({ ...prev, inventory: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                />
              </div>

              {/* Color Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Color Name</label>
                  <input 
                    type="text" 
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                    placeholder="e.g., Black, Navy, Burgundy"
                  />
                </div>
                <div>
                  <label className="block text-sm font-light text-gray-700 mb-2">Color Hex</label>
                  <div className="flex items-center">
                    <input 
                      type="color" 
                      value={formData.colorHex}
                      onChange={(e) => setFormData(prev => ({ ...prev, colorHex: e.target.value }))}
                      className="w-12 h-10 border border-gray-300 mr-2" 
                    />
                    <input 
                      type="text" 
                      value={formData.colorHex}
                      onChange={(e) => setFormData(prev => ({ ...prev, colorHex: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                      placeholder="#000000"
                    />
                  </div>
                </div>
              </div>

              {/* Parent Product (for variants) */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">Parent Product (for color variants)</label>
                <select 
                  value={formData.parentProductId}
                  onChange={(e) => setFormData(prev => ({ ...prev, parentProductId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                >
                  <option value="">None (This is a main product)</option>
                  {parentProducts.map((product: any) => (
                    <option key={product.id} value={product.id}>{product.name} - {product.color || 'No color'}</option>
                  ))}
                </select>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">Product Images</label>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input 
                      type="url" 
                      value={image}
                      onChange={(e) => updateImageField(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                      placeholder="Image URL"
                    />
                    <ImageUpload 
                      onImageUploaded={(url) => updateImageField(index, url)}
                      className="ml-2"
                    />
                    {formData.images.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="ml-2 px-3 py-2 text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button 
                  type="button"
                  onClick={addImageField}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add Another Image
                </button>
              </div>

              {/* Model Image */}
              <div>
                <label className="block text-sm font-light text-gray-700 mb-2">Product Model Image</label>
                <div className="flex items-center">
                  <input 
                    type="url" 
                    value={formData.productModelImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, productModelImage: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-black" 
                    placeholder="Model wearing/using the product"
                  />
                  <ImageUpload 
                    onImageUploaded={(url) => setFormData(prev => ({ ...prev, productModelImage: url }))}
                    className="ml-2"
                  />
                </div>
              </div>

              {/* Status Options */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="mr-2" 
                  />
                  <span className="text-sm font-light text-gray-700">Featured Product</span>
                </label>
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                    className="mr-2" 
                  />
                  <span className="text-sm font-light text-gray-700">Active</span>
                </label>
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white px-6 py-2 text-sm font-light uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {loading ? (editingProduct ? 'Updating...' : 'Adding...') : (editingProduct ? 'Update Product' : 'Add Product')}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setShowAddForm(false)
                    setShowEditForm(false)
                    setEditingProduct(null)
                    resetForm()
                  }}
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