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
      error_file: '/home/ec2-user/.pm2/logs/handbag-backend-error.log',
      out_file: '/home/ec2-user/.pm2/logs/handbag-backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      watch: false,
      max_memory_restart: '500M',
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
