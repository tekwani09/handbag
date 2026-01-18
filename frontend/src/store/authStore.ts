import { create } from 'zustand'
import { API_BASE_URL } from '../config/api'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: string
  createdAt: string
}

interface AuthStore {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  checkAuth: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isLoading: false,
  get isAuthenticated() {
    return !!get().token
  },
  get isAdmin() {
    const user = get().user
    console.log('isAdmin getter - user:', user)
    console.log('isAdmin getter - user.role:', user?.role)
    console.log('isAdmin getter - typeof user.role:', typeof user?.role)
    console.log('isAdmin getter - user.role === "ADMIN":', user?.role === 'ADMIN')
    console.log('isAdmin getter - result:', user?.role === 'ADMIN')
    return user?.role === 'ADMIN'
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        set({ user: data.user, token: data.token, isLoading: false })
        return true
      } else {
        set({ isLoading: false })
        return false
      }
    } catch (error) {
      set({ isLoading: false })
      return false
    }
  },

  register: async (firstName: string, lastName: string, email: string, password: string) => {
    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('token', data.token)
        set({ user: data.user, token: data.token, isLoading: false })
        return true
      } else {
        set({ isLoading: false })
        return false
      }
    } catch (error) {
      set({ isLoading: false })
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, token: null })
  },

  checkAuth: async () => {
    const token = get().token
    if (!token) return

    set({ isLoading: true })
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('checkAuth - received user data:', data.user)
        set({ user: data.user, isLoading: false })
      } else if (response.status === 401) {
        // Only logout if token is actually invalid/expired
        console.log('checkAuth - Token expired or invalid, logging out')
        get().logout()
        set({ isLoading: false })
      } else {
        // For other errors, don't logout but stop loading
        console.log('checkAuth - Server error, keeping user logged in')
        set({ isLoading: false })
      }
    } catch (error) {
      console.error('checkAuth error:', error)
      // Don't logout on network errors, just stop loading
      set({ isLoading: false })
    }
  }
}))