import { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
  isLoginModalOpen: boolean
  loginModalMode: 'login' | 'register'
  openLoginModal: (mode?: 'login' | 'register') => void
  closeLoginModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'register'>('login')

  const openLoginModal = (mode: 'login' | 'register' = 'login') => {
    setLoginModalMode(mode)
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  return (
    <ModalContext.Provider value={{ isLoginModalOpen, loginModalMode, openLoginModal, closeLoginModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}
