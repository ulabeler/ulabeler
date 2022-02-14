import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
import { userTable, workTable, base_categoryTable, favorited_work_numberTable, favorited_workTable } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
// import { checkLogin } from '../tools/user';
// import { side_menu } from '../TypeAlias/misc_alias';
import sideMenuList from "../tools/data/sidemenu.json";
import crypto from "crypto";
const maxViewOnPage = 3; // 1ページに表示する最大件数

const env = process.env.U_DB_ENVIRONMENT || "development";
const host =
  env === "development"
    ? "http://localhost:3001"
    : "https://ulabeler.na2na.website";

/* GET home page. */
router.get("/", function (request, response) {
  const userInfo = request.user ? request.user : null;
  response.render("top", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    userInfo: userInfo,
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
    userInfo: request.user,
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
        userInfo: request.user,
      });
    }
  }
);

router.get("/mail_address_modification/complete", function (request, response) {
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

router.get("/reset_password/complete", function (request, response) {
  if (request.headers.referer) {
    const rawReferer = request.headers.referer;
    // refererからgetパラメータを取り除く
    const referer = rawReferer.split("?")[0];
    const exists = ["/reset_password", "/password/modification"];
    // refererとexistsの中にあるものがあれば、完了画面へ
    if (host + exists[0] == referer || host + exists[1] == referer) {
      response.render("./components/message", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        message: "パスワードが変更されました。",
        userInfo: request.user,
      });
      return;
    }
  }
  response.redirect("/invalidAccess");
});


router.get("/password/modification", function (request, response) {
  if (request.user) {
    response.render("user/member_password_modification", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
    });
  } else {
    response.redirect("/invalidAccess");
    return;
  }
});

router.get("/my_work", function (request, response) {
  let currentPage = 1; // 現在のページ番号
  let idx = 0; // 対象ページの最初のインデックス(配列のオフセット)
  if (request.query.page !== undefined && request.query.page !== "" && request.query.page !== null && request.query.page !== "1") {
    idx = (Number(request.query.page) - 1) * maxViewOnPage;
    currentPage = Number(request.query.page);
  }
  if (request.user) {
    // @ts-ignore
    const userInfo: userTable = {
      id: request.user.id,
      name: request.user.name,
      icon_path: request.user.icon_path,
    }
    const userId: userTable["id"] = request.user.id;
    // workから、userIdと一致するworkを取得
    knex("work")
      .where("created_by_user_id", userId)
      .orderBy("create_at", "asc")
      .then(async function (workList: workTable[]) {
        // workList.base_category_idをキーにして、base_categoryテーブルからカテゴリ名を取得し、workListに追加
        const baseCategoryList: base_categoryTable[] = [];
        await new Promise((resolve) => {
          if (workList.length === 0) {
            response.render("list/my_list_first", {
              side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                `${Boolean(request.user)}`
              ],
              title: "マイ作品リスト",
              userInfo: userInfo,
            });
            resolve("NoWorks");
            return;
          }
          workList.forEach((work: workTable) => {
            knex("base_category")
              .where("id", work.base_category_id)
              .then((baseCategory: base_categoryTable[]) => {
                baseCategoryList.push(baseCategory[0]);
                if (baseCategoryList.length === workList.length) {
                  const maxPage = ~~(baseCategoryList.length / maxViewOnPage) + 1;
                  const currentPageDescription = {
                    title: "マイ作品リスト",
                    "uriPrefix": "/my_work",
                  };
                  response.render("list/my_list", {
                    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                      `${Boolean(request.user)}`
                    ],
                    workList: workList,
                    baseCategoryList: baseCategoryList,
                    idx: idx,
                    maxPage: maxPage,
                    maxViewOnPage: maxViewOnPage,
                    currentPage: currentPage,
                    userInfo: userInfo,
                    currentPageDescription: currentPageDescription,
                    isMine: true,
                    isCreatorView: false,
                  });
                  resolve("ok");
                  return;
                }
              });
          });
        });
      });
  } else {
    response.redirect("/invalidAccess");
    return;
  }
});

