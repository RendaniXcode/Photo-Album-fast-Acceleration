import AWS from 'aws-sdk';

// Configure the AWS SDK with your credentials and region
AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_REGION,
});

// Create an S3 instance with Transfer Acceleration enabled
const s3 = new AWS.S3({
    useAccelerateEndpoint: true,  // Enable Transfer Acceleration
});

export default s3;
