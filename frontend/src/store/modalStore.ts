import { create } from 'zustand'

type ModalType = 'search' | 'account' | 'register' | 'wishlist' | 'cart' | 'country' | null

interface ModalStore {
  activeModal: ModalType
  openModal: (modal: ModalType) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}))
