export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'GBP': return '£'
    case 'USD': return '$'
    case 'INR': return '₹'
    default: return '£'
  }
}

export const getProductPrice = (product: any, currency: string) => {
  if (!product) return 0
  
  switch (currency) {
    case 'GBP': return product.priceGBP || 0
    case 'USD': return product.priceUSD || 0
    case 'INR': return product.priceINR || 0
    default: return product.priceGBP || 0
  }
}

export const formatPrice = (price: number, currency: string) => {
  const symbol = getCurrencySymbol(currency)
  const numPrice = Number(price)
  const locale = currency === 'INR' ? 'en-IN' : currency === 'USD' ? 'en-US' : 'en-GB'
  return `${symbol}${numPrice.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}