/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

// dotenv
import dotenv from "dotenv";
dotenv.config();

const accessKeyId = process.env.AWSACCESSKEYID || "";
const secretAccessKey = process.env.AWSSECRETKEY || "";
const bucketName = process.env.AWSBUCKETNAME || "";

import { v4 as uuidv4 } from "uuid"; // uuidv4()
listObjects(bucketName);

const s3 = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

// S3 バケットにオブジェクトを追加する
/**
 * @param {string} Key オブジェクト名
 * @param {any} Body 追加するオブジェクト
 */
async function putObject(Key: string, Body: any) {
  // Bodyに画像データを指定
  try {
    const output = await s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: Key,
        Body: Body,
      })
    );
    console.log("SUCCESS - Object added:", output);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

// S3 バケット内のオブジェクトの一覧を取得する
/**
 * @param {string} bucketName バケット名
 */
async function listObjects(bucketName: string) {
  try {
    const output = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        MaxKeys: 10, // 最大10件まで取得
      })
    );
    for (const obj of output.Contents || []) {
      console.log(obj);
    }
  } catch (err) {
    console.error("ERROR:", err);
  }
}

export { listObjects, putObject };
