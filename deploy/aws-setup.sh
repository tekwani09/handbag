#!/bin/bash
# AWS CLI Setup Script

echo "🔧 Setting up AWS CLI..."

# Install AWS CLI if not installed
if ! command -v aws &> /dev/null; then
    echo "📦 Installing AWS CLI..."
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    rm -rf aws awscliv2.zip
fi

# Configure AWS CLI
echo "🔑 Configuring AWS credentials..."
echo "Please enter your AWS credentials:"

read -p "AWS Access Key ID: " AWS_ACCESS_KEY_ID
read -s -p "AWS Secret Access Key: " AWS_SECRET_ACCESS_KEY
echo
read -p "Default region (us-east-1): " AWS_DEFAULT_REGION
AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION:-us-east-1}

# Configure AWS CLI
aws configure set aws_access_key_id "$AWS_ACCESS_KEY_ID"
aws configure set aws_secret_access_key "$AWS_SECRET_ACCESS_KEY"
aws configure set default.region "$AWS_DEFAULT_REGION"
aws configure set default.output "json"

echo "✅ AWS CLI configured successfully!"
echo "🧪 Testing AWS connection..."

# Test AWS connection
if aws sts get-caller-identity > /dev/null 2>&1; then
    echo "✅ AWS connection successful!"
    aws sts get-caller-identity
else
    echo "❌ AWS connection failed. Please check your credentials."
    exit 1
fi