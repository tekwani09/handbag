# Handbag Store Deployment Guide

Complete guide for deploying the Handbag Store application to AWS EC2 with RDS PostgreSQL.

## Architecture Overview

- **Frontend**: React + Vite (static files served by Nginx)
- **Backend**: Node.js + Express (API server on port 5005)
- **Database**: PostgreSQL on AWS RDS
- **Web Server**: Nginx (reverse proxy on port 80)
- **Process Manager**: PM2 (manages backend process)

## Prerequisites

- AWS EC2 instance (Amazon Linux 2)
- AWS RDS PostgreSQL instance
- SSH access to EC2 instance
- Git repository with code

## EC2 Instance Setup

### 1. SSH into the Server
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

### 2. Install Required Software
```bash
# Update system
sudo yum update -y

# Install Node.js and npm
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install nodejs -y

# Install git
sudo yum install git -y

# Install nginx
sudo yum install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx

# Install PM2 globally
sudo npm install -g pm2
```

### 3. Clone the Repository
```bash
cd /home/ec2-user
git clone https://github.com/tekwani09/handbag.git handbag-store
cd handbag-store
```

### 4. Install Backend Dependencies
```bash
cd backend
npm install
npm run build
cd ..
```

### 5. Install Frontend Dependencies
```bash
cd frontend
npm install
npm run build
cd ..
```

## Database Setup (RDS PostgreSQL)

### 1. Get RDS Connection String
Your RDS instance should have a connection string like:
```
postgresql://username:password@your-db-endpoint.rds.amazonaws.com:5432/database_name
```

### 2. Create .env File for Backend
```bash
cat > backend/.env << 'EOF'
DATABASE_URL="postgresql://handbag_admin:HandbagStore2024!@handbag-store-db.cin8im6isxiv.us-east-1.rds.amazonaws.com:5432/handbag_store"
JWT_SECRET="your-jwt-secret-key-here"
PORT=5005
NODE_ENV="production"
FRONTEND_URL="http://your-ec2-ip"
EOF
```

### 3. Run Database Migrations (if using Prisma)
```bash
cd backend
npx prisma db push
# or
npx prisma migrate deploy
cd ..
```

## PM2 Configuration

The project uses PM2 to manage the backend process. Configuration is in `ecosystem.config.js`:

```javascript
module.exports = {
  apps: [
    {
      name: 'handbag-backend',
      script: './backend/dist/index.js',
      cwd: '/home/ec2-user/handbag-store',
      env: {
        NODE_ENV: 'production',
        PORT: 5005
      },
      watch: false,
      max_memory_restart: '500M',
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
```

### Start Backend with PM2
```bash
cd /home/ec2-user/handbag-store
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Monitor Backend
```bash
# View status
pm2 status

# View logs
pm2 logs handbag-backend --lines 100

# Restart
pm2 restart handbag-backend

