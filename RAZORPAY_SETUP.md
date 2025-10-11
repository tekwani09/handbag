# Razorpay Payment Integration Setup

## 🔧 Setup Instructions

### 1. Create Razorpay Account
1. Visit https://razorpay.com
2. Sign up with your business details
3. Complete KYC verification (for live mode)

### 2. Get API Keys
1. Go to Dashboard → Settings → API Keys
2. Generate Test Keys for development
3. Copy **Key ID** and **Key Secret**

### 3. Backend Configuration
Add to `backend/.env`:
```env
RAZORPAY_KEY_ID=rzp_test_your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
```

### 4. Frontend Configuration
Update `frontend/.env`:
```env
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_id_here
```

## 🧪 Testing

### Test Cards (India)
- **Success**: 4111 1111 1111 1111
- **Failure**: 4111 1111 1111 1112
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test UPI IDs
- **Success**: success@razorpay
- **Failure**: failure@razorpay

### Test Wallets
- **Paytm**: Use any mobile number
- **PhonePe**: Use any mobile number

## 📁 Files Created/Modified

### Backend
- `src/controllers/paymentController.ts` - Razorpay integration
- `src/routes/payments.ts` - Payment routes
- `.env` - Razorpay credentials

### Frontend
- `src/components/RazorpayPayment.tsx` - Payment component
- `index.html` - Razorpay script
- `.env` - Razorpay key ID

## 🔄 Payment Flow

1. **Checkout**: User fills shipping info
2. **Create Order**: Backend creates Razorpay order
3. **Payment**: Frontend opens Razorpay checkout
4. **Verification**: Backend verifies payment signature
5. **Success**: Order status updated to PAID

## 💳 Payment Methods Supported

### India
- **Credit/Debit Cards**: Visa, Mastercard, RuPay
- **UPI**: All UPI apps (GPay, PhonePe, Paytm, etc.)
- **Net Banking**: 50+ banks
- **Wallets**: Paytm, PhonePe, Mobikwik, etc.
- **EMI**: Credit card EMI options

### International
- **Cards**: Visa, Mastercard (via Curlec)
- **Limited wallet support**

## 🔐 Security Features

- PCI DSS compliant
- 256-bit SSL encryption
- Signature verification for webhooks
- Fraud detection algorithms
- 3D Secure authentication

## 🚨 Important Notes

- Test mode: Use test keys (rzp_test_...)
- Live mode: Complete KYC verification
- Signature verification is mandatory
- Keep key secret secure (server-side only)

## 💰 Pricing

### India
- **Domestic cards**: 2%
- **UPI**: 0% (limited time)
- **Net banking**: 2%
- **Wallets**: 2%

### International
- **International cards**: 3% + GST
- **Currency conversion**: Additional charges may apply

## 🌍 Supported Countries

### Full Support
- India (all payment methods)

### Limited Support (Cards only)
- Malaysia, Singapore, UAE via Curlec
- US, UK, EU (international cards)

Your Razorpay integration is now ready! Use test credentials for development and switch to live keys for production.