const { execSync } = require('child_process');
const fs = require('fs');

async function populateRemoteDatabase() {
  try {
    console.log('🚀 Populating remote EC2 database...');
    
    // Find the latest key file
    const keyFiles = fs.readdirSync('.').filter(f => f.endsWith('.pem'));
    if (keyFiles.length === 0) {
      throw new Error('No SSH key files found');
    }
    
    const keyFile = keyFiles[keyFiles.length - 1];
    console.log(`🔑 Using key: ${keyFile}`);
    
    // Get EC2 IP (you'll need to replace this with your actual IP)
    const EC2_IP = '3.95.175.207'; // Replace with your EC2 IP
    
    console.log('📤 Uploading database population script...');
    execSync(`scp -i ${keyFile} -o StrictHostKeyChecking=no ../backend/populate-ec2-db.js ubuntu@${EC2_IP}:/home/ubuntu/handbag-store/backend/`);
    
    console.log('🗄️ Running database population on EC2...');
    const sshCommand = `ssh -i ${keyFile} -o StrictHostKeyChecking=no ubuntu@${EC2_IP} "cd /home/ubuntu/handbag-store/backend && node populate-ec2-db.js"`;
    
    const result = execSync(sshCommand, { encoding: 'utf8' });
    console.log(result);
    
    console.log('✅ Remote database populated successfully!');
    console.log(`🌐 Visit: http://${EC2_IP}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

populateRemoteDatabase();