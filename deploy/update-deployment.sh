#!/bin/bash
# Quick update script for EC2 deployment

# Replace with your actual key file and IP
KEY_FILE="handbag-store-key-*.pem"
EC2_IP="YOUR_EC2_PUBLIC_IP"

echo "🚀 Updating deployment on EC2..."

ssh -i $KEY_FILE ubuntu@$EC2_IP << 'EOF'
cd handbag-store
echo "📥 Pulling latest changes..."
git pull origin clean-main

echo "🔨 Building frontend..."
cd frontend
npm run build

echo "🔄 Restarting services..."
pm2 restart all

echo "✅ Update completed!"
pm2 status
EOF

echo "🌐 Your app is updated at: http://$EC2_IP"