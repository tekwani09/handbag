import { useState } from 'react'
import { Link } from 'react-router-dom'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLogin, setIsLogin] = useState(true)

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
              <form className="flex-1 flex flex-col gap-0 w-full lg:mt-0 md:mt-6 mt-4">
                <div className="xl:space-y-8 lg:space-y-6 space-y-8">
                  {!isLogin && (
                    <div className="flex w-full xs:space-x-6 xs:space-y-0 space-y-8 flex-col xs:flex-row">
                      <div className="group relative flex-1">
                        <label className="opacity-70 uppercase text-xs transition-all absolute top-0 left-0 transform flex items-center h-full max-h-10 pointer-events-none origin-left group-[.active-input]:opacity-70 group-[.active-input]:-translate-y-[50%] group-[.active-input]:scale-95">
                          First name<span>*</span>
                        </label>
                        <input 
                          type="text" 
                          className="w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black placeholder-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-base md:text-sm" 
                        />
                      </div>
                      <div className="group relative flex-1">
                        <label className="opacity-70 uppercase text-xs transition-all absolute top-0 left-0 transform flex items-center h-full max-h-10 pointer-events-none origin-left group-[.active-input]:opacity-70 group-[.active-input]:-translate-y-[50%] group-[.active-input]:scale-95">
                          Last name<span>*</span>
                        </label>
                        <input 
                          type="text" 
                          className="w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black placeholder-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-base md:text-sm" 
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className={isLogin ? "space-y-8" : "flex w-full xs:space-x-6 xs:space-y-0 space-y-8 flex-col xs:flex-row"}>
                    <div className="group relative flex-1">
                      <label className="opacity-70 uppercase text-xs transition-all absolute top-0 left-0 transform flex items-center h-full max-h-10 pointer-events-none origin-left group-[.active-input]:opacity-70 group-[.active-input]:-translate-y-[50%] group-[.active-input]:scale-95">
                        Email<span>*</span>
                      </label>
                      <input 
                        type="email" 
                        className="w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black placeholder-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-base md:text-sm" 
                      />
                    </div>
                    <div className="group relative flex-1">
                      <label className="opacity-70 uppercase text-xs transition-all absolute top-0 left-0 transform flex items-center h-full max-h-10 pointer-events-none origin-left group-[.active-input]:opacity-70 group-[.active-input]:-translate-y-[50%] group-[.active-input]:scale-95">
                        Password<span>*</span>
                      </label>
                      <input 
                        type="password" 
                        className="w-full bg-transparent border-solid border-t-0 border-x-0 border-b border-black placeholder-black text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-base md:text-sm" 
                      />
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

                {/* Trust Signals */}
                <div className="w-full space-y-2 pt-6">
                  <div className="flex space-x-4 items-center">
                    <div className="inline-flex items-center justify-center flex-none size-5">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M6.42445 17.0284H4.05579C3.99913 17.0214 3.94164 17.0266 3.88712 17.0435C3.8326 17.0604 3.7823 17.0887 3.73954 17.1265C3.69678 17.1643 3.66254 17.2108 3.63909 17.2628C3.61564 17.3149 3.60352 17.3713 3.60352 17.4284C3.60352 17.4855 3.61564 17.5419 3.63909 17.5939C3.66254 17.646 3.69678 17.6925 3.73954 17.7303C3.7823 17.7681 3.8326 17.7964 3.88712 17.8133C3.94164 17.8302 3.99913 17.8354 4.05579 17.8284H6.42445C6.48111 17.8354 6.5386 17.8302 6.59312 17.8133C6.64764 17.7964 6.69794 17.7681 6.7407 17.7303C6.78346 17.6925 6.8177 17.646 6.84115 17.5939C6.8646 17.5419 6.87672 17.4855 6.87672 17.4284C6.87672 17.3713 6.8646 17.3149 6.84115 17.2628C6.8177 17.2108 6.78346 17.1643 6.7407 17.1265C6.69794 17.0887 6.64764 17.0604 6.59312 17.0435C6.5386 17.0266 6.48111 17.0214 6.42445 17.0284Z" fill="currentColor" fillOpacity="0.9" />
                      </svg>
                    </div>
                    <span className="text-sm font-light">Track your orders</span>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="inline-flex items-center justify-center flex-none size-5">
                      <svg viewBox="0 0 20 21" className="w-5 h-5" fill="none">
                        <path d="M16.25 7.17118H14.6083C14.7765 7.09345 14.9406 7.00723 15.1 6.91285C16.1458 6.30035 16.7458 5.45451 16.7458 4.60035C16.7425 4.37885 16.6939 4.16039 16.603 3.95836C16.5121 3.75634 16.3809 3.57504 16.2174 3.42558C16.0539 3.27613 15.8615 3.16168 15.6522 3.08927C15.4428 3.01686 15.2209 2.98802 15 3.00451C12.9375 3.00451 10.8333 5.68368 10 6.84201C9.16667 5.68368 7.08333 3.00451 5 3.00451C4.7791 2.98802 4.55715 3.01686 4.3478 3.08927C4.13845 3.16168 3.94612 3.27613 3.78261 3.42558C3.61911 3.57504 3.48789 3.75634 3.39701 3.95836C3.30614 4.16039 3.25753 4.37885 3.25417 4.60035C3.25417 5.45451 3.85417 6.30035 4.92083 6.91285C5.07345 7.00662 5.23058 7.09283 5.39167 7.17118H3.75C3.41848 7.17118 3.10054 7.30288 2.86612 7.5373C2.6317 7.77172 2.5 8.08966 2.5 8.42118V9.25451C2.50072 9.51241 2.5812 9.76376 2.73039 9.97412C2.87958 10.1845 3.09019 10.3435 3.33333 10.4295V15.0878C3.33333 15.8614 3.64062 16.6033 4.18761 17.1502C4.73459 17.6972 5.47645 18.0045 6.25 18.0045H13.75C14.5235 18.0045 15.2654 17.6972 15.8124 17.1502C16.3594 16.6033 16.6667 15.8614 16.6667 15.0878V10.4295C16.9098 10.3435 17.1204 10.1845 17.2696 9.97412C17.4188 9.76376 17.4993 9.51241 17.5 9.25451V8.42118C17.5 8.08966 17.3683 7.77172 17.1339 7.5373C16.8995 7.30288 16.5815 7.17118 16.25 7.17118Z" fill="currentColor" />
                      </svg>
                    </div>
                    <span className="text-sm font-light">Collect points as you shop & receive a birthday treat</span>
                  </div>
                  <div className="flex space-x-4 items-center">
                    <div className="inline-flex items-center justify-center flex-none size-5">
                      <svg viewBox="0 0 20 21" fill="none" className="w-5 h-5">
                        <path d="M9.46536 2.61504C9.67723 2.16107 10.3228 2.16107 10.5346 2.61504L12.6567 7.16193C12.7967 7.46203 13.038 7.70326 13.3381 7.84332L17.885 9.96536C18.3389 10.1772 18.3389 10.8228 17.885 11.0346L13.3381 13.1567C13.038 13.2967 12.7967 13.538 12.6567 13.8381L10.5346 18.385C10.3228 18.8389 9.67723 18.8389 9.46536 18.385L7.34332 13.8381C7.20326 13.538 6.96203 13.2967 6.66193 13.1567L2.11504 11.0346C1.66107 10.8228 1.66107 10.1772 2.11504 9.96536L6.66193 7.84332C6.96203 7.70326 7.20326 7.46203 7.34332 7.16193L9.46536 2.61504Z" stroke="currentColor" strokeWidth="0.82" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-sm font-light">View your Strathberry Insider perks & rewards</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="sticky bottom-0 bg-gray-50 pt-6 xl:pb-8 md:pb-6 pb-4">
                  <button type="submit" className="relative hover:bg-transparent hover:text-inherit cursor-pointer text-sm transition-all inline-block py-4 px-6 text-white uppercase text-center bg-black border border-black w-full">
                    <div className="transition-opacity w-full">{isLogin ? 'Login' : 'Create new account'}</div>
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