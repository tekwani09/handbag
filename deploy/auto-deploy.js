const { EC2Client, RunInstancesCommand, CreateSecurityGroupCommand, AuthorizeSecurityGroupIngressCommand, DescribeInstancesCommand, CreateKeyPairCommand } = require('@aws-sdk/client-ec2');
const fs = require('fs');
const { execSync } = require('child_process');

const ec2Client = new EC2Client({ 
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function fullAutoDeploy() {
  try {
    console.log('🚀 Starting fully automated deployment...');
    
    // Create key pair
    console.log('🔑 Creating SSH key pair...');
    const keyPairName = `handbag-store-key-${Date.now()}`;
    const keyCommand = new CreateKeyPairCommand({
      KeyName: keyPairName
    });
    
    const keyResponse = await ec2Client.send(keyCommand);
    fs.writeFileSync(`${keyPairName}.pem`, keyResponse.KeyMaterial);
    execSync(`chmod 400 ${keyPairName}.pem`);
    console.log(`✅ Key pair created: ${keyPairName}.pem`);

    // Create security group
    console.log('🛡️ Creating security group...');
    const sgName = `handbag-store-sg-${Date.now()}`;
    const sgCommand = new CreateSecurityGroupCommand({
      GroupName: sgName,
      Description: 'Security group for Handbag Store application'
    });
    
    const sgResponse = await ec2Client.send(sgCommand);
    const securityGroupId = sgResponse.GroupId;
    console.log(`✅ Security group created: ${securityGroupId}`);

    // Add security group rules
    const rules = [
      { IpProtocol: 'tcp', FromPort: 22, ToPort: 22, CidrIp: '0.0.0.0/0' },
      { IpProtocol: 'tcp', FromPort: 80, ToPort: 80, CidrIp: '0.0.0.0/0' },
      { IpProtocol: 'tcp', FromPort: 443, ToPort: 443, CidrIp: '0.0.0.0/0' },
      { IpProtocol: 'tcp', FromPort: 3000, ToPort: 3000, CidrIp: '0.0.0.0/0' },
      { IpProtocol: 'tcp', FromPort: 5000, ToPort: 5000, CidrIp: '0.0.0.0/0' }
    ];

    for (const rule of rules) {
      await ec2Client.send(new AuthorizeSecurityGroupIngressCommand({
        GroupId: securityGroupId,
        IpPermissions: [rule]
      }));
    }
    console.log('✅ Security group rules configured');

    // Create comprehensive user data script
    const userData = Buffer.from(`#!/bin/bash
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
echo "Starting user data script..."

# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PostgreSQL
apt install postgresql postgresql-contrib -y
systemctl start postgresql
systemctl enable postgresql

# Install PM2, Git, Nginx
npm install -g pm2
apt install git nginx -y
systemctl start nginx
systemctl enable nginx

# Setup PostgreSQL
sudo -u postgres psql -c "CREATE USER handbag_user WITH PASSWORD 'handbag_password';"
sudo -u postgres psql -c "CREATE DATABASE handbag_store OWNER handbag_user;"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE handbag_store TO handbag_user;"

# Configure PostgreSQL
sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/*/main/postgresql.conf
echo "host all all 0.0.0.0/0 md5" >> /etc/postgresql/*/main/pg_hba.conf
systemctl restart postgresql

# Clone repository and setup app
cd /home/ubuntu
git clone -b clean-main https://github.com/tekwani09/handbag.git handbag-store || echo "Using existing repo"
cd handbag-store

# Get EC2 public IP
EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)

# Update backend environment
cat > backend/.env << EOF
DATABASE_URL="postgresql://handbag_user:handbag_password@localhost:5432/handbag_store"
JWT_SECRET="handbag-store-jwt-secret-key-2024-production"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="production"
FRONTEND_URL="http://\$EC2_IP"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
SENDGRID_API_KEY="your_sendgrid_api_key"
FROM_EMAIL="noreply@yourdomain.com"
AWS_ACCESS_KEY_ID="your_aws_access_key_id"
AWS_SECRET_ACCESS_KEY="your_aws_secret_access_key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="your-bucket-name"
EOF

# Install and setup backend
cd backend
npm install
npm run db:push
node scripts/createAdmin.js

# Install and build frontend
cd ../frontend
npm install
REACT_APP_API_URL="http://\$EC2_IP" npm run build

# Configure Nginx
cat > /etc/nginx/sites-available/handbag-store << 'NGINXEOF'
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/handbag-store /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# Start applications with PM2
cd /home/ubuntu/handbag-store/backend
sudo -u ubuntu pm2 start npm --name "handbag-backend" -- start

cd /home/ubuntu/handbag-store/frontend
sudo -u ubuntu pm2 serve build 3000 --name "handbag-frontend"

# Save PM2 configuration
sudo -u ubuntu pm2 startup
sudo -u ubuntu pm2 save

# Set proper ownership
chown -R ubuntu:ubuntu /home/ubuntu/handbag-store

echo "Deployment completed successfully!"
echo "Website: http://\$EC2_IP"
echo "Admin: http://\$EC2_IP/admin"
echo "Login: admin@strathberry.com / admin123"
`).toString('base64');

    // Launch EC2 instance
    console.log('🚀 Launching EC2 instance...');
    const runCommand = new RunInstancesCommand({
      ImageId: 'ami-0c02fb55956c7d316', // Ubuntu 22.04 LTS
      InstanceType: 't2.micro',
      MinCount: 1,
      MaxCount: 1,
      KeyName: keyPairName,
      SecurityGroupIds: [securityGroupId],
      UserData: userData,
      TagSpecifications: [{
        ResourceType: 'instance',
        Tags: [
          { Key: 'Name', Value: 'handbag-store-server' },
          { Key: 'Project', Value: 'handbag-store' }
        ]
      }]
    });

    const response = await ec2Client.send(runCommand);
    const instanceId = response.Instances[0].InstanceId;
    console.log(`✅ EC2 instance launched: ${instanceId}`);

    // Wait for instance to be running and get public IP
    console.log('⏳ Waiting for instance to be running...');
    let publicIp = null;
    let attempts = 0;
    
    while (!publicIp && attempts < 60) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      const describeCommand = new DescribeInstancesCommand({
        InstanceIds: [instanceId]
      });
      
      const describeResponse = await ec2Client.send(describeCommand);
      const instance = describeResponse.Reservations[0].Instances[0];
      
      if (instance.State.Name === 'running' && instance.PublicIpAddress) {
        publicIp = instance.PublicIpAddress;
        break;
      }
      
      attempts++;
      console.log(`⏳ Still launching... (${attempts}/60)`);
    }

    if (!publicIp) {
      throw new Error('Failed to get public IP within timeout');
    }

    console.log('\n🎉 DEPLOYMENT COMPLETED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════');
    console.log(`📍 Instance ID: ${instanceId}`);
    console.log(`🌐 Public IP: ${publicIp}`);
    console.log(`🔑 SSH Key: ${keyPairName}.pem`);
    console.log(`🔗 SSH Command: ssh -i ${keyPairName}.pem ubuntu@${publicIp}`);
    console.log('');
    console.log('🌍 ACCESS YOUR APPLICATION:');
    console.log(`   Website: http://${publicIp}`);
    console.log(`   Admin Panel: http://${publicIp}/admin`);
    console.log('');
    console.log('👨💼 ADMIN LOGIN:');
    console.log('   Email: admin@strathberry.com');
    console.log('   Password: admin123');
    console.log('');
    console.log('⏳ Application is setting up automatically...');
    console.log('📝 Wait 10-15 minutes for complete deployment');
    console.log('═══════════════════════════════════════');

    return {
      instanceId,
      publicIp,
      keyPairName,
      securityGroupId
    };

  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    throw error;
  }
}

// Run deployment
fullAutoDeploy()
  .then(result => {
    console.log('\n✅ Full deployment automation completed!');
    process.exit(0);
  })
  .catch(error => {
    console.error('\n❌ Deployment failed:', error);
    process.exit(1);
  });