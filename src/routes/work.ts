import express from "express";
// import bcrypt from "bcrypt";
// import { sendMail } from "../../tools/sendmail";
import { knex } from "../app";
// eslint-disable-next-line camelcase
import { workTable, base_categoryTable } from "../tools/TypeAlias/tableType_alias";
import sideMenuList from "../tools/data/sidemenu.json";
import { pickHashTags } from "../tools/pickHashTags";
// import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line new-cap
const router = express.Router();
// import passport from "passport";
// import crypto from "crypto";

const env = process.env.U_DB_ENVIRONMENT || "development";
const host =
    env === "development"
        ? "http://localhost:3001"
        : "https://ulabeler.na2na.website";

// 無理無理無理無理無理無理無理無理無理無理後回し
//作品に対するいいねの状態を操作するもの。
/**
 * @method POST
 * @param {number} work_id 作品ID
 * @param {boolean} currentStatus 現在の状態。すでにいいねをしてあればtrueが入っている
 */
router.get("/:workId/report", function (request, response) {
    if (request.user) {
        console.log(request.params.workId);
        if (request.params.workId) {
            const workId = request.params.workId;
            // workテーブルに対象の作品が存在するか
            knex("work")
                .where("id", workId)
                .then(function (work: workTable[]) {
                    if (work.length > 0) {
                        response.render("work/report", {
                            "work": work[0], side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                                `${Boolean(request.user)}`
                            ],
                        });
                    }
                })
        } else {
            // console.log(request.params)
            response.send("hogehoge");
        }
    } else {
        response.send("fugafuga");
    }
})

router.get("/:workId/edit", function (request, response) {
    if (request.user) {
        if (request.params.workId) {
            const workId = request.params.workId;
            knex("work")
                .where("id", workId)
                .then(function (work: workTable[]) {
                    if (work.length > 0) {
                        // work[0]のbase_category_idに一致するname_subcategoryをbase_categoryから取得
                        knex("base_category")
                            .where("id", work[0].base_category_id)
                            .then(function (base_category: base_categoryTable[]) {
                                if (base_category.length > 0) {
                                    // sessionにwork[0]を保存
                                    request.session!.work = work[0];
                                    request.session!.baseCategory = base_category[0];
                                    response.render("work/work_detail_setting", {
                                        baseCategory: base_category[0],
                                        work: work[0],
                                        side_menu: JSON.parse(JSON.stringify(sideMenuList))[`${Boolean(request.user)}`],
                                        userInfo: request.user,
                                    });
                                }
                            }
                            )
                    } else {
                        response.render("components/message", {
                            message: "作品が見つかりませんでした。",
                            side_menu: JSON.parse(JSON.stringify(sideMenuList))[`${Boolean(request.user)}`],
                            userInfo: request.user,
                        });
                    }
                })
                .catch(function (error: any) {
                    console.log(error);
                }
                )
        }
    }
})

router.post("/:workId/edit/confirm", function (request, response) {
    if (!request.user) {
        response.status(401).send("UnAuthorized");
    } else {
        // workIdのスペースを取り除く
        const workId = request.params.workId.replace(/\s+/g, "");
        console.log(`${host}/work/${workId}/edit`)
        console.log(request.headers.referer)
        if (request.headers.referer !== `${host}/work/${workId}/edit`) {
            response.redirect("/invalidAccess");
            return;
        } else {
            if (!request.body.workName && !request.body.workIntroduction && !request.body.isPublic) {
                response.redirect("/invalidAccess");
            } else {
                let newIntroduction = request.body.workIntroduction;
                const parse = pickHashTags(newIntroduction);
                request.session!.parseResult = parse;
                response.render("work/work_detail_setting_confirmation", {
                    side_menu: JSON.parse(JSON.stringify(sideMenuList))[`${Boolean(request.user)}`],
                    userInfo: request.user,
                    work: request.session!.work,
                    newName: request.body.workName,
                    newIntroduction: parse.text,
                    newIsPublic: request.body.isPublic,
                    hashTag: parse.hashTag,
                    baseCategory: request.session!.baseCategory,
                });
            }
        }
    }
})

router.post("/:workId/edit/submit", function (request, response) {
    if (!request.user) {
        response.status(401).send("UnAuthorized");
    } else {
        // workIdのスペースを取り除く
        const workId = request.params.workId.replace(/\s+/g, "");
        console.log(`${host}/work/${workId}/confirm`)
        console.log(request.headers.referer)
        if (!request.session!.parseResult && !request.body.newIsPublic && !request.body.newName) {
            response.redirect("/invalidAccess");
        } else {
            // ハッシュタグ抽出
            let parseResult = request.session!.parseResult;
            const newIsPublic = request.body.newIsPublic;
            parseResult.hashTag = JSON.stringify(parseResult.hashTag);
            // @ts-ignore
            const newWork: workTable = {
                name: request.body.newName,
                flag_public: newIsPublic,
                hashtag: parseResult.hashTag,
                introduction: parseResult.text,
            }
            console.log(newWork);
            // workテーブルに対象の作品が存在するか
            knex("work")
                .where("id", workId)
                .then(function (work: workTable[]) {
                    if (work.length > 0) {
                        // workテーブルに対象の作品が存在する場合
                        // workテーブルの作品を更新
                        knex("work")
                            .where("id", workId)
                            .update(newWork)
                            .then(function () {
                                response.status(200).send(true);
                            })
                            .catch(function (error: any) {
                                console.log(error)
                                response.status(500).send(error);
                            }
                            )
                    } else {
                        response.status(404).send("Not Found");
                    }
                })
                .catch(function (error: any) {
                    response.status(500).send("Internal Server Error");
                    console.log(error);
                }
                )
        }
    }
})
export default router;
