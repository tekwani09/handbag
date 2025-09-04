const { EC2Client, RunInstancesCommand, CreateSecurityGroupCommand, AuthorizeSecurityGroupIngressCommand, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');

const ec2Client = new EC2Client({ region: 'us-east-1' });

async function launchEC2Instance() {
  try {
    console.log('🚀 Creating security group...');
    
    // Create security group
    const sgCommand = new CreateSecurityGroupCommand({
      GroupName: 'handbag-store-sg',
      Description: 'Security group for Handbag Store application'
    });
    
    const sgResponse = await ec2Client.send(sgCommand);
    const securityGroupId = sgResponse.GroupId;
    console.log(`✅ Security group created: ${securityGroupId}`);

    // Add security group rules
    const rules = [
      { IpProtocol: 'tcp', FromPort: 22, ToPort: 22, CidrIp: '0.0.0.0/0' }, // SSH
      { IpProtocol: 'tcp', FromPort: 80, ToPort: 80, CidrIp: '0.0.0.0/0' }, // HTTP
      { IpProtocol: 'tcp', FromPort: 443, ToPort: 443, CidrIp: '0.0.0.0/0' }, // HTTPS
      { IpProtocol: 'tcp', FromPort: 3000, ToPort: 3000, CidrIp: '0.0.0.0/0' }, // Frontend
      { IpProtocol: 'tcp', FromPort: 5000, ToPort: 5000, CidrIp: '0.0.0.0/0' } // Backend
    ];

    for (const rule of rules) {
      await ec2Client.send(new AuthorizeSecurityGroupIngressCommand({
        GroupId: securityGroupId,
        IpPermissions: [rule]
      }));
    }
    console.log('✅ Security group rules added');

    // User data script for automatic setup
    const userData = Buffer.from(`#!/bin/bash
cd /home/ubuntu
wget https://raw.githubusercontent.com/yourusername/handbag-store/main/deploy/setup-ec2.sh
chmod +x setup-ec2.sh
./setup-ec2.sh
`).toString('base64');

    console.log('🚀 Launching EC2 instance...');
    
    // Launch EC2 instance
    const runCommand = new RunInstancesCommand({
      ImageId: 'ami-0c02fb55956c7d316', // Ubuntu 22.04 LTS (us-east-1)
      InstanceType: 't2.micro',
      MinCount: 1,
      MaxCount: 1,
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

    // Wait for instance to be running
    console.log('⏳ Waiting for instance to be running...');
    let instanceRunning = false;
    let attempts = 0;
    
    while (!instanceRunning && attempts < 30) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Wait 10 seconds
      
      const describeCommand = new DescribeInstancesCommand({
        InstanceIds: [instanceId]
      });
      
      const describeResponse = await ec2Client.send(describeCommand);
      const instance = describeResponse.Reservations[0].Instances[0];
      
      if (instance.State.Name === 'running') {
        instanceRunning = true;
        const publicIp = instance.PublicIpAddress;
        
        console.log('🎉 Instance is running!');
        console.log(`📍 Instance ID: ${instanceId}`);
        console.log(`🌐 Public IP: ${publicIp}`);
        console.log(`🔗 SSH Command: ssh -i your-key.pem ubuntu@${publicIp}`);
        console.log(`🌍 Website URL: http://${publicIp}`);
        console.log(`👨‍💼 Admin Panel: http://${publicIp}/admin`);
        console.log('');
        console.log('⏳ Setup script is running automatically...');
        console.log('📝 Wait 5-10 minutes for complete setup');
        
        return {
          instanceId,
          publicIp,
          securityGroupId
        };
      }
      
      attempts++;
      console.log(`⏳ Still launching... (${attempts}/30)`);
    }
    
    throw new Error('Instance failed to start within timeout');
    
  } catch (error) {
    console.error('❌ Error launching EC2:', error.message);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  launchEC2Instance()
    .then(result => {
      console.log('✅ EC2 launch completed successfully!');
    })
    .catch(error => {
      console.error('❌ Failed to launch EC2:', error);
      process.exit(1);
    });
}

module.exports = { launchEC2Instance };