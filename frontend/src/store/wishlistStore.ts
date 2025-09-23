import { create } from 'zustand'

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
}

export const useWishlistStore = create<WishlistStore>((set, get) => ({
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
  }
}))