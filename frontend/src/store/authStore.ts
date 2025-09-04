import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'CUSTOMER' | 'ADMIN'
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  login: (token: string, user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      login: (token: string, user: User) =>
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.role === 'ADMIN'
        }),
      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false
        })
    }),
    {
      name: 'auth-storage'
    }
  )
)