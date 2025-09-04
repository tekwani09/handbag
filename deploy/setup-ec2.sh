#!/bin/bash
# EC2 Setup Script for Handbag Store

echo "🚀 Setting up Handbag Store on EC2..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
echo "📦 Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PostgreSQL
echo "🐘 Installing PostgreSQL..."
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Install PM2 for process management
echo "⚡ Installing PM2..."
sudo npm install -g pm2

# Install Nginx
echo "🌐 Installing Nginx..."
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Install Git
sudo apt install git -y

# Setup PostgreSQL database
echo "🔧 Setting up database..."
sudo -u postgres psql -c "CREATE USER handbag_user WITH PASSWORD 'handbag_password';"
sudo -u postgres psql -c "CREATE DATABASE handbag_store OWNER handbag_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE handbag_store TO handbag_user;"

# Configure PostgreSQL to accept connections
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf
echo "host all all 0.0.0.0/0 md5" | sudo tee -a /etc/postgresql/*/main/pg_hba.conf
sudo systemctl restart postgresql

echo "✅ EC2 setup complete!"
echo "Next: Run deploy-app.sh to deploy your application"