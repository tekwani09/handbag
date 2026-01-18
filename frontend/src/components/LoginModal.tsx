import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import BaseModal from './BaseModal'
import { bgClasses } from '../styles/colors'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  
  const { login, register, isLoading, user } = useAuthStore()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    let success = false
    if (isLogin) {
      success = await login(formData.email, formData.password)
    } else {
      success = await register(formData.firstName, formData.lastName, formData.email, formData.password)
    }
    
    if (success) {
      setShowWelcome(true)
      setFormData({ firstName: '', lastName: '', email: '', password: '' })
    } else {
      setError(isLogin ? 'Invalid email or password' : 'Registration failed')
    }
  }

  const handleClose = () => {
    setShowWelcome(false)
    setIsLogin(true)
    onClose()
  }

  return (
    <BaseModal isOpen={isOpen} onClose={handleClose}>
      <section className={`min-h-[calc(100vh-4rem)] flex flex-col w-full ${bgClasses.modal} transition-opacity sticky lg:static top-16 z-[1] xl:px-8 md:px-6 px-4`}>
            {showWelcome ? (
              <div className="flex flex-col min-h-[calc(100vh-4rem)] w-full">
                <h2 className="text-lg hidden lg:block xl:my-8 md:my-6 my-4">Account</h2>
                <div className="flex flex-1 flex-col gap-0 mt-4 w-full md:mt-6 lg:mt-0">
                  <div className="text-sm mb-6">Your account is now logged in.</div>
                  <div className="flex-1"></div>
                  <div className="mt-6 w-full space-y-2">
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex size-5 flex-none items-center justify-center">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.42445 17.0284H4.05579C3.99913 17.0214 3.94164 17.0266 3.88712 17.0435C3.8326 17.0604 3.7823 17.0887 3.73954 17.1265C3.69678 17.1643 3.66254 17.2108 3.63909 17.2628C3.61564 17.3149 3.60352 17.3713 3.60352 17.4284C3.60352 17.4855 3.61564 17.5419 3.63909 17.5939C3.66254 17.646 3.69678 17.6925 3.73954 17.7303C3.7823 17.7681 3.8326 17.7964 3.88712 17.8133C3.94164 17.8302 3.99913 17.8354 4.05579 17.8284H6.42445C6.48111 17.8354 6.5386 17.8302 6.59312 17.8133C6.64764 17.7964 6.69794 17.7681 6.7407 17.7303C6.78346 17.6925 6.8177 17.646 6.84115 17.5939C6.8646 17.5419 6.87672 17.4855 6.87672 17.4284C6.87672 17.3713 6.8646 17.3149 6.84115 17.2628C6.8177 17.2108 6.78346 17.1643 6.7407 17.1265C6.69794 17.0887 6.64764 17.0604 6.59312 17.0435C6.5386 17.0266 6.48111 17.0214 6.42445 17.0284Z" fill="currentColor" fillOpacity="0.9"></path>
                          <path d="M5.5231 13.1285C5.48555 13.0913 5.44104 13.0619 5.39213 13.0419H5.38608C5.3396 13.0233 5.29003 13.0138 5.23999 13.0137C5.18997 13.0139 5.14043 13.0235 5.0939 13.0419H5.08786C5.03894 13.0619 4.99444 13.0913 4.95688 13.1285L3.60681 14.4786C3.54626 14.5562 3.51618 14.6532 3.52225 14.7514C3.52833 14.8497 3.57013 14.9423 3.63978 15.0118C3.70943 15.0813 3.80211 15.123 3.90034 15.1289C3.99857 15.1348 4.09557 15.1045 4.17303 15.0438L4.84001 14.3768V15.9949C4.83303 16.0516 4.83817 16.1091 4.85508 16.1636C4.87199 16.2181 4.90029 16.2684 4.93811 16.3112C4.97592 16.3539 5.02239 16.3882 5.07444 16.4116C5.12648 16.435 5.18291 16.4472 5.23999 16.4472C5.29707 16.4472 5.35351 16.435 5.40555 16.4116C5.45759 16.3882 5.50406 16.3539 5.54187 16.3112C5.57969 16.2684 5.60799 16.2181 5.6249 16.1636C5.64181 16.1091 5.64695 16.0516 5.63997 15.9949V14.3768L6.30695 15.0438C6.38451 15.1036 6.48118 15.1331 6.57889 15.1268C6.67661 15.1205 6.76868 15.0788 6.83792 15.0096C6.90716 14.9403 6.94882 14.8483 6.95513 14.7505C6.96143 14.6528 6.93194 14.5562 6.87216 14.4786L5.5231 13.1285Z" fill="currentColor" fillOpacity="0.9"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-light">Track your orders</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex size-5 flex-none items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" className="h-5 w-5" fill="none">
                          <path d="M16.25 7.17118H14.6083C14.7765 7.09345 14.9406 7.00723 15.1 6.91285C16.1458 6.30035 16.7458 5.45451 16.7458 4.60035C16.7425 4.37885 16.6939 4.16039 16.603 3.95836C16.5121 3.75634 16.3809 3.57504 16.2174 3.42558C16.0539 3.27613 15.8615 3.16168 15.6522 3.08927C15.4428 3.01686 15.2209 2.98802 15 3.00451C12.9375 3.00451 10.8333 5.68368 10 6.84201C9.16667 5.68368 7.08333 3.00451 5 3.00451C4.7791 2.98802 4.55715 3.01686 4.3478 3.08927C4.13845 3.16168 3.94612 3.27613 3.78261 3.42558C3.61911 3.57504 3.48789 3.75634 3.39701 3.95836C3.30614 4.16039 3.25753 4.37885 3.25417 4.60035C3.25417 5.45451 3.85417 6.30035 4.92083 6.91285C5.07345 7.00662 5.23058 7.09283 5.39167 7.17118H3.75C3.41848 7.17118 3.10054 7.30288 2.86612 7.5373C2.6317 7.77172 2.5 8.08966 2.5 8.42118V9.25451C2.50072 9.51241 2.5812 9.76376 2.73039 9.97412C2.87958 10.1845 3.09019 10.3435 3.33333 10.4295V15.0878C3.33333 15.8614 3.64062 16.6033 4.18761 17.1502C4.73459 17.6972 5.47645 18.0045 6.25 18.0045H13.75C14.5235 18.0045 15.2654 17.6972 15.8124 17.1502C16.3594 16.6033 16.6667 15.8614 16.6667 15.0878V10.4295C16.9098 10.3435 17.1204 10.1845 17.2696 9.97412C17.4188 9.76376 17.4993 9.51241 17.5 9.25451V8.42118C17.5 8.08966 17.3683 7.77172 17.1339 7.5373C16.8995 7.30288 16.5815 7.17118 16.25 7.17118Z" fill="currentColor"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-light">Collect points as you shop & receive a birthday treat</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="inline-flex size-5 flex-none items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" fill="none" className="h-5 w-5">
                          <path d="M9.46536 2.61504C9.67723 2.16107 10.3228 2.16107 10.5346 2.61504L12.6567 7.16193C12.7967 7.46203 13.038 7.70326 13.3381 7.84332L17.885 9.96536C18.3389 10.1772 18.3389 10.8228 17.885 11.0346L13.3381 13.1567C13.038 13.2967 12.7967 13.538 12.6567 13.8381L10.5346 18.385C10.3228 18.8389 9.67723 18.8389 9.46536 18.385L7.34332 13.8381C7.20326 13.538 6.96203 13.2967 6.66193 13.1567L2.11504 11.0346C1.66107 10.8228 1.66107 10.1772 2.11504 9.96536L6.66193 7.84332C6.96203 7.70326 7.20326 7.46203 7.34332 7.16193L9.46536 2.61504Z" stroke="currentColor" strokeWidth="0.82" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <span className="text-sm font-light">View your HEGĒTT Insider perks & rewards</span>
                    </div>
                  </div>
                  <div className={`sticky bottom-0 ${bgClasses.modal} pt-6 xl:pb-8 md:pb-6 pb-4`}>
                    <Link 
                      to="/account"
                      onClick={handleClose}
                      className="relative hover:bg-transparent hover:text-inherit cursor-pointer text-sm transition-all inline-block py-4 px-6 text-white uppercase text-center bg-black border border-black w-full"
                    >
                      <div className="w-full transition-opacity">Go to my account</div>
                    </Link>
                    <button 
                      onClick={handleClose}
                      className="relative hover:bg-black hover:text-white cursor-pointer text-sm transition-all inline-block py-4 px-6 bg-transparent uppercase text-center border border-black w-full mt-4"
                    >
                      <div className="w-full transition-opacity">Continue Shopping</div>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-lg xl:my-8 md:my-6 my-4">{isLogin ? 'Sign in' : 'Create an account'}</h2>
            
            <div className="flex-1 contents">
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-0 w-full lg:mt-0 md:mt-6 mt-4">
                <div className="xl:space-y-8 lg:space-y-6 space-y-8">
                  {!isLogin && (
                    <div className="flex w-full sm:space-x-6 sm:space-y-0 space-y-8 flex-col sm:flex-row">
                      <div className="group relative flex-1">
                        <label className={`opacity-70 uppercase text-xs transition-all absolute left-0 pointer-events-none origin-left ${formData.firstName || focusedField === 'firstName' ? '-top-2 scale-95' : 'top-2'}`}>
                          First name<span>*</span>
                        </label>
                        <div className="flex w-full flex-col">
                          <input 
                            type="text" 
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            onFocus={() => setFocusedField('firstName')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-xs" 
                          />
                        </div>
                      </div>
                      <div className="group relative flex-1">
                        <label className={`opacity-70 uppercase text-xs transition-all absolute left-0 pointer-events-none origin-left ${formData.lastName || focusedField === 'lastName' ? '-top-2 scale-95' : 'top-2'}`}>
                          Last name<span>*</span>
                        </label>
                        <div className="flex w-full flex-col">
                          <input 
                            type="text" 
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            onFocus={() => setFocusedField('lastName')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-xs" 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {!isLogin ? (
                    <div className="flex w-full sm:space-x-6 sm:space-y-0 space-y-8 flex-col sm:flex-row">
                      <div className="group relative flex-1">
                        <label className={`opacity-70 uppercase text-xs transition-all absolute left-0 pointer-events-none origin-left ${formData.email || focusedField === 'email' ? '-top-2 scale-95' : 'top-2'}`}>
                          Email<span>*</span>
                        </label>
                        <div className="flex w-full flex-col">
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-xs" 
                          />
                        </div>
                      </div>
                      <div className="group relative flex-1">
                        <label className={`opacity-70 uppercase text-xs transition-all absolute left-0 pointer-events-none origin-left ${formData.password || focusedField === 'password' ? '-top-2 scale-95' : 'top-2'}`}>
                          Password<span>*</span>
                        </label>
                        <div className="flex w-full flex-col">
                          <input 
                            type="password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-xs" 
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="group relative">
                        <label className={`opacity-70 uppercase text-xs transition-all absolute left-0 pointer-events-none origin-left ${formData.email || focusedField === 'email' ? '-top-2 scale-95' : 'top-2'}`}>
                          Email<span>*</span>
                        </label>
                        <div className="flex w-full flex-col">
                          <input 
                            type="email" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-xs" 
                          />
                        </div>
                      </div>
                      <div className="group relative">
                        <label className={`opacity-70 uppercase text-xs transition-all absolute left-0 pointer-events-none origin-left ${formData.password || focusedField === 'password' ? '-top-2 scale-95' : 'top-2'}`}>
                          Password<span>*</span>
                        </label>
                        <div className="flex w-full flex-col">
                          <input 
                            type="password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            onFocus={() => setFocusedField('password')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-xs" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {!isLogin && (
                    <div className="group">
                      <div className="flex flex-row lg:max-w-sm items-center space-x-4">
                        <input className="cursor-pointer h-4 mr-0" type="checkbox" id="accepts-marketing" />
                        <label htmlFor="accepts-marketing" className="cursor-pointer -mt-[0.13rem] text-sm">
                          <span className="space-x-1.5">
                            <span>Subscribe to our newsletter for updates and exclusive offers</span>
                            <a className="underline transition-opacity hover:opacity-60" href="/privacy-policy">Privacy policy</a>
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <button type="button" className="relative text-sm cursor-pointer transition-all mt-4">
                      <div className="underline text-xs">Forgot your password?</div>
                    </button>
                  )}
                </div>

                <div className="flex-1"></div>

                {error && (
                  <div className="text-red-600 text-sm mb-4">{error}</div>
                )}

                {/* Trust Signals */}
                <div className="login-trust-signal mt-6 w-full space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="inline-flex size-5 flex-none items-center justify-center">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.42445 17.0284H4.05579C3.99913 17.0214 3.94164 17.0266 3.88712 17.0435C3.8326 17.0604 3.7823 17.0887 3.73954 17.1265C3.69678 17.1643 3.66254 17.2108 3.63909 17.2628C3.61564 17.3149 3.60352 17.3713 3.60352 17.4284C3.60352 17.4855 3.61564 17.5419 3.63909 17.5939C3.66254 17.646 3.69678 17.6925 3.73954 17.7303C3.7823 17.7681 3.8326 17.7964 3.88712 17.8133C3.94164 17.8302 3.99913 17.8354 4.05579 17.8284H6.42445C6.48111 17.8354 6.5386 17.8302 6.59312 17.8133C6.64764 17.7964 6.69794 17.7681 6.7407 17.7303C6.78346 17.6925 6.8177 17.646 6.84115 17.5939C6.8646 17.5419 6.87672 17.4855 6.87672 17.4284C6.87672 17.3713 6.8646 17.3149 6.84115 17.2628C6.8177 17.2108 6.78346 17.1643 6.7407 17.1265C6.69794 17.0887 6.64764 17.0604 6.59312 17.0435C6.5386 17.0266 6.48111 17.0214 6.42445 17.0284Z" fill="currentColor" fillOpacity="0.9"></path>
                        <path d="M5.5231 13.1285C5.48555 13.0913 5.44104 13.0619 5.39213 13.0419H5.38608C5.3396 13.0233 5.29003 13.0138 5.23999 13.0137C5.18997 13.0139 5.14043 13.0235 5.0939 13.0419H5.08786C5.03894 13.0619 4.99444 13.0913 4.95688 13.1285L3.60681 14.4786C3.54626 14.5562 3.51618 14.6532 3.52225 14.7514C3.52833 14.8497 3.57013 14.9423 3.63978 15.0118C3.70943 15.0813 3.80211 15.123 3.90034 15.1289C3.99857 15.1348 4.09557 15.1045 4.17303 15.0438L4.84001 14.3768V15.9949C4.83303 16.0516 4.83817 16.1091 4.85508 16.1636C4.87199 16.2181 4.90029 16.2684 4.93811 16.3112C4.97592 16.3539 5.02239 16.3882 5.07444 16.4116C5.12648 16.435 5.18291 16.4472 5.23999 16.4472C5.29707 16.4472 5.35351 16.435 5.40555 16.4116C5.45759 16.3882 5.50406 16.3539 5.54187 16.3112C5.57969 16.2684 5.60799 16.2181 5.6249 16.1636C5.64181 16.1091 5.64695 16.0516 5.63997 15.9949V14.3768L6.30695 15.0438C6.38451 15.1036 6.48118 15.1331 6.57889 15.1268C6.67661 15.1205 6.76868 15.0788 6.83792 15.0096C6.90716 14.9403 6.94882 14.8483 6.95513 14.7505C6.96143 14.6528 6.93194 14.5562 6.87216 14.4786L5.5231 13.1285Z" fill="currentColor" fillOpacity="0.9"></path>
                        <path d="M19.9488 6.7926C19.9159 6.7839 19.882 6.7795 19.848 6.7795C19.8323 6.77857 19.8165 6.77857 19.8007 6.7795C19.7543 6.7795 19.709 6.7795 19.6627 6.7795H17.2285V4.5005C17.2285 4.1932 17.1066 3.89844 16.8896 3.68086C16.6726 3.46328 16.3782 3.34064 16.0709 3.33984H3.45678C3.14904 3.34011 2.85398 3.46248 2.63637 3.68009C2.41876 3.89769 2.29639 4.19276 2.29612 4.5005V10.1799H0.403006C0.296122 10.1799 0.193616 10.2223 0.118038 10.2979C0.0424596 10.3735 0 10.476 0 10.5829V20.2631C0 20.3699 0.0424596 20.4725 0.118038 20.548C0.193616 20.6236 0.296122 20.6661 0.403006 20.6661H10.0832C10.1901 20.6661 10.2926 20.6236 10.3682 20.548C10.4438 20.4725 10.4862 20.3699 10.4862 20.2631V15.8209H17.8955C17.9887 16.3702 18.2733 16.8687 18.6989 17.2282C19.1246 17.5877 19.6637 17.7849 20.2208 17.7849C20.7779 17.7849 21.3171 17.5877 21.7427 17.2282C22.1683 16.8687 22.4529 16.3702 22.5462 15.8209H22.8484C23.1559 15.8207 23.4507 15.6984 23.6681 15.481C23.8855 15.2636 24.0078 14.9688 24.0081 14.6613V11.1168C24.0116 10.014 23.593 8.95165 22.8382 8.14758C22.0835 7.34352 21.0496 6.85872 19.9488 6.7926ZM3.09609 4.5005C3.09609 4.40484 3.13409 4.3131 3.20174 4.24545C3.26938 4.17781 3.36112 4.13981 3.45678 4.13981H16.0719C16.1668 4.14138 16.2573 4.17998 16.3241 4.24737C16.3909 4.31476 16.4288 4.4056 16.4295 4.5005V11.809H10.4781V10.5798C10.4781 10.473 10.4357 10.3705 10.3601 10.2949C10.2845 10.2193 10.182 10.1768 10.0751 10.1768H3.09609V4.5005ZM4.48948 10.9798H5.99068V11.4765H4.48948V10.9798ZM9.6802 19.8601H0.799967V10.9798H3.68952V11.8745C3.68952 11.9814 3.73198 12.0839 3.80756 12.1595C3.88313 12.235 3.98564 12.2775 4.09252 12.2775H6.39369C6.50057 12.2775 6.60308 12.235 6.67865 12.1595C6.75423 12.0839 6.79669 11.9814 6.79669 11.8745V10.9798H9.68624V19.8601H9.6802ZM10.4802 15.024V12.609H16.4245V15.021H10.4781L10.4802 15.024ZM23.199 11.1199V11.81H20.251V7.63085C21.0762 7.76778 21.8257 8.19354 22.3659 8.8321C22.9061 9.47066 23.2018 10.2804 23.2 11.1168L23.199 11.1199ZM20.2148 16.9856C19.9059 16.9856 19.604 16.894 19.3472 16.7224C19.0904 16.5508 18.8902 16.3069 18.772 16.0216C18.6538 15.7362 18.6229 15.4222 18.6831 15.1193C18.7434 14.8164 18.8921 14.5381 19.1105 14.3197C19.3289 14.1013 19.6072 13.9526 19.9101 13.8923C20.213 13.8321 20.527 13.863 20.8124 13.9812C21.0977 14.0994 21.3416 14.2996 21.5132 14.5564C21.6848 14.8132 21.7764 15.1151 21.7764 15.424C21.7751 15.8375 21.61 16.2336 21.3174 16.5257C21.0247 16.8178 20.6283 16.9821 20.2148 16.9826V16.9856ZM22.8393 15.023H22.5371C22.4439 14.4737 22.1592 13.9752 21.7336 13.6157C21.308 13.2562 20.7689 13.059 20.2117 13.059C19.6546 13.059 19.1155 13.2562 18.6899 13.6157C18.2643 13.9752 17.9796 14.4737 17.8864 15.023H17.2285V7.57946H19.445V12.208C19.445 12.3149 19.4875 12.4174 19.5631 12.493C19.6386 12.5685 19.7411 12.611 19.848 12.611H23.2V14.6603C23.2 14.7557 23.1621 14.8472 23.0947 14.9146C23.0272 14.9821 22.9357 15.02 22.8404 15.02L22.8393 15.023Z" fill="currentColor" fillOpacity="0.9"></path>
                      </svg>
                    </div>
                    <span className="whitespace-pre-wrap inherit tracking-normal normal-case inherit text-sm font-light">Track your orders</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="inline-flex size-5 flex-none items-center justify-center">
                      <svg className="h-5 w-5" viewBox="0 0 6.827 6.827" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.96 2h5.013v1.05H.853V2H.96zm4.8.213H1.067v.624H5.76v-.624z" fill="currentColor" fillOpacity="0.9"></path>
                        <path d="M1.306 2.837H5.627V5.79H1.2V2.837h.106zm4.108.213h-4v2.525h4V3.05z" fill="currentColor" fillOpacity="0.9"></path>
                        <path d="M3.52 2.944v2.738h-.213V2.944z" fill="currentColor" fillOpacity="0.9"></path>
                        <path d="M1.306 4.206H5.52v.213H1.306zM3.307 2.944v-.838h.213v.838z" fill="currentColor" fillOpacity="0.9"></path>
                        <path d="M3.307 2.105c.006-.561.213-.864.443-.992a.537.537 0 0 1 .524-.012c.154.089.233.258.147.46-.087.203-.369.444-.974.646l-.141.047.001-.149zm.546-.806c-.153.085-.292.285-.326.654.435-.164.638-.335.698-.476.037-.085.005-.156-.058-.192-.079-.046-.2-.05-.314.014z" fill="currentColor" fillOpacity="0.9"></path>
                        <path d="M3.3 1.953c-.034-.369-.173-.569-.326-.654-.115-.063-.236-.06-.315-.014-.062.036-.094.107-.057.192.06.14.263.312.698.476zm-.223-.84c.23.128.437.431.443.992l.001.149-.141-.047c-.606-.202-.887-.443-.974-.647-.086-.201-.007-.37.147-.46.137-.08.339-.089.524.013z" fill="currentColor" fillOpacity="0.9"></path>
                      </svg>
                    </div>
                    <span className="whitespace-pre-wrap inherit tracking-normal normal-case inherit text-sm font-light">Collect points as you shop & receive a birthday treat</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="inline-flex size-5 flex-none items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" fill="none" className="h-5 w-5">
                        <path d="M9.46536 2.61504C9.67723 2.16107 10.3228 2.16107 10.5346 2.61504L12.6567 7.16193C12.7967 7.46203 13.038 7.70326 13.3381 7.84332L17.885 9.96536C18.3389 10.1772 18.3389 10.8228 17.885 11.0346L13.3381 13.1567C13.038 13.2967 12.7967 13.538 12.6567 13.8381L10.5346 18.385C10.3228 18.8389 9.67723 18.8389 9.46536 18.385L7.34332 13.8381C7.20326 13.538 6.96203 13.2967 6.66193 13.1567L2.11504 11.0346C1.66107 10.8228 1.66107 10.1772 2.11504 9.96536L6.66193 7.84332C6.96203 7.70326 7.20326 7.46203 7.34332 7.16193L9.46536 2.61504Z" stroke="currentColor" strokeWidth="0.82" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <span className="whitespace-pre-wrap inherit tracking-normal normal-case inherit text-sm font-light">View your HEGĒTT Insider perks & rewards</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className={`sticky bottom-0 ${bgClasses.modal} pt-6 xl:pb-8 md:pb-6 pb-4`}>
                  <button type="submit" disabled={isLoading} className="relative hover:bg-transparent hover:text-inherit cursor-pointer text-sm transition-all inline-block py-4 px-6 text-white uppercase text-center bg-black border border-black w-full disabled:opacity-50">
                    <div className="transition-opacity w-full">{isLoading ? 'Loading...' : (isLogin ? 'Login' : 'Create new account')}</div>
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsLogin(!isLogin)}
                    className="relative hover:bg-black hover:text-white cursor-pointer text-sm transition-all inline-block py-4 px-6 bg-transparent uppercase text-center border border-black w-full mt-4"
                  >
                    <div className="transition-opacity w-full">{isLogin ? 'Create new account' : 'Login'}</div>
                  </button>
                </div>
              </form>
            </div>
              </>
            )}
          </section>
    </BaseModal>
  )
}