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
  return `${symbol}${price.toLocaleString()}`
}