router.get("/creator_work/:userId", function (request, response) {
  if (request.params.userId) {
    let currentPage = 1; // 現在のページ番号
    let idx = 0; // 対象ページの最初のインデックス(配列のオフセット)
    if (request.query.page !== undefined && request.query.page !== "" && request.query.page !== null && request.query.page !== "1") {
      idx = (Number(request.query.page) - 1) * maxViewOnPage;
      currentPage = Number(request.query.page);
    }
    // request.query.userIdとrequest.user.idが一致する場合isMineにtrueを設定
    const isMine = () => {
      if (request.user) {
        if (request.params.userId == request.user.id) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    // console.log("isMine:" + isMine);
    // request.query.userIdに対応するユーザーを取得
    knex("user")
      .select("id", "name", "icon_path", "self_introduction")
      .where("id", request.params.userId)
      .then(async function (userList: userTable[]) {
        if (userList.length === 0) {
          response.render('components/message', {
            side_menu: JSON.parse(JSON.stringify(sideMenuList))[
              `${Boolean(request.user)}`
            ],
            message: "ユーザーが見つかりませんでした。",
            userInfo: request.user,
          });
          return;
        }
        // @ts-ignore
        const userInfo: userTable = {
          id: userList[0].id,
          name: userList[0].name,
          icon_path: userList[0].icon_path,
          self_introduction: userList[0].self_introduction,
        }
        // workから、userIdと一致するworkを取得
        knex("work")
          .where("created_by_user_id", userInfo.id)
          .orderBy("create_at", "asc")
          .then(async function (workList: workTable[]) {
            // workList.base_category_idをキーにして、base_categoryテーブルからカテゴリ名を取得し、workListに追加
            const baseCategoryList: base_categoryTable[] = [];
            await new Promise((resolve) => {
              if (workList.length === 0) {
                response.render("list/creator_work_first", {
                  side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                    `${Boolean(request.user)}`
                  ],
                  title: "作品一覧",
                  userInfo: request.user,
                });
                resolve("NoWorks");
                return;
              }
              workList.forEach((work: workTable) => {
                knex("base_category")
                  .where("id", work.base_category_id)
                  .then((baseCategory: base_categoryTable[]) => {
                    baseCategoryList.push(baseCategory[0]);
                    if (baseCategoryList.length === workList.length) {
                      const maxPage = ~~(baseCategoryList.length / maxViewOnPage) + 1;
                      const currentPageDescription = {
                        title: "作品一覧",
                        "uriPrefix": "/creator_work",
                      };
                      // workList.idそれぞれについて、favorited_work_numberから、いいね数を取得
                      const favoritedWorkNumberList: number[] = [];
                      workList.forEach((work: workTable) => {
                        knex("favorited_work_number")
                          .where("favorited_to_id", work.id)
                          .then((favoritedWorkNumber: favorited_work_numberTable[]) => {
                            favoritedWorkNumberList.push(favoritedWorkNumber.length);
                            if (favoritedWorkNumberList.length === workList.length) {
                              // workList.idそれぞれについて、favorited_workからいいねしているかどうかを取得。
                              // 該当レコードがなければfalse、あればtrueを配列に格納する
                              const favoritedWorkList: boolean[] = [];
                              workList.forEach((work: workTable) => {
                                knex("favorited_work")
                                  .where("favorite_to", work.id)
                                  .andWhere("favorite_from", request.user!.id)
                                  .then((favoritedWork: favorited_workTable[]) => {
                                    favoritedWorkList.push(favoritedWork.length > 0);
                                    if (favoritedWorkList.length === workList.length) {
                                      response.render("list/creator_work", {
                                        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                                          `${Boolean(request.user)}`
                                        ],
                                        workList: workList,
                                        baseCategoryList: baseCategoryList,
                                        idx: idx,
                                        maxPage: maxPage,
                                        maxViewOnPage: maxViewOnPage,
                                        currentPage: currentPage,
                                        userInfo: userInfo,
                                        currentPageDescription: currentPageDescription,
                                        isMine: isMine(),
                                        isCreatorView: true,
                                        favoritedWorkNumberList: favoritedWorkNumberList,
                                        favoritedWorkList: favoritedWorkList,
                                      });
                                      resolve("ok");
                                      return;
                                    }
                                  }
                                  );
                                // response.render("list/creator_work", {
                                //   side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                                //     `${Boolean(request.user)}`
                                //   ],
                                //   workList: workList,
                                //   baseCategoryList: baseCategoryList,
                                //   idx: idx,
                                //   maxPage: maxPage,
                                //   maxViewOnPage: maxViewOnPage,
                                //   currentPage: currentPage,
                                //   userInfo: userInfo,
                                //   currentPageDescription: currentPageDescription,
                                //   isMine: isMine(),
                                //   isCreatorView: true,
                                //   favoritedWorkNumberList: favoritedWorkNumberList,
                                // });
                                // resolve("ok");
                                // return;
                              }
                              );
                            }
                          });
                      });
                    }
                  });
              });
            });
          });
      });
  } else {
    response.redirect("/invalidAccess");
    return;
  }
});

router.get("/settings/profile", (request, response) => {
  if (request.user) {
    response.render("user/member_information_confirmation", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      userInfo: request.user,
    });
  } else {
    response.redirect("/invalidAccess");
  }
});

router.get("/settings/profile/edit", (request, response) => {
  if (request.user) {
    response.render("user/member_information_modification", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      userInfo: request.user,
    });
  } else {
    response.redirect("/invalidAccess");
  }
});

router.get("/settings/profile/edit/icon", (request, response) => {
  if (request.user) {
    response.render("user/icon_modification", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      userInfo: request.user,
    });
  } else {
    response.redirect("/invalidAccess");
  }
});

router.get("/invalidAccess", function (request, response) {
  const userInfo = request.user ? request.user : null;
  response.render("./components/message", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    message: "不正な画面遷移です。",
    userInfo: userInfo,
  });
});

router.get("/notAvailable", function (request, response) {
  const userInfo = request.user ? request.user : null;
  response.render("./components/message", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    message:
      "この画面が出ている原因として、以下の理由が考えられます<center><ul><li>未実装</li><li>ファイルが見つからない</li><li>リクエストURIが間違っている</li></ul></center>",
    userInfo: userInfo,
  });
});

export default router;
