#!/bin/bash
# Deploy Handbag Store Application

echo "🚀 Deploying Handbag Store..."

# Get EC2 public IP
EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
echo "EC2 Public IP: $EC2_IP"

# Clone repository
cd /home/ubuntu
git clone -b clean-main https://github.com/tekwani09/handbag.git handbag-store || echo "Repo already exists"
cd handbag-store

# Update environment variables for production
echo "🔧 Updating environment variables..."
cat > backend/.env << EOF
# Database
DATABASE_URL="postgresql://handbag_user:handbag_password@localhost:5432/handbag_store"

# JWT
JWT_SECRET="handbag-store-jwt-secret-key-2024-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=5000
NODE_ENV="production"
FRONTEND_URL="http://$EC2_IP"

# Stripe
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Email (SendGrid)
SENDGRID_API_KEY="your_sendgrid_api_key"
FROM_EMAIL="noreply@yourdomain.com"

# File Upload (AWS S3)
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"
EOF

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
npm run db:push
node scripts/createAdmin.js

# Install frontend dependencies and build
echo "🎨 Building frontend..."
cd ../frontend
npm install
npm run build

# Stop existing PM2 processes
pm2 delete all || echo "No existing processes"

# Start backend with PM2
echo "🚀 Starting backend..."
cd ../backend
pm2 start npm --name "handbag-backend" -- start

# Start frontend with PM2
echo "🎨 Starting frontend..."
cd ../frontend
pm2 serve build 3000 --name "handbag-frontend"

# Save PM2 configuration
pm2 startup
pm2 save

echo "✅ Application deployed!"
echo "🌐 Access your app at: http://$EC2_IP"
echo "👨‍💼 Admin panel: http://$EC2_IP/admin"
echo "📧 Admin login: admin@strathberry.com / admin123"