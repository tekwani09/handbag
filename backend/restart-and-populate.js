const { execSync } = require('child_process');

try {
  console.log('🔄 Stopping existing processes...');
  try {
    execSync('pm2 delete handbag-backend', { stdio: 'ignore' });
  } catch (e) {}
  
  console.log('🗄️ Populating database...');
  execSync('node populate-ec2-db.js', { stdio: 'inherit' });
  
  console.log('🚀 Starting backend...');
  execSync('pm2 start npm --name "handbag-backend" -- start', { stdio: 'inherit' });
  
  console.log('✅ Backend restarted and database populated!');
} catch (error) {
  console.error('❌ Error:', error.message);
}