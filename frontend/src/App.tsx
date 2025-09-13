import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Header from './components/Header'

import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import { CurrencyProvider } from './components/CountrySwitcher'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Wishlist from './pages/Wishlist'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/Products'
import Account from './pages/Account'
import AccountDetails from './pages/account/Details'
import AccountOrders from './pages/account/Orders'
import AccountAddresses from './pages/account/Addresses'

function App() {
  return (
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
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/details" element={<ProtectedRoute><AccountDetails /></ProtectedRoute>} />
          <Route path="/account/orders" element={<ProtectedRoute><AccountOrders /></ProtectedRoute>} />
          <Route path="/account/addresses" element={<ProtectedRoute><AccountAddresses /></ProtectedRoute>} />
          
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
        

      </div>
    </CurrencyProvider>
  )
}

export default App