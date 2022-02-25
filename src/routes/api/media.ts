import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
import { knex } from "../../app";
import { v4 as uuidv4 } from "uuid"; // uuidv4()
import { putObject } from "../../tools/aws/aws";
import multer from "multer";
import path from "path";
const mediaProxyPrefix = process.env.MEDIAPROXYPREFIX || "";
import sharp from "sharp";

import { UpImgDirBase } from "../../app";

router.post(
  "/posticon",
  multer({
    dest: path.join(UpImgDirBase, "/icons"),
    limits: { fieldSize: 50 },
  }).single("file"),
  function (request, response) {
    // console.log(request)
    if (request.body.file) {
      if (request.user) {
        const userId = request.user.id;
        // 画像はBase64で送られてくるので、デコードしてから画像を保存する
        const imgData = Buffer.from(
          request.body.file.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        // 256x256にリサイズし、putObjectでS3に保存
        sharp(imgData)
          .resize(256)
          .webp()
          .toBuffer()
          .then((imgBuffer) => {
            if (imgData) {
              // 拡張子を取得
              // const ext = temp_path.split(".").pop();
              const fileName = "media/icon/" + uuidv4() + ".webp";
              // 画像を保存
              const distUri = `${mediaProxyPrefix}${fileName}`;
              putObject(`${fileName}`, imgBuffer)
                .then(() => {
                  console.log("dist->");
                  console.log(distUri);
                  // userテーブルのicon_pathを更新
                  knex("user")
                    .where("id", userId)
                    .update({
                      icon_path: distUri,
                    })
                    .then(() => {
                      response.status(200).send("画像の保存に成功しました");
                    });
                })
                .catch((err: Error) => {
                  console.log(err);
                  response.status(200).send(distUri);
                });
            } else {
              response.status(200).send("ここまではきた");
            }
          });
      } else {
        // ここにかく
        response.status(401).send("UnAuthorized");
      }
    } else {
      response.status(400).send("No file uploaded");
    }
  }
);
export default router;
