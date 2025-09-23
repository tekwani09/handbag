import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  
  const { login, register, isLoading } = useAuthStore()
  
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
      onClose()
      setFormData({ firstName: '', lastName: '', email: '', password: '' })
    } else {
      setError(isLogin ? 'Invalid email or password' : 'Registration failed')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="flex flex-col text-left align-middle transition-all transform h-screen overflow-auto bg-gray-50 xl2:max-w-[499px] xl:max-w-[419px] lg:max-w-[397px] w-screen max-w-none absolute right-0 top-0 shadow-lg">
        <div className="relative">
          {/* Header */}
          <div className="flex gap-2 justify-between items-center bg-gray-50 py-1.5 z-20 min-h-16 xl:px-8 md:px-6 px-4">
            <div></div>
            <div></div>
            <button onClick={onClose} className="relative hover:opacity-70 cursor-pointer transition-all inline-block uppercase text-left text-xs z-20 p-2 -m-2">
              <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
                <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round" />
                <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Main Content */}
          <section className="min-h-[calc(100vh-4rem)] flex flex-col w-full bg-gray-50 transition-opacity sticky lg:static top-16 z-[1] xl:px-8 md:px-6 px-4">
            <h2 className="text-lg xl:my-8 md:my-6 my-4">{isLogin ? 'Sign in' : 'Create an account'}</h2>
            
            <div className="flex-1 contents">
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-0 w-full lg:mt-0 md:mt-6 mt-4">
                <div className="xl:space-y-8 lg:space-y-6 space-y-8">
                  {!isLogin && (
                    <div className="flex w-full xs:space-x-6 xs:space-y-0 space-y-8 flex-col xs:flex-row">
                      <div className="group relative flex-1">
                        <input 
                          type="text" 
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required
                          className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 pt-6 text-base md:text-sm" 
                        />
                        <label className="opacity-70 uppercase text-xs transition-all absolute top-2 left-0 pointer-events-none origin-left peer-focus:top-0 peer-focus:scale-95 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-95">
                          First name<span>*</span>
                        </label>
                      </div>
                      <div className="group relative flex-1">
                        <input 
                          type="text" 
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          required
                          className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 pt-6 text-base md:text-sm" 
                        />
                        <label className="opacity-70 uppercase text-xs transition-all absolute top-2 left-0 pointer-events-none origin-left peer-focus:top-0 peer-focus:scale-95 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-95">
                          Last name<span>*</span>
                        </label>
                      </div>
                    </div>
                  )}
                  
                  <div className={isLogin ? "space-y-8" : "flex w-full xs:space-x-6 xs:space-y-0 space-y-8 flex-col xs:flex-row"}>
                    <div className="group relative flex-1">
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 pt-6 text-base md:text-sm" 
                      />
                      <label className="opacity-70 uppercase text-xs transition-all absolute top-2 left-0 pointer-events-none origin-left peer-focus:top-0 peer-focus:scale-95 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-95">
                        Email<span>*</span>
                      </label>
                    </div>
                    <div className="group relative flex-1">
                      <input 
                        type="password" 
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        className="peer w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 pt-6 text-base md:text-sm" 
                      />
                      <label className="opacity-70 uppercase text-xs transition-all absolute top-2 left-0 pointer-events-none origin-left peer-focus:top-0 peer-focus:scale-95 peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-95">
                        Password<span>*</span>
                      </label>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="group">
                      <div className="flex flex-row lg:max-w-sm items-center space-x-4">
                        <input className="cursor-pointer h-4 mr-0" type="checkbox" id="accepts-marketing" />
                        <label htmlFor="accepts-marketing" className="cursor-pointer -mt-[0.13rem] text-sm">
                          <span className="space-x-1.5">
                            <span>Subscribe to our newsletter & enjoy an exclusive 10% off your first full price order</span>
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

                {/* Buttons */}
                <div className="sticky bottom-0 bg-gray-50 pt-6 xl:pb-8 md:pb-6 pb-4">
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
          </section>
        </div>
      </div>
    </div>
  )
}