const port = process.env.PORT || 8081;
const apiURL = process.env.OPENAI_API_URL;
const apiKey = process.env.OPENAI_API_KEY;

const s3Configs = {
  awsAccessKey: process.env.AWS_ACCESS_KEY,
  awsSecretKey: process.env.AWS_SECREAT_KEY,
  awsRegion: process.env.AWS_REGION,
  awsLocalEndPoint: process.env.AWS_LOCAL_ENDPOINT,
  bucketName: process.env.BUCKET_NAME,
};

const variables = {
  port,
  apiURL,
  apiKey,
  s3Configs,
};
module.exports = variables;
