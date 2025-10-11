# Stripe Payment Integration Setup

## 🔧 Setup Instructions

### 1. Get Stripe API Keys
1. Create a Stripe account at https://stripe.com
2. Go to Developers > API keys
3. Copy your **Publishable key** and **Secret key**

### 2. Backend Configuration
Add to `backend/.env`:
```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. Frontend Configuration
Create `frontend/.env`:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
VITE_API_BASE_URL=http://localhost:5005/api
```

### 4. Webhook Setup (Optional for Development)
1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
2. Login: `stripe login`
3. Forward events: `stripe listen --forward-to localhost:5005/api/payments/webhook`
4. Copy the webhook signing secret to your .env file

## 🧪 Testing

### Test Card Numbers
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

### Test Flow
1. Add items to cart
2. Go to checkout
3. Fill in shipping information
4. Use test card number: 4242 4242 4242 4242
5. Use any future expiry date and any 3-digit CVC
6. Complete payment

## 📁 Files Created

### Backend
- `src/controllers/paymentController.ts` - Payment processing logic
- `src/routes/payments.ts` - Payment API routes

### Frontend
- `src/components/PaymentForm.tsx` - Stripe payment form
- `src/components/StripeProvider.tsx` - Stripe context provider
- `src/pages/PaymentSuccess.tsx` - Success page
- `src/pages/PaymentFailed.tsx` - Failure page

## 🔄 Payment Flow

1. **Checkout**: User fills shipping info and proceeds to payment
2. **Order Creation**: Backend creates pending order
3. **Payment Intent**: Backend creates Stripe payment intent
4. **Payment**: Frontend processes payment with Stripe
5. **Confirmation**: Backend confirms payment and updates order status
6. **Success**: User redirected to success page

## 🚨 Important Notes

- Always use test keys in development
- Never expose secret keys in frontend code
- Webhook endpoint handles payment confirmations
- Orders are created before payment for better UX
- Failed payments don't charge the customer

## 🔐 Security Features

- Payment processing handled by Stripe (PCI compliant)
- Webhook signature verification
- Order validation before payment
- Secure token-based authentication