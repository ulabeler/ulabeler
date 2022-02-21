import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

// dotenv
import dotenv from "dotenv";
dotenv.config();

const accessKeyId = process.env.AWSACCESSKEYID;
const secretAccessKey = process.env.AWSSECRETKEY;

const s3 = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});
