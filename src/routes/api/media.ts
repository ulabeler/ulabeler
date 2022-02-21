/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
// import bcrypt from "bcrypt";
// import { sendMail } from "../../tools/sendmail";
import { knex } from "../../app";
// eslint-disable-next-line camelcase
import {
  userTable,
  // eslint-disable-next-line camelcase
  //   password_resetTable,
  // eslint-disable-next-line camelcase
  //   mail_confirmationTable,
} from "../../tools/TypeAlias/tableType_alias";
// import sideMenuList from "../../tools/data/sidemenu.json";
import { v4 as uuidv4 } from "uuid"; // uuidv4()
// eslint-disable-next-line new-cap
// import passport from "passport";
import { putObject } from "../../tools/aws/aws";
import multer from "multer";
import path from "path";
import fse from "fs-extra";
// const bucketName = process.env.AWSBUCKETNAME || "";
// const S3Prefix = process.env.S3PREFIX || "";
const mediaProxyPrefix = process.env.MEDIAPROXYPREFIX || "";

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
        const currentIconFileName = request.user.icon_path
          ? request.user.icon_path
          : "";
        // request.user.icon_pathから、拡張子だけを取り出す
        const currentIconPath = path.join(
          UpImgDirBase,
          "/icons",
          currentIconFileName
        );
        console.log(currentIconPath);
        // 画像のタイプをBase64から取得
        // ;base64の前までを取得
        const imgExt = request.body.file.split("/")[1].split(";")[0];
        // 画像はBase64で送られてくるので、デコードしてから画像を保存する
        const imgData = Buffer.from(
          request.body.file.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        // console.log(imgExt);
        // console.log(imgData);
        if (imgData) {
          // 拡張子を取得
          // const ext = temp_path.split(".").pop();
          const dest =
            path.join(path.join(UpImgDirBase, "/icons"), uuidv4()) +
            "." +
            imgExt;
          // ファイル名を取得
          const fileName = path.basename(dest);
          // console.log(fileName);
          // console.log("dest:", dest);
          // 画像を保存
          fse.writeFile(dest, imgData, (err) => {
            if (err) {
              console.log(err);
              response.status(200).send("画像の保存に失敗しました");
            } else {
              // console.log("画像の保存に成功しました");
              const iconPath: userTable["icon_path"] =
                "/images/icons/" + fileName;
              // console.log(icon_path);
              // userテーブルのicon_pathを更新
              knex("user")
                .where("id", userId)
                .update({
                  icon_path: iconPath,
                })
                .then(() => {
                  // 既存のアイコンを削除
                  const oldIconPath = currentIconPath;
                  if (oldIconPath) {
                    fse.removeSync(oldIconPath);
                    response.status(200).send("アイコンを更新しました");
                  } else {
                    response.status(200).send("画像の保存に成功しました");
                  }
                })
                .catch((err: any) => {
                  console.log(err);
                  response.status(200).send("画像の保存に失敗しました");
                });
            }
          });
        } else {
          response.status(200).send("ここまではきた");
        }
      } else {
        // ここにかく
        response.status(401).send("UnAuthorized");
      }
    } else {
      response.status(400).send("No file uploaded");
    }
  }
);

router.post(
  "/v2/posticon",
  multer({
    dest: path.join(UpImgDirBase, "/icons"),
    limits: { fieldSize: 50 },
  }).single("file"),
  function (request, response) {
    // console.log(request)
    if (request.body.file) {
      if (request.user) {
        // const userId = request.user.id;
        // 画像のタイプをBase64から取得
        // ;base64の前までを取得
        const imgExt = request.body.file.split("/")[1].split(";")[0];
        // 画像はBase64で送られてくるので、デコードしてから画像を保存する
        const imgData = Buffer.from(
          request.body.file.replace(/^data:image\/\w+;base64,/, ""),
          "base64"
        );
        // console.log(imgExt);
        // console.log(imgData);
        if (imgData) {
          // 拡張子を取得
          // const ext = temp_path.split(".").pop();
          const fileName = uuidv4() + "." + imgExt;
          // console.log(fileName);
          // console.log("dest:", dest);
          // 画像を保存
          const distUri = `${mediaProxyPrefix}/media/icon/${fileName}`;
          putObject(`media/icon/${fileName}`, imgData)
            .then(() => {
              console.log("画像の保存に成功しました");
              console.log("dist->");
              console.log(distUri);
              response.status(200).send("画像の保存に成功しました");
            })
            .catch((err: any) => {
              console.log(err);
              response.status(200).send(distUri);
            });
        } else {
          response.status(200).send("ここまではきた");
        }
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
