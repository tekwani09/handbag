import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  image: string
  quantity: number
  product: any
}

interface CartStore {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: (currency: string, getProductPrice: (product: any, currency: string) => number) => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart-items') || '[]'),
  addItem: (item) => {
    const items = get().items
    const existingItem = items.find(i => i.id === item.id)
    
    let newItems
    if (existingItem) {
      newItems = items.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    } else {
      newItems = [...items, { ...item, quantity: 1 }]
    }
    
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    set({ items: newItems })
  },
  removeItem: (id) => {
    const newItems = get().items.filter(item => item.id !== id)
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    set({ items: newItems })
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    const newItems = get().items.map(item =>
      item.id === id ? { ...item, quantity } : item
    )
    localStorage.setItem('cart-items', JSON.stringify(newItems))
    set({ items: newItems })
  },
  clearCart: () => {
    localStorage.removeItem('cart-items')
    set({ items: [] })
  },
  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: (currency, getProductPrice) => {
    return get().items.reduce((total, item) => {
      const price = getProductPrice(item.product, currency)
      return total + (price * item.quantity)
    }, 0)
  }
}))