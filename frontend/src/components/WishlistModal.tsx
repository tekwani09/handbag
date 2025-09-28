import { Link } from 'react-router-dom'
import { useWishlistStore } from '../store/wishlistStore'

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { items, removeItem, clearWishlist } = useWishlistStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20" onClick={onClose}></div>
      
      {/* Right Sidebar */}
      <div className="absolute top-0 right-0 h-screen w-[499px] max-w-[499px] bg-gray-50 shadow-lg flex flex-col">
        {/* Header */}
        <div className="flex min-h-16 items-center justify-between gap-2 bg-gray-50 py-1.5 px-4">
          <div className="flex items-center gap-4">
              <Link to="/account" className="text-sm cursor-pointer group relative -m-1 w-5 items-center justify-center p-1 hidden lg:flex hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 14 15" fill="none" className="size-4 transition-all hover:fill-black hover:text-black">
                  <path d="M0.475099 12.083L0.475049 12.083V12.0857V12.9966C0.475049 13.9384 1.14659 14.7315 1.98728 14.7315H11.9598C12.8007 14.7315 13.4518 13.9585 13.4518 13.0169V12.4096C13.4518 10.9399 12.5298 9.61961 11.2678 8.67054C10.0052 7.72099 8.38892 7.13221 6.97357 7.13221C5.54969 7.13221 3.95424 7.6693 2.70139 8.55279C1.44935 9.43572 0.526891 10.6742 0.475099 12.083ZM7.01346 7.90974H7.01405C8.23046 7.90974 9.66426 8.41929 10.7938 9.24645C11.9243 10.0743 12.735 11.2084 12.735 12.4501V13.0169C12.735 13.579 12.3693 13.9945 11.9801 13.9945H2.00753C1.59913 13.9945 1.25257 13.5803 1.25257 13.0169V12.2477C1.25257 11.0373 2.05214 9.94885 3.18222 9.16144C4.31118 8.37481 5.75534 7.89975 7.01346 7.90974Z" fill="currentColor" stroke="currentColor" strokeWidth="0.15"></path>
                  <path d="M3.43696 3.99489C3.43696 5.93913 5.02923 7.5314 6.97347 7.5314C8.91771 7.5314 10.51 5.93913 10.51 3.99489C10.51 2.05065 8.91771 0.458386 6.97347 0.458386C5.02923 0.458386 3.43696 2.05065 3.43696 3.99489ZM4.19424 3.99489C4.19424 2.45738 5.43596 1.21567 6.97347 1.21567C8.51098 1.21567 9.75269 2.45738 9.75269 3.99489C9.75269 5.5324 8.51098 6.77412 6.97347 6.77412C5.43596 6.77412 4.19424 5.5324 4.19424 3.99489Z" fill="currentColor" stroke="currentColor" strokeWidth="0.15"></path>
                </svg>
              </Link>
              <button className="text-sm cursor-pointer group relative -m-2 flex items-center justify-center p-2 lg:-m-1 lg:p-1 hover:opacity-80 transition-opacity">
                <svg className="size-4 transition-all group-hover:fill-black group-hover:text-black" viewBox="0 0 20 21" fill="none">
                  <path d="M10 18.6584C9.84234 18.6586 9.68669 18.6238 9.54479 18.5568C9.18125 18.3842 0.625 14.2617 0.625 7.48646C0.625014 6.48217 0.930448 5.50044 1.50268 4.66538C2.07492 3.83033 2.88826 3.17946 3.83986 2.79507C4.79146 2.41068 5.8386 2.31004 6.84887 2.50585C7.85914 2.70167 8.78717 3.18517 9.51562 3.8952L10 4.36747L10.4844 3.8952C11.2128 3.18517 12.1409 2.70167 13.1511 2.50585C14.1614 2.31004 15.2085 2.41068 16.1601 2.79507C17.1117 3.17946 17.9251 3.83033 18.4973 4.66538C19.0696 5.50044 19.375 6.48217 19.375 7.48646C19.375 14.2363 10.8208 18.3821 10.4563 18.5568C10.314 18.624 10.158 18.6587 10 18.6584Z"></path>
                </svg>
                <div className="rounded bg-yellow-200 px-1 py-0.5 text-black absolute -top-1 -right-0.5 text-xs leading-none lg:-right-1">
                  <span>{items.length}</span>
                </div>
              </button>
              <button className="group relative -m-2 flex items-center justify-center p-2 lg:-m-1 lg:p-1 hover:opacity-80 transition-opacity">
                <svg viewBox="0 0 16 17" fill="none" className="size-4 transition-all hover:fill-black hover:text-black">
                  <path d="M14.9608 12.6439L14.2262 8.23828C14.1563 7.81209 13.937 7.42469 13.6075 7.14548C13.278 6.86626 12.8598 6.71346 12.4279 6.71444H11.4742C11.7794 6.1199 11.9267 5.45692 11.902 4.78909C11.8772 4.12126 11.6813 3.47099 11.333 2.90066C10.9847 2.33033 10.4956 1.85907 9.9128 1.53209C9.32997 1.20511 8.6729 1.03339 8.00461 1.03339C7.33632 1.03339 6.67925 1.20511 6.09641 1.53209C5.51358 1.85907 5.02455 2.33033 4.67623 2.90066C4.32791 3.47099 4.13198 4.12126 4.10725 4.78909C4.08252 5.45692 4.22982 6.1199 4.535 6.71444H3.57134C3.13933 6.71329 2.72102 6.86601 2.39138 7.14525C2.06173 7.42448 1.84229 7.81197 1.77237 8.23828L1.03845 12.6439C0.971003 13.0485 0.992478 13.4629 1.10138 13.8583C1.21029 14.2537 1.40401 14.6207 1.66909 14.9337C1.93416 15.2466 2.26422 15.4981 2.63632 15.6707C3.00842 15.8432 3.41363 15.9326 3.82378 15.9327H12.1755C12.5857 15.9327 12.991 15.8434 13.3632 15.6709C13.7354 15.4984 14.0655 15.2469 14.3307 14.9339C14.5958 14.6209 14.7896 14.2539 14.8986 13.8585C15.0075 13.463 15.0283 13.0485 14.9608 12.6439Z" fill="currentColor"></path>
                </svg>
                <div className="rounded bg-yellow-200 px-1 py-0.5 text-black absolute -top-1 -right-0.5 text-xs leading-none lg:-right-1">
                  <span>2</span>
                </div>
              </button>
            </div>
          <h2 className="text-lg block lg:hidden">Wishlist</h2>
          <button onClick={onClose} className="relative hover:opacity-70 cursor-pointer transition-all inline-block uppercase text-left tracking-wide z-20 -m-2 p-2 text-xs">
            <div className="w-full transition-opacity space-x-1 flex items-center">
              <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
                <path d="M2 2L13.9987 13.9987" stroke="currentColor" strokeLinecap="round"></path>
                <path d="M14 2L2.00128 13.9987" stroke="currentColor" strokeLinecap="round"></path>
              </svg>
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-1 flex-col pt-0 pb-0">
            <div className="sticky top-16 z-10 bg-gray-50 pt-3">
              <h2 className="capitalize mb-6 text-lg xl:mx-8 md:mx-6 mx-4">Wishlist</h2>
            </div>
            
            {items.length > 0 ? (
              <ul className="xl:ml-8 md:ml-6 ml-4 xl:mr-8 md:mr-6 mr-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-6 p-2 px-0">
                    <div className="flex w-[121px] flex-col justify-center lg:w-[99px]">
                      <Link to={`/products/${item.id}`}>
                        <div className="group relative aspect-square overflow-hidden">
                          <img 
                            alt="" 
                            src={item.image || 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'} 
                            className="h-full w-full object-cover opacity-100 transition-opacity" 
                            style={{ width: '100%' }}
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="flex flex-auto flex-col justify-start gap-2 py-3">
                      <div className="flex justify-between">
                        <h3 className="capitalize font-light text-sm">{item.name}</h3>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="relative hover:opacity-70 cursor-pointer text-sm transition-all inline-block uppercase text-left tracking-wide -m-1 p-1"
                          >
                            <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 13" className="size-5">
                              <path d="M13.9998 3.10059H0.799805" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M4.40137 0.700195H10.4014" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M11.7975 2.7002V11.8202C11.7975 11.9475 11.7483 12.0696 11.6608 12.1596C11.5733 12.2496 11.4546 12.3002 11.3308 12.3002H3.86413C3.74036 12.3002 3.62166 12.2496 3.53414 12.1596C3.44663 12.0696 3.39746 11.9475 3.39746 11.8202V2.7002" stroke="currentColor" strokeLinecap="square" strokeLinejoin="round"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">Color variant</p>
                      <div className="mt-auto flex w-full items-center justify-between">
                        <div className="flex justify-center gap-4 align-baseline text-lg">
                          <span className="text-sm flex flex-wrap-reverse justify-center gap-x-2.5 gap-y-0.5">
                            <div>₹{item.price || '39,500'}</div>
                          </span>
                        </div>
                        <div>
                          <button className="relative hover:opacity-70 cursor-pointer text-sm transition-all inline-block px-0 py-0 uppercase text-left tracking-wide">
                            <div className="w-full transition-opacity">Move to bag</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                  <Link to="/products" onClick={onClose} className="text-sm uppercase tracking-wide underline hover:no-underline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
            
            <div className="flex-1"></div>
            
            {items.length > 0 && (
              <div className="sticky bottom-0 z-40 w-full border-t border-solid border-black/15 bg-gray-50 py-6">
                <div className="xl:ml-8 md:ml-6 ml-4 xl:mr-8 md:mr-6 mr-4">
                  <button className="relative hover:bg-black hover:text-white cursor-pointer transition-all inline-block px-6 bg-transparent uppercase text-center border border-black tracking-wide w-full py-3 text-sm">
                    <div className="w-full transition-opacity">Move all items to bag</div>
                  </button>
                  <div className="mt-6 flex justify-center space-x-10">
                    <button className="relative cursor-pointer transition-all flex items-center justify-center uppercase text-sm">
                      <div className="w-full transition-opacity">Share wishlist</div>
                    </button>
                    <button 
                      onClick={clearWishlist}
                      className="relative cursor-pointer transition-all flex items-center justify-center uppercase text-sm"
                    >
                      <div className="w-full transition-opacity">Clear wishlist</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}