import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { API_BASE_URL } from '../config/api'

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  isWishlisted: (id: string) => boolean
  toggleItem: (item: WishlistItem) => void
  syncWithServer: (token: string) => Promise<void>
  mergeLocalWithServer: (serverItems: WishlistItem[]) => void
}

export const useWishlistStore = create<WishlistStore>()(persist(
  (set, get) => ({
    items: [],
    addItem: (item) => {
      const items = get().items
      if (!items.find(i => i.id === item.id)) {
        set({ items: [...items, item] })
      }
    },
    removeItem: (id) => {
      set({ items: get().items.filter(item => item.id !== id) })
    },
    isWishlisted: (id) => {
      return get().items.some(item => item.id === id)
    },
    toggleItem: (item) => {
      const isWishlisted = get().isWishlisted(item.id)
      if (isWishlisted) {
        get().removeItem(item.id)
      } else {
        get().addItem(item)
      }
    },
    syncWithServer: async (token) => {
      try {
        // Get server wishlist
        const response = await fetch(`${API_BASE_URL}/users/wishlist`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        if (response.ok) {
          const serverData = await response.json()
          const serverItems = serverData.items || []
          get().mergeLocalWithServer(serverItems)
        }
      } catch (error) {
        console.error('Failed to sync wishlist with server:', error)
      }
    },
    mergeLocalWithServer: (serverItems) => {
      const localItems = get().items
      const mergedItems = [...serverItems]
      
      // Add local items that aren't on server
      localItems.forEach(localItem => {
        if (!serverItems.find(serverItem => serverItem.id === localItem.id)) {
          mergedItems.push(localItem)
        }
      })
      
      set({ items: mergedItems })
    }
  }),
  {
    name: 'wishlist-storage'
  }
))