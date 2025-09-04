export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'GBP': return '£'
    case 'USD': return '$'
    case 'INR': return '₹'
    default: return '£'
  }
}

export const getProductPrice = (product: any, currency: string) => {
  switch (currency) {
    case 'GBP': return product.priceGBP
    case 'USD': return product.priceUSD
    case 'INR': return product.priceINR
    default: return product.priceGBP
  }
}

export const formatPrice = (price: number, currency: string) => {
  const symbol = getCurrencySymbol(currency)
  return `${symbol}${price.toLocaleString()}`
}