import { Link } from 'react-router-dom'
import { useWishlistStore } from '../store/wishlistStore'
import { useModalStore } from '../store/modalStore'
import BaseModal from './BaseModal'

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WishlistModal({ isOpen, onClose }: WishlistModalProps) {
  const { items, removeItem, clearWishlist } = useWishlistStore()

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
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
                      <Link to={`/products/${item.id}`} onClick={onClose}>
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
    </BaseModal>
  )
}