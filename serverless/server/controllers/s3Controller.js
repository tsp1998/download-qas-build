const AwsSdk = require('aws-sdk')
const s3 = new AwsSdk.S3({
  signatureVersion: 'v4',
  region: 'ap-south-1',
  useAccelerateEndpoint: true
});

exports.getS3Files = async (req, res, next) => {
  try {

    const resp = await s3.listObjectsV2({
      Bucket: process.env.s3BucketName,
      Prefix: 'bugfix/8.2.1/',
      Delimiter: '/'
    }).promise()

    const { Contents, CommonPrefixes } = resp;
    res.json({
      status: 'success',
      Contents, CommonPrefixes
    })
  } catch (error) {
    next(error);
  }
}

exports.downloadS3File = (req, res, next) => {
  try {
    const { key } = req.query;
    const url = s3.getSignedUrl('getObject', {
      Bucket: process.env.s3BucketName,
      Key: key
    })
    console.log(`url`, url)
    res.json(url)
  } catch (error) {
    next(error)
  }
}