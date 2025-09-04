#!/bin/bash

echo "🚀 Setting up EC2 database with products and categories..."

# Navigate to backend directory
cd /home/ubuntu/handbag-store/backend

# Install dependencies if needed
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Populate database with categories and products
node populate-ec2-db.js

echo "✅ EC2 database setup complete!"