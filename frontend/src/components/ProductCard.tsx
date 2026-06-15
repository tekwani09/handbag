import { Link } from 'react-router-dom'
import { useCurrency } from './CountrySwitcher'
import { getProductPrice, formatPrice } from '../utils/currency'

interface ProductCardProps {
  product: any
  allProducts?: any[]
}

export default function ProductCard({ product, allProducts = [] }: ProductCardProps) {
  const { selectedCountry } = useCurrency()

  return (
    <div className="group product_card_plp product-card relative flex flex-col justify-between gap-0">
      <Link className="relative block" to={`/products/${product.id}`}>
        <div className="relative">
          <div className="group relative aspect-[4/5] overflow-hidden">
            {product.images?.[0] ? (
              <>
                <img
                  alt={product.name}
                  className="h-full w-full object-cover opacity-100 transition-opacity hover-enabled:group-hover:opacity-0"
                  src={product.images[0]}
                  style={{ aspectRatio: '2400 / 3000' }}
                />
                {product.images[1] && (
                  <div className="absolute top-0 right-0 bottom-0 left-0 z-10 w-full object-cover opacity-0 transition-opacity hover-enabled:group-hover:opacity-100">
                    <img
                      alt={product.name}
                      className="h-full w-full object-cover"
                      src={product.images[1]}
                      style={{ aspectRatio: '2400 / 3000' }}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-sm font-light">
                  {product.name}
                </span>
              </div>
            )}
          </div>
          
          {/* Wishlist Button */}
          <div className="absolute top-3 right-3 z-10 transition-opacity lg:top-5 lg:right-5 block opacity-100">
            <button title="Add to wishlist" aria-label="Add to wishlist" className="relative text-sm cursor-pointer transition-all group/wishlist-button -m-2 p-2">
              <div className="button-content w-full transition-opacity display-inherit">
                <svg className="size-4 transition-all group-hover/wishlist-button:scale-110 group-hover/wishlist-button:fill-black group-hover/wishlist-button:text-black" fill="none" viewBox="0 0 20 21">
                  <path d="M10 18.6584C9.84234 18.6586 9.68669 18.6238 9.54479 18.5568C9.18125 18.3842 0.625 14.2617 0.625 7.48646C0.625014 6.48217 0.930448 5.50044 1.50268 4.66538C2.07492 3.83033 2.88826 3.17946 3.83986 2.79507C4.79146 2.41068 5.8386 2.31004 6.84887 2.50585C7.85914 2.70167 8.78717 3.18517 9.51562 3.8952L10 4.36747L10.4844 3.8952C11.2128 3.18517 12.1409 2.70167 13.1511 2.50585C14.1614 2.31004 15.2085 2.41068 16.1601 2.79507C17.1117 3.17946 17.9251 3.83033 18.4973 4.66538C19.0696 5.50044 19.375 6.48217 19.375 7.48646C19.375 14.2363 10.8208 18.3821 10.4563 18.5568C10.314 18.624 10.158 18.6587 10 18.6584Z"></path>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10 4.36747L10.4844 3.8952C11.2128 3.18517 12.1409 2.70167 13.1511 2.50585C14.1614 2.31004 15.2085 2.41068 16.1601 2.79507C17.1117 3.17946 17.9251 3.83033 18.4973 4.66538C19.0696 5.50044 19.375 6.48217 19.375 7.48646C19.375 14.2363 10.8208 18.3821 10.4563 18.5568C10.314 18.624 10.158 18.6587 10 18.6584C9.84234 18.6586 9.68669 18.6238 9.54479 18.5568C9.18125 18.3842 0.625 14.2617 0.625 7.48646C0.625014 6.48217 0.930448 5.50044 1.50268 4.66538C2.07492 3.83033 2.88826 3.17946 3.83986 2.79507C4.79146 2.41068 5.8386 2.31004 6.84887 2.50585C7.85914 2.70167 8.78717 3.18517 9.51562 3.8952L10 4.36747ZM1.875 7.48648C1.87501 10.3296 3.67984 12.7383 5.76868 14.5543C7.64788 16.188 9.57137 17.1772 10.0002 17.3885C10.4359 17.1723 12.3558 16.1781 14.2314 14.5447C16.3215 12.7245 18.125 10.3163 18.125 7.48648C18.125 6.73655 17.8971 6.00076 17.4662 5.37198C17.035 4.74281 16.4189 4.2477 15.692 3.95409C14.9648 3.66037 14.163 3.583 13.389 3.73302C12.6152 3.88299 11.9087 4.25254 11.357 4.7902C11.357 4.79024 11.357 4.79016 11.357 4.7902L10 6.11328L8.64313 4.79033C8.64309 4.79029 8.64318 4.79037 8.64313 4.79033C8.09147 4.25267 7.38477 3.88299 6.61101 3.73302C5.83705 3.583 5.03517 3.66037 4.30803 3.95409C3.58115 4.2477 2.96496 4.74281 2.53381 5.37198C2.10293 6.00075 1.87501 6.73656 1.875 7.48648Z" fill="currentColor"></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="mt-2 lg:mt-4">
          <div className="mx-2 lg:mx-2">
            <div className="flex flex-col flex-wrap items-baseline justify-between gap-x-3 gap-y-1 lg:gap-y-1">
              <div className="flex flex-col gap-1">
                <span className="whitespace-pre-wrap inherit tracking-normal normal-case inherit text-base lg:text-lg">
                  {product.name}
                </span>
                <span className="whitespace-pre-wrap inherit tracking-normal normal-case inherit text-gray-700 text-sm lg:text-base">
                  {product.color}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Price and Color Swatch */}
      <div className="mx-2 lg:mx-2 mt-1">
        <div className="items-center justify-between flex w-full flex-wrap gap-x-2">
          <div className="weglot-ignore flex justify-center gap-4 align-baseline max-w-max min-w-fit">
            <span className="whitespace-pre-wrap inherit tracking-normal normal-case text-fine subpixel-antialiased inherit flex flex-wrap-reverse gap-x-2.5 gap-y-0.5 justify-start">
              <div className="text-black text-sm font-semibold">
                {formatPrice(getProductPrice(product, selectedCountry.currency), selectedCountry.currency)}
              </div>
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex gap-1">
              {allProducts.filter((p: any) => 
                (p.name === product.name && p.id !== product.id) ||
                (p.parentProductId === product.id) ||
                (product.parentProductId && p.parentProductId === product.parentProductId && p.id !== product.id) ||
                (product.parentProductId === p.id)
              ).slice(0, 3).map((variant: any) => (
                <Link
                  key={variant.id}
                  to={`/products/${variant.id}`}
                  title={variant.color}
                  className="size-2.5 overflow-hidden rounded-full shadow md:size-3 cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: variant.colorHex }}
                >
                </Link>
              ))}
              {allProducts.filter((p: any) => 
                (p.name === product.name && p.id !== product.id) ||
                (p.parentProductId === product.id) ||
                (product.parentProductId && p.parentProductId === product.parentProductId && p.id !== product.id) ||
                (product.parentProductId === p.id)
              ).length > 3 && (
                <span className="text-xs text-black/60">+{allProducts.filter((p: any) => 
                  (p.name === product.name && p.id !== product.id) ||
                  (p.parentProductId === product.id) ||
                  (product.parentProductId && p.parentProductId === product.parentProductId && p.id !== product.id) ||
                  (product.parentProductId === p.id)
                ).length - 3}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
