import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
import { userTable } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
// import { checkLogin } from '../tools/user';
// import { side_menu } from '../TypeAlias/misc_alias';
import sideMenuList from "../tools/data/sidemenu.json";
import crypto from "crypto";

const env = process.env.U_DB_ENVIRONMENT || "development";
const host =
  env === "development"
    ? "http://localhost:3001"
    : "https://ulabeler.na2na.website";

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
  if (request.headers.referer !== `${host}/password_forgot`) {
    // TODO 後で書き直し
    response.redirect("/invalidAccess");
    return;
  } else {
    response.render("./components/message", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      message: "入力されたメールアドレスに<br>仮のパスワードを送信しました。",
    });
  }
});

router.get("/reset_password", function (request, response) {
  // getパラメータにtokenが無ければ400エラー
  if (!request.query.token) {
    response.redirect("/invalidAccess");
    return;
  }
  // tokenが一致するものを取得
  knex("password_reset")
    .where("token", request.query.token)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((results: string | any[]) => {
      // 一致するものがなければ400エラー
      if (results.length === 0) {
        response.redirect("/invalidAccess");
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
              "リンクの有効期限が切れました。<br>再度仮パスワードの発行を行ってください。";
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
    response.redirect("/invalidAccess");
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

router.get(
  "/mail_address_modification/sent_confirmation_code",
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
      });
    }
  }
);

router.get("/mail_address_modification/complete", function (request, response) {
  if (request.headers.referer !== `${host}/mail_address_modification`) {
    // TODO 後で書き直し
    response.redirect("/invalidAccess");
    return;
  } else {
    response.render("./components/message", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      message: "メールアドレスが変更されました。",
    });
  }
});

router.get(
  "/mail_address_modification/confirmationCode",
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
        });
        return;
      } else {
        response.render("components/message", {
          side_menu: JSON.parse(JSON.stringify(sideMenuList))[
            `${Boolean(request.user)}`
          ],
          message: "よさそう",
        });
      }
    }
  }
);

router.get("/invalidAccess", function (request, response) {
  response.render("./components/message", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    message: "不正な画面遷移です。",
  });
});

router.get("/notAvailable", function (request, response) {
  response.render("./components/message", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    message:
      "この画面が出ている原因として、以下の理由が考えられます<center><ul><li>未実装</li><li>ファイルが見つからない</li><li>リクエストURIが間違っている</li></ul></center>",
  });
});

export default router;
