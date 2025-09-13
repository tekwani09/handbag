const { EC2Client, DescribeInstancesCommand } = require('@aws-sdk/client-ec2');

const ec2Client = new EC2Client({ 
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

async function getInstanceIP(instanceId) {
  try {
    const command = new DescribeInstancesCommand({
      InstanceIds: [instanceId]
    });
    
    const response = await ec2Client.send(command);
    const instance = response.Reservations[0].Instances[0];
    
    console.log(`Instance ID: ${instanceId}`);
    console.log(`State: ${instance.State.Name}`);
    console.log(`Public IP: ${instance.PublicIpAddress || 'Not assigned'}`);
    console.log(`Private IP: ${instance.PrivateIpAddress}`);
    
    return instance.PublicIpAddress;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

const instanceId = process.argv[2] || 'i-042b18e61df700e31';
getInstanceIP(instanceId);