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
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  getTotalItems: () => number
  getTotalPrice: (currency: string, getProductPrice: (product: any, currency: string) => number) => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (item) => {
    const items = get().items
    const existingItem = items.find(i => i.id === item.id)
    
    if (existingItem) {
      set({
        items: items.map(i => 
          i.id === item.id 
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      })
    } else {
      set({ items: [...items, { ...item, quantity: 1 }] })
    }
  },
  removeItem: (id) => {
    set({ items: get().items.filter(item => item.id !== id) })
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    set({
      items: get().items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    })
  },
  clearCart: () => set({ items: [] }),
  toggleCart: () => set({ isOpen: !get().isOpen }),
  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: (currency, getProductPrice) => {
    return get().items.reduce((total, item) => {
      const price = getProductPrice(item.product, currency)
      return total + (price * item.quantity)
    }, 0)
  }
}))