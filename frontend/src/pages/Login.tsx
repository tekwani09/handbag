import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../components/CountrySwitcher'

export default function Login() {
  const { selectedCountry } = useCurrency()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.parentElement?.classList.add('active-input')
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      e.target.parentElement?.classList.remove('active-input')
    }
  }

  useEffect(() => {
    // Set active state for inputs with values on mount
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        const input = document.querySelector(`input[name="${key}"]`)
        input?.parentElement?.classList.add('active-input')
      }
    })
  }, [formData])

  return (
    <div className="flex flex-col text-left align-middle transition-all transform h-screen overflow-auto bg-gray-50 xl2:max-w-[499px] xl:max-w-[419px] lg:max-w-[397px] w-screen max-w-none fixed right-0 top-0 z-50 shadow-lg">
      <div className="relative">
        {/* Header */}
        <div className="flex gap-2 justify-between items-center bg-gray-50 py-1.5 z-20 min-h-16 xl:px-8 md:px-6 px-4">
          <div>
            <div className="gap-4 hidden lg:flex sticky top-0">
              <div className="flex items-center group -ml-2">
                <a className="py-3 px-1.5 xl:px-2 text-sm whitespace-nowrap flex-none transition-opacity group-hover:opacity-70 hover:!opacity-100" href="/change-locale">
                  Ship to: 
                  <img src="https://www.datocms-assets.com/17511/1624524968-india-flag.svg" alt="India flag" className="inline-block object-contain h-3 aspect-[3/2] mx-0.5 -translate-y-0.5" height="12" />
                  <span className="uppercase">IN</span>
                </a>
              </div>
              <div className="flex items-center relative gap-4">
                <Link to="/account" className="text-sm cursor-pointer transition-all relative items-center justify-center w-5 focus:ring-black/5 group p-1 -m-1 hidden lg:flex">
                  <span className="sr-only">Account</span>
                  <svg viewBox="0 0 16 16" fill="none" className="size-4 transition-all hover:fill-black hover:text-black">
                    <path d="M1.47583 12.5496V13.4632C1.47578 14.4051 2.14733 15.1982 2.98801 15.1982H12.9606C13.8014 15.1982 14.4526 14.4251 14.4526 13.4835V12.8762C14.4526 11.4065 13.5306 10.0862 12.2686 9.13715C11.006 8.1876 9.38965 7.59883 7.9743 7.59883C6.55042 7.59883 4.95497 8.13591 3.70212 9.01941C2.45008 9.90233 1.52762 11.1408 1.47583 12.5496Z" fill="currentColor" stroke="currentColor" strokeWidth="0.15" />
                    <path d="M4.43672 4.46151C4.43672 6.40574 6.02899 7.99801 7.97322 7.99801C9.91746 7.99801 11.5097 6.40574 11.5097 4.46151C11.5097 2.51727 9.91746 0.925 7.97322 0.925C6.02899 0.925 4.43672 2.51727 4.43672 4.46151Z" fill="currentColor" stroke="currentColor" strokeWidth="0.15" />
                  </svg>
                </Link>
                <button className="text-sm cursor-pointer relative flex items-center justify-center focus:ring-black/5 p-1 -m-1 group hover:opacity-80 transition-opacity duration-300">
                  <svg className="size-4 transition-all group-hover:fill-black group-hover:text-black" viewBox="0 0 20 21" fill="none">
                    <path d="M10 18.6584C9.84234 18.6586 9.68669 18.6238 9.54479 18.5568C9.18125 18.3842 0.625 14.2617 0.625 7.48646C0.625014 6.48217 0.930448 5.50044 1.50268 4.66538C2.07492 3.83033 2.88826 3.17946 3.83986 2.79507C4.79146 2.41068 5.8386 2.31004 6.84887 2.50585C7.85914 2.70167 8.78717 3.18517 9.51562 3.8952L10 4.36747L10.4844 3.8952C11.2128 3.18517 12.1409 2.70167 13.1511 2.50585C14.1614 2.31004 15.2085 2.41068 16.1601 2.79507C17.1117 3.17946 17.9251 3.83033 18.4973 4.66538C19.0696 5.50044 19.375 6.48217 19.375 7.48646C19.375 14.2363 10.8208 18.3821 10.4563 18.5568C10.314 18.624 10.158 18.6587 10 18.6584Z" fill="currentColor" />
                  </svg>
                </button>
                <button className="relative flex items-center justify-center focus:ring-black/5 group p-1 -m-1 hover:opacity-80 transition-opacity duration-300">
                  <svg viewBox="0 0 16 17" fill="none" className="size-4 transition-all hover:fill-black hover:text-black">
                    <path d="M14.9608 12.6439L14.2262 8.23828C14.1563 7.81209 13.937 7.42469 13.6075 7.14548C13.278 6.86626 12.8598 6.71346 12.4279 6.71444H11.4742C11.7794 6.1199 11.9267 5.45692 11.902 4.78909C11.8772 4.12126 11.6813 3.47099 11.333 2.90066C10.9847 2.33033 10.4956 1.85907 9.9128 1.53209C9.32997 1.20511 8.6729 1.03339 8.00461 1.03339C7.33632 1.03339 6.67925 1.20511 6.09641 1.53209C5.51358 1.85907 5.02455 2.33033 4.67623 2.90066C4.32791 3.47099 4.13198 4.12126 4.10725 4.78909C4.08252 5.45692 4.22982 6.1199 4.535 6.71444H3.57134C3.13933 6.71329 2.72102 6.86601 2.39138 7.14525C2.06173 7.42448 1.84229 7.81197 1.77237 8.23828L1.03845 12.6439C0.971003 13.0485 0.992478 13.4629 1.10138 13.8583C1.21029 14.2537 1.40401 14.6207 1.66909 14.9337C1.93416 15.2466 2.26422 15.4981 2.63632 15.6707C3.00842 15.8432 3.41363 15.9326 3.82378 15.9327H12.1755C12.5857 15.9327 12.991 15.8434 13.3632 15.6709C13.7354 15.4984 14.0655 15.2469 14.3307 14.9339C14.5958 14.6209 14.7896 14.2539 14.8986 13.8585C15.0075 13.463 15.0283 13.0485 14.9608 12.6439Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <h2 className="text-lg block lg:hidden">{isLogin ? 'Sign in' : 'Create an account'}</h2>
          </div>
          <div></div>
          <button className="relative hover:opacity-70 cursor-pointer transition-all inline-block uppercase text-left text-sm z-20 p-2 -m-2">
            <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
              <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round" />
              <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <section className="min-h-[calc(100vh-4rem)] flex flex-col w-full bg-gray-50 transition-opacity sticky lg:static top-16 z-[1] xl:px-8 md:px-6 px-4">
          <h2 className="text-lg lg:block hidden xl:my-8 md:my-6 my-4">{isLogin ? 'Sign in' : 'Create an account'}</h2>
          
          <div className="flex-1 contents">
            <form className="flex-1 flex flex-col gap-0 w-full lg:mt-0 md:mt-6 mt-4">
              <div className="xl:space-y-8 lg:space-y-6 space-y-8">
                {!isLogin && (
                  <div className="flex w-full sm:space-x-6 sm:space-y-0 space-y-8 flex-col sm:flex-row">
                    <div className="group relative flex-1">
                      <label className="opacity-70 uppercase text-sm transition-all absolute top-0 left-0 transform flex items-center h-full max-h-10 pointer-events-none origin-left group-[.active-input]:opacity-70 group-[.active-input]:-translate-y-[50%] group-[.active-input]:scale-95">
                        First name<span>*</span>
                      </label>
                      <input 
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full bg-transparent border-solid border-t-0 border-x-0 border-black placeholder-transparent text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-base md:text-sm" 
                      />
                    </div>
                    <div className="group relative flex-1">
                      <label className="opacity-70 uppercase text-sm transition-all absolute top-0 left-0 transform flex items-center h-full max-h-10 pointer-events-none origin-left group-[.active-input]:opacity-70 group-[.active-input]:-translate-y-[50%] group-[.active-input]:scale-95">
                        Last name<span>*</span>
                      </label>
                      <input 
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className="w-full bg-transparent border-solid border-t-0 border-x-0 border-black placeholder-transparent text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-base md:text-sm" 
                      />
                    </div>
                  </div>
                )}
                
                <div className={isLogin ? "space-y-8" : "flex w-full sm:space-x-6 sm:space-y-0 space-y-8 flex-col sm:flex-row"}>
                  <div className="group relative flex-1">
                    <label className="opacity-70 uppercase text-sm transition-all absolute top-0 left-0 transform flex items-center h-full max-h-10 pointer-events-none origin-left group-[.active-input]:opacity-70 group-[.active-input]:-translate-y-[50%] group-[.active-input]:scale-95">
                      Email<span>*</span>
                    </label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full bg-transparent border-solid border-t-0 border-x-0 border-black placeholder-transparent text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-base md:text-sm" 
                    />
                  </div>
                  <div className="group relative flex-1">
                    <label className="opacity-70 uppercase text-sm transition-all absolute top-0 left-0 transform flex items-center h-full max-h-10 pointer-events-none origin-left group-[.active-input]:opacity-70 group-[.active-input]:-translate-y-[50%] group-[.active-input]:scale-95">
                      Password<span>*</span>
                    </label>
                    <input 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      className="w-full bg-transparent border-solid border-t-0 border-x-0 border-black placeholder-transparent text-black outline-none focus:ring-0 focus:ring-transparent focus:border-black focus:shadow-none px-0 py-2 text-base md:text-sm" 
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
                    <div className="underline text-sm">Forgot your password?</div>
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
                  <span className="text-sm font-light">View your HEGĒTT Insider perks & rewards</span>
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
  )
}