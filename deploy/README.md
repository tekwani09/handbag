# AWS EC2 Deployment Guide

## Step 1: Launch EC2 Instance (Free Tier)

1. **Go to AWS Console** → EC2 → Launch Instance
2. **Choose AMI**: Ubuntu Server 22.04 LTS (Free tier eligible)
3. **Instance Type**: t2.micro (Free tier eligible)
4. **Key Pair**: Create new or use existing
5. **Security Group**: Create with these rules:
   - SSH (22) - Your IP
   - HTTP (80) - Anywhere (0.0.0.0/0)
   - HTTPS (443) - Anywhere (0.0.0.0/0)
   - Custom TCP (3000) - Anywhere (0.0.0.0/0)
   - Custom TCP (5000) - Anywhere (0.0.0.0/0)
6. **Storage**: 8GB (Free tier limit)
7. **Launch Instance**

## Step 2: Connect to EC2

```bash
# Replace with your key file and EC2 public IP
ssh -i your-key.pem ubuntu@your-ec2-public-ip
```

## Step 3: Upload and Run Setup Scripts

```bash
# On your local machine, upload scripts to EC2
scp -i your-key.pem deploy/*.sh ubuntu@your-ec2-public-ip:~/

# On EC2 instance, make scripts executable
chmod +x *.sh

# Run setup script
./setup-ec2.sh
```

## Step 4: Deploy Application

```bash
# First, push your code to GitHub (replace with your repo URL)
# Then on EC2:
./deploy-app.sh

# Configure Nginx
./nginx-config.sh
```

## Step 5: Access Your Application

- **Website**: http://your-ec2-public-ip
- **Admin Panel**: http://your-ec2-public-ip/admin
- **Admin Login**: admin@strathberry.com / admin123

## Useful Commands

```bash
# Check application status
pm2 status

# View logs
pm2 logs

# Restart services
pm2 restart all

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/error.log
```

## Cost Estimate
- **EC2 t2.micro**: Free for 12 months (750 hours/month)
- **Data Transfer**: 15GB free/month
- **Total**: $0/month (within free tier limits)

## Next Steps for Production
- Add SSL certificate (Let's Encrypt)
- Set up CloudFront CDN
- Use RDS for database
- Implement auto-scaling