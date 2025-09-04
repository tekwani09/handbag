const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');
const { execSync } = require('child_process');

const ec2Client = new EC2Client({ 
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function checkStatus() {
  try {
    const instanceId = 'i-0a360da0347e22e00';
    const publicIp = '54.234.97.190';
    const keyFile = 'handbag-store-key-1756999204811.pem';

    console.log('🔍 Checking EC2 instance status...');
    
    // Check EC2 instance status
    const describeCommand = new DescribeInstancesCommand({
      InstanceIds: [instanceId]
    });
    
    const response = await ec2Client.send(describeCommand);
    const instance = response.Reservations[0].Instances[0];
    
    console.log(`📍 Instance ID: ${instanceId}`);
    console.log(`🌐 Public IP: ${publicIp}`);
    console.log(`⚡ State: ${instance.State.Name}`);
    console.log(`🔧 Status: ${instance.StateReason.Message}`);
    
    if (instance.State.Name === 'running') {
      console.log('\n✅ EC2 Instance is RUNNING');
      
      // Check if SSH is accessible
      try {
        console.log('\n🔐 Testing SSH connection...');
        execSync(`ssh -i ${keyFile} -o ConnectTimeout=10 -o StrictHostKeyChecking=no ubuntu@${publicIp} 'echo "SSH OK"'`, { stdio: 'pipe' });
        console.log('✅ SSH connection successful');
        
        // Check application status
        console.log('\n🚀 Checking application status...');
        
        const pmStatus = execSync(`ssh -i ${keyFile} -o StrictHostKeyChecking=no ubuntu@${publicIp} 'pm2 status'`, { encoding: 'utf8' });
        console.log('📊 PM2 Status:');
        console.log(pmStatus);
        
        const nginxStatus = execSync(`ssh -i ${keyFile} -o StrictHostKeyChecking=no ubuntu@${publicIp} 'sudo systemctl status nginx --no-pager'`, { encoding: 'utf8' });
        console.log('🌐 Nginx Status:');
        console.log(nginxStatus.split('\n').slice(0, 5).join('\n'));
        
        const dbStatus = execSync(`ssh -i ${keyFile} -o StrictHostKeyChecking=no ubuntu@${publicIp} 'sudo systemctl status postgresql --no-pager'`, { encoding: 'utf8' });
        console.log('🐘 PostgreSQL Status:');
        console.log(dbStatus.split('\n').slice(0, 5).join('\n'));
        
      } catch (error) {
        console.log('❌ SSH connection failed or services not ready yet');
        console.log('⏳ Application might still be setting up...');
      }
      
      // Test HTTP endpoints
      console.log('\n🌍 Testing HTTP endpoints...');
      try {
        const curlTest = execSync(`curl -s -o /dev/null -w "%{http_code}" http://${publicIp}`, { encoding: 'utf8', timeout: 10000 });
        if (curlTest === '200') {
          console.log('✅ Website is accessible');
        } else {
          console.log(`⚠️ Website returned status: ${curlTest}`);
        }
      } catch (error) {
        console.log('❌ Website not accessible yet');
      }
      
      try {
        const apiTest = execSync(`curl -s -o /dev/null -w "%{http_code}" http://${publicIp}/api/products`, { encoding: 'utf8', timeout: 10000 });
        if (apiTest === '200') {
          console.log('✅ API is accessible');
        } else {
          console.log(`⚠️ API returned status: ${apiTest}`);
        }
      } catch (error) {
        console.log('❌ API not accessible yet');
      }
      
    } else {
      console.log(`❌ Instance is ${instance.State.Name}`);
    }
    
    console.log('\n🔗 Access URLs:');
    console.log(`   Website: http://${publicIp}`);
    console.log(`   Admin: http://${publicIp}/admin`);
    console.log(`   SSH: ssh -i ${keyFile} ubuntu@${publicIp}`);
    
  } catch (error) {
    console.error('❌ Error checking status:', error.message);
  }
}

checkStatus();