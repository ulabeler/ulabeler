import express from "express";
// import { knex } from "../app";
// import bcrypt from 'bcrypt';
import { userTable } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
// import { checkLogin } from '../tools/user';
// import { side_menu } from '../TypeAlias/misc_alias';
import sideMenuList from "../tools/data/sidemenu.json";
import crypto from "crypto";
// const maxViewOnPage = 3; // 1ページに表示する最大件数

const env = process.env.U_DB_ENVIRONMENT || "development";
const host =
    env === "development"
        ? "http://localhost:3001"
        : "https://ulabeler.na2na.website";


router.get("/", function (request, response) {
    // passportを利用して、ユーザー情報を取得
    if (request.user === undefined) {
        response.redirect("/invalidAccess");
        return;
    }
    const mailaddress: userTable["mailaddress"] = request.user.mailaddress;

    response.render("./user/mail_address_modification", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
            `${Boolean(request.user)}`
        ],
        mailaddress: mailaddress,
        userInfo: request.user,
    });
});

router.get(
    "/sent_confirmation_code",
    function (request, response) {
        // 遷移元のページが/mail_address_modificationでない場合エラー画面へ
        if (request.headers.referer !== `${host}/mail_address_modification`) {
            response.redirect("/invalidAccess");
            return;
        } else {
            response.render("./components/message", {
                side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                    `${Boolean(request.user)}`
                ],
                message: "入力されたメースアドレスに<br>確認コードを送信しました。",
                userInfo: request.user,
            });
        }
    }
);

router.get("/complete", function (request, response) {
    if (request.user) {
        const userId = request.user.id;
        if (
            request.headers.referer !==
            `${host}/mail_address_modification/confirmationCode?id=${crypto
                .createHash("sha256")
                .update(userId, "utf8")
                .digest("hex")}`
        ) {
            response.redirect("/invalidAccess");
            return;
        } else {
            response.render("./components/message", {
                side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                    `${Boolean(request.user)}`
                ],
                message: "メールアドレスが変更されました。",
                userInfo: request.user,
            });
        }
    } else {
        response.redirect("/invalidAccess");
        return;
    }
});

router.get(
    "/confirmationCode",
    function (request, response) {
        // getパラメータにidが無ければエラー画面へ
        if (!request.query.id) {
            response.redirect("/invalidAccess");
            return;
        } else if (!request.user) {
            response.render("./components/message", {
                side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                    `${Boolean(request.user)}`
                ],
                message:
                    "メールアドレス変更手続きは、<br>ログインした状態で行ってください。。",
            });
            return;
        } else {
            const idForVerify: userTable["id"] = crypto
                .createHash("sha256")
                .update(request.user.id, "utf8")
                .digest("hex");
            const idFromQuery: string = request.query.id.toString();
            // トークン代わりに利用してるブツが一致するか検証
            if (idFromQuery !== idForVerify) {
                response.render("./components/message", {
                    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                        `${Boolean(request.user)}`
                    ],
                    message: "URLが正しくありません。",
                    userInfo: request.user,
                });
                return;
            } else {
                response.render("user/authorization_code_input", {
                    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                        `${Boolean(request.user)}`
                    ],
                    userInfo: request.user,
                });
            }
        }
    }
);

export default router;
