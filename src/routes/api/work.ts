import express from "express";
// import bcrypt from "bcrypt";
// import { sendMail } from "../../tools/sendmail";
// import { knex } from "../../app";
// eslint-disable-next-line camelcase
// import {
//   userTable,
//   favorited_workTable,
//   favorited_work_numberTable,
//   favorited_userTable
// } from "../../tools/TypeAlias/tableType_alias";
// import sideMenuList from "../../tools/data/sidemenu.json";
// import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line new-cap
const router = express.Router();
// import passport from "passport";
// import crypto from "crypto";


// 無理無理無理無理無理無理無理無理無理無理後回し
//作品に対するいいねの状態を操作するもの。
/**
 * @method POST
 * @param {number} work_id 作品ID
 * @param {boolean} currentStatus 現在の状態。すでにいいねをしてあればtrueが入っている
 */
router.post(
    "/work/favorite",
    function (request, response) {
        // bodyにはwork_idが入っていなければ400エラー
        if (!request.body.work_id && !request.body.currentStatus) {
            response.status(400).send("Bad Request");
            return;
        }else{
            if (request.user) {
                response.status(200).send("unchi");
            }else{
                response.status(401).send("Unauthorized");
            }
        }
    }
);

export default router;
