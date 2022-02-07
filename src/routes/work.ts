import express from "express";
// import bcrypt from "bcrypt";
// import { sendMail } from "../../tools/sendmail";
import { knex } from "../app";
// eslint-disable-next-line camelcase
import { workTable } from "../tools/TypeAlias/tableType_alias";
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
router.get("/:workId/report", function (request, response) {
    if (request.user) {
        if (request.params.workId) {
            const workId = request.query.workId;
            // workテーブルに対象の作品が存在するか
            knex("work")
                .where("id", workId)
                .then(function (work: workTable[]) {
                    if (work.length > 0) {
                        response.render("work/report", { "work": work[0] });
                    }
                })
        } else {
            // console.log(request.params)
            response.redirect("/invalidAccess");
        }
    } else {
        response.redirect("/invalidAccess");
    }
})

export default router;
