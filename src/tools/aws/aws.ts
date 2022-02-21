/* eslint-disable require-jsdoc */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import {
  S3Client,
  ListObjectsV2Command,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

// dotenv
// import dotenv from "dotenv";
// dotenv.config();

const accessKeyId = process.env.AWSACCESSKEYID || "";
const secretAccessKey = process.env.AWSSECRETKEY || "";
const bucketName = process.env.AWSBUCKETNAME || "";

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
 * @param {any} Body 追加するオブジェクト。base64エンコードされた画像データをいい感じにして格納します。src/routes/api/media.tsに例があります。
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
    // console.log("SUCCESS - Object added:", output);
    return true;
  } catch (err) {
    console.error("ERROR:", err);
    return false;
  }
}

// S3 バケット内のオブジェクトの一覧を取得する
/**
 * @param {string} bucketName バケット名
 * @return {any} obj 一覧を返す
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
      return obj;
    }
  } catch (err) {
    console.error("ERROR:", err);
  }
}

export { listObjects, putObject };
