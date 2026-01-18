import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, user, token, isLoading } = useAuthStore()
  
  console.log('ProtectedRoute - isLoading:', isLoading)
  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated)
  console.log('ProtectedRoute - user:', user)
  console.log('ProtectedRoute - user role:', user?.role)
  console.log('ProtectedRoute - isAdmin:', isAdmin)
  console.log('ProtectedRoute - token:', !!token)
  console.log('ProtectedRoute - adminOnly:', adminOnly)

  // If we have a token but no user data, we're still loading
  if (token && !user && !isLoading) {
    return <div>Loading...</div>
  }

  // Show loading while checking auth
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    console.log('ProtectedRoute - Redirecting to login')
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !isAdmin) {
    console.log('ProtectedRoute - Not admin, redirecting to home')
    console.log('ProtectedRoute - Direct role check:', user?.role === 'ADMIN')
    // Temporary workaround - check role directly
    if (user?.role !== 'ADMIN') {
      return <Navigate to="/" replace />
    }
  }

  console.log('ProtectedRoute - Access granted')
  return <>{children}</>
}