import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from './components/Header'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import { useAuthStore } from './store/authStore'

import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import { CurrencyProvider } from './components/CountrySwitcher'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Collection from './pages/Collection'
import Search from './pages/Search'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/CheckoutNew'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import Account from './pages/Account'
import AccountDetails from './pages/account/Details'
import AccountOrders from './pages/account/Orders'
import AccountAddresses from './pages/account/Addresses'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'
import Gifts from './pages/Gifts'
import OrderDetail from './pages/OrderDetail'
import About from './pages/About'
import BagSingleColor from './pages/BagSingleColor'
import BagTwoColorways from './pages/BagTwoColorways'

function App() {
  const { checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <div className="min-h-screen" style={{backgroundColor: '#fcfcfb', minHeight: '100vh'}}>
          <Helmet>
            <title>Luxury Handbags - Premium Collection</title>
            <meta name="description" content="Discover our premium collection of luxury handbags crafted with finest materials" />
          </Helmet>
          
          <Header />
          <ScrollToTop />
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/gifts" element={<Gifts />} />
          <Route path="/about" element={<About />} />
          <Route path="/bag/single" element={<BagSingleColor />} />
          <Route path="/bag/two-colorways" element={<BagTwoColorways />} />
          <Route path="/collections/:slug" element={<Collection />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-failed" element={<PaymentFailed />} />
          <Route path="/orders/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/details" element={<ProtectedRoute><AccountDetails /></ProtectedRoute>} />
          <Route path="/account/orders" element={<ProtectedRoute><AccountOrders /></ProtectedRoute>} />
          <Route path="/account/addresses" element={<ProtectedRoute><AccountAddresses /></ProtectedRoute>} />
          
          {/* Redirect old profile routes to account routes */}
          <Route path="/profile/orders" element={<Navigate to="/account/orders" replace />} />
          <Route path="/profile/details" element={<Navigate to="/account/details" replace />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute adminOnly>
              <AdminLayout><AdminDashboard /></AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute adminOnly>
              <AdminLayout><AdminProducts /></AdminLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
        </div>
      </CurrencyProvider>
    </ErrorBoundary>
  )
}

export default App