# Stop
pm2 stop handbag-backend
```

## Nginx Configuration

### 1. Configure Nginx
Create/update `/etc/nginx/conf.d/handbag.conf`:

```bash
sudo tee /etc/nginx/conf.d/handbag.conf > /dev/null << 'EOF'
server {
    listen 80;
    server_name _;
    
    # Serve frontend static files
    location / {
        root /home/ec2-user/handbag-store/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api/ {
        proxy_pass http://localhost:5005/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
```

### 2. Remove Default Nginx Config
```bash
# Backup the original
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bak

# Update nginx.conf to only include conf.d files
sudo tee /etc/nginx/nginx.conf > /dev/null << 'EOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files
    include /etc/nginx/conf.d/*.conf;
}
EOF
```

### 3. Fix File Permissions
```bash
# Allow nginx to access files
sudo chmod 755 /home/ec2-user
sudo chmod 755 /home/ec2-user/handbag-store
sudo chmod 755 /home/ec2-user/handbag-store/frontend
sudo chmod 755 /home/ec2-user/handbag-store/frontend/dist
sudo chmod -R 755 /home/ec2-user/handbag-store/frontend/dist/*

# Change ownership to nginx
sudo chown -R nginx:nginx /home/ec2-user/handbag-store/frontend/dist/
```

### 4. Test and Start Nginx
```bash
# Test configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Check status
sudo systemctl status nginx
```

## Testing the Deployment

### 1. Test Backend API
```bash
# Local test
curl http://localhost:5005/api/products

# External test
curl http://your-ec2-ip/api/products
```

### 2. Test Frontend
```bash
curl http://your-ec2-ip/
```

### 3. Check Logs
```bash
# Backend logs
pm2 logs handbag-backend

# Nginx error logs
sudo tail -50 /var/log/nginx/error.log

# Nginx access logs
sudo tail -50 /var/log/nginx/access.log
```

## Troubleshooting

### Backend not responding (502 error)

1. Check if backend is running:
```bash
pm2 status
```

2. Check backend logs:
```bash
pm2 logs handbag-backend --lines 100
```

3. Check if port 5005 is listening:
```bash
lsof -i :5005
```

4. Verify .env file has correct DATABASE_URL:
```bash
cat backend/.env
```

5. Test backend locally:
```bash
curl http://localhost:5005/api/products
```

### Frontend showing permission errors

1. Check file permissions:
```bash
ls -la /home/ec2-user/handbag-store/frontend/dist/
```

2. Fix permissions:
```bash
sudo chmod 755 /home/ec2-user
sudo chmod 755 /home/ec2-user/handbag-store
sudo chmod 755 /home/ec2-user/handbag-store/frontend
sudo chmod 755 /home/ec2-user/handbag-store/frontend/dist
```

3. Change ownership:
```bash
sudo chown -R nginx:nginx /home/ec2-user/handbag-store/frontend/dist/
```

### Database connection errors

1. Verify RDS endpoint is correct in `.env`
2. Check RDS security group allows inbound traffic on port 5432
3. Test connection from EC2:
```bash
psql "postgresql://user:password@your-db-endpoint:5432/database_name"
```

## Deployment Workflow

### For Updating Code

1. SSH into server:
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

2. Pull latest code:
```bash
cd /home/ec2-user/handbag-store
git pull origin clean-main
```

3. Rebuild backend (if changed):
```bash
cd backend
npm install
npm run build
cd ..
```

4. Rebuild frontend (if changed):
```bash
cd frontend
npm install
npm run build
cd ..
```

5. Restart backend:
```bash
pm2 restart handbag-backend
```

6. Reload nginx (if config changed):
```bash
sudo systemctl reload nginx
```

## Environment Variables Reference

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-secret-key
PORT=5005
NODE_ENV=production
FRONTEND_URL=http://your-domain.com
```

## Useful Commands

```bash
# View all PM2 processes
pm2 status

# View real-time logs
pm2 logs

# Save PM2 state for restart on reboot
pm2 save
pm2 startup

# Stop all processes
pm2 stop all

# Restart all processes
pm2 restart all

# Delete all processes
pm2 delete all

# Check nginx configuration
sudo nginx -t

# Reload nginx (applies config changes)
sudo systemctl reload nginx

# Restart nginx
sudo systemctl restart nginx

# View nginx error logs
sudo tail -50 /var/log/nginx/error.log
```

## Security Notes

1. **Keep .env file private** - never commit to git
2. **Use strong JWT_SECRET** - generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
3. **Restrict RDS security group** - only allow EC2 instance to connect
4. **Use HTTPS in production** - add SSL certificate with Let's Encrypt
5. **Keep dependencies updated** - run `npm audit` regularly

## Monitoring

### Check Backend Health
```bash
# Is backend process running?
pm2 status

# Is backend listening on port 5005?
sudo netstat -tulpn | grep 5005

# Can we reach the API?
curl http://localhost:5005/api/products
```

### Check Frontend Health
```bash
# Can we reach the frontend?
curl http://localhost/

# Are static files accessible?
curl http://localhost/index.html
curl http://localhost/assets/
```

### Check Database Connection
```bash
# From backend logs
pm2 logs handbag-backend
```

## Performance Tips

1. **Enable gzip compression** in nginx config
2. **Cache static assets** with proper cache headers
3. **Use CloudFront** for global content delivery
4. **Monitor memory usage** - set PM2 restart limit if needed
5. **Use RDS read replicas** for high traffic

---

**Last Updated**: August 30, 2026
**Status**: Production Ready ✅
