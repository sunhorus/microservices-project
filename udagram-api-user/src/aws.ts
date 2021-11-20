import AWS = require('aws-sdk');
import { config } from './config/config';


// Configure AWS
const credentials = new AWS.SharedIniFileCredentials({ profile: config.aws_profile });
AWS.config.credentials = credentials;

export const s3 = new AWS.S3({
  // accessKeyId: 'AKIATV2HNQCUJPE26O7Q',
  // secretAccessKey: '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',
  signatureVersion: 'v4',
  region: config.aws_region,
  // params: { Bucket: config.aws_media_bucket }
  // params: { Bucket: `http://${config.aws_media_bucket}.s3.amazonaws.com/` },
});

// Generates an AWS signed URL for retrieving objects
export function getGetSignedUrl(key: string): string {
  // console.log(config.aws_media_bucket)
  const signedUrlExpireSeconds = 60 * 5;

  return s3.getSignedUrl('getObject', {
    // Bucket: 'microservices-project-253015982248',
    Bucket: config.aws_media_bucket,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
}

// Generates an AWS signed URL for uploading objects
export function getPutSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;
  const signedurl = s3.getSignedUrl('putObject', {
    // Bucket: 'microservices-project-253015982248',
    Bucket: config.aws_media_bucket,
    // Bucket: `http://${config.aws_media_bucket}.s3.amazonaws.com/`,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  console.log(signedurl)

  return signedurl;
}
