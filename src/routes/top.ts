import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
import { userTable } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
// import { checkLogin } from '../tools/user';
// import { side_menu } from '../TypeAlias/misc_alias';
import sideMenuList from "../tools/data/sidemenu.json";

/* GET home page. */
router.get("/", function (request, response) {
  response.render("top", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
  });
});

router.get("/sign_up", function (request, response) {
  response.render("./user/sign_up", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
  });
});

router.get("/password_forgot", function (request, response) {
  response.render("./user/mail_address_input", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
  });
});

router.get("/password_forgot/sent", function (request, response) {
  response.render("./user/outgoing_mail_completion", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
  });
});

router.get("/reset_password", function (request, response) {
  // getパラメータにtokenが無ければ400エラー
  if (!request.query.token) {
    response.status(400).send("Bad Request");
    return;
  }
  // tokenが一致するものを取得
  knex("password_reset")
    .where("token", request.query.token)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((results: string | any[]) => {
      // 一致するものがなければ400エラー
      if (results.length === 0) {
        response.status(403).send("UnAuthorized");
        return;
      }
      // 発行から1時間以内で無ければ403エラーを返し、該当するものを削除
      if (
        new Date().getTime() - results[0].datetime_issue.getTime() >
        1000 * 60 * 60
      ) {
        knex("password_reset")
          .where("token", request.query.token)
          .del()
          .then(() => {
            const message =
              "リンクの有効期限が切れました。<br>再度仮パスワードの発行を行ってください。。";
            response.render("./components/message", {
              side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                `${Boolean(request.user)}`
              ],
              message: message,
            });
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch(function (err: any) {
            console.log(err);
            response.status(500).send("Internal Server Error");
          });
        return;
      }
      // 一致するものがあれば、そのidを取得
      const id: userTable["id"] = results[0].id;
      // sessionにidを保存
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      request.session.id = id;
      response.render("./user/non_member_password_modification", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
      });
    });
});

router.get("/logout", function (request, response) {
  request.logout();
  const message = "ログアウトしました";
  response.render("./components/message", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    message: message,
  });
});

router.get("/mail_address_modification", function (request, response) {
  // passportを利用して、ユーザー情報を取得
  if (request.user === undefined) {
    response.status(403).send("UnAuthorized");
    return;
  }
  const mailaddress: userTable["mailaddress"] = request.user.mailaddress;

  response.render("./user/mail_address_modification", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    mailaddress: mailaddress,
  });
});

export default router;
