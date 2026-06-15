import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { API_BASE_URL } from '../config/api'

interface CartItem {
  id: string
  name: string
  image: string
  quantity: number
  color?: string
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
  syncWithServer: (token: string) => Promise<void>
  mergeLocalWithServer: (serverItems: CartItem[]) => void
}

export const useCartStore = create<CartStore>()(persist(
  (set, get) => ({
    items: [],
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
      
      set({ items: newItems })
    },
    removeItem: (id) => {
      const newItems = get().items.filter(item => item.id !== id)
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
      set({ items: newItems })
    },
    clearCart: () => {
      set({ items: [] })
    },
    getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
    getTotalPrice: (currency, getProductPrice) => {
      return get().items.reduce((total, item) => {
        const price = getProductPrice(item.product, currency)
        return total + (price * item.quantity)
      }, 0)
    },
    syncWithServer: async (token) => {
      try {
        // Get server cart
        const response = await fetch(`${API_BASE_URL}/users/cart`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const serverData = await response.json()
          const serverItems = serverData.items || []
          get().mergeLocalWithServer(serverItems)
        }
      } catch (error) {
        console.error('Failed to sync cart with server:', error)
      }
    },
    mergeLocalWithServer: (serverItems) => {
      const localItems = get().items
      const mergedItems = [...serverItems]
      
      // Add local items that aren't on server or merge quantities
      localItems.forEach(localItem => {
        const serverItem = serverItems.find(item => item.id === localItem.id)
        if (serverItem) {
          // Merge quantities for existing items
          const index = mergedItems.findIndex(item => item.id === localItem.id)
          if (index !== -1) {
            mergedItems[index].quantity += localItem.quantity
          }
        } else {
          // Add local items not on server
          mergedItems.push(localItem)
        }
      })
      
      set({ items: mergedItems })
    }
  }),
  {
    name: 'cart-storage'
  }
))