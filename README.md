# Handbag Store - E-commerce Website

A modern e-commerce website for luxury handbags built with React.js and Node.js, inspired by Strathberry's design.

## Tech Stack

### Frontend
- **React.js 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Query** for API state management
- **Zustand** for global state
- **Framer Motion** for animations
- **Headless UI** for accessible components

### Backend
- **Node.js** with Express.js
- **PostgreSQL** with Prisma ORM
- **JWT** authentication
- **Stripe** for payments
- **Multer** for file uploads
- **Helmet** for security

## Project Structure

```
handbag-store/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Zustand stores
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript types
│   └── package.json
├── backend/                 # Express API
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Database models
│   │   └── utils/          # Utility functions
│   ├── prisma/             # Database schema
│   └── package.json
└── shared/                 # Shared types and utilities
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
cd handbag-store
npm run install:all
```

2. **Setup environment variables:**
```bash
# Backend
cd backend
cp .env.example .env
# Edit .env with your database and API keys
```

3. **Setup database:**
```bash
cd backend
npm run db:generate
npm run db:push
```

4. **Start development servers:**
```bash
# From root directory
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5005

## Features

### Core E-commerce Features
- ✅ Product catalog with categories
- ✅ Product search and filtering
- ✅ Shopping cart functionality with persistence
- ✅ User authentication with JWT
- ✅ Complete order management system
- ✅ Dummy payment processing (ready for real gateways)
- ✅ Order history and tracking
- ✅ Order details page
- ✅ Admin dashboard
- ✅ Inventory management
- ✅ Multi-currency support
- ✅ Country-based pricing

### User Account Features
- ✅ User registration and login
- ✅ Profile management
- ✅ Order history
- ✅ Address management
- ✅ Protected routes
- ✅ Session persistence

### Shopping Experience
- ✅ Add to cart functionality
- ✅ Cart persistence across sessions
- ✅ Multi-step checkout process
- ✅ Real-time cart updates
- ✅ Product wishlist
- ✅ Product image galleries
- ✅ Product filtering and search

### UI/UX Features
- ✅ Responsive design
- ✅ Clean, minimalist interface
- ✅ Smooth animations with Framer Motion
- ✅ Image galleries with zoom
- ✅ Mobile-first approach
- ✅ Loading states and error handling
- ✅ Toast notifications
- ✅ Breadcrumb navigation

### Technical Features
- ✅ TypeScript implementation
- ✅ State management with Zustand
- ✅ API integration with error handling
- ✅ Authentication middleware
- ✅ Protected API routes
- ✅ Database integration with Prisma
- ✅ File upload support
- ✅ Environment configuration
- ✅ CORS and security headers

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

### Cart
- `GET /api/users/cart` - Get cart items
- `POST /api/users/cart` - Add to cart
- `PUT /api/users/cart/:itemId` - Update cart item
- `DELETE /api/users/cart/:itemId` - Remove from cart

## Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
```

### Backend (Railway/Render)
```bash
cd backend
npm run build
npm start
```

## Environment Variables

See `.env.example` files in both frontend and backend directories for required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.