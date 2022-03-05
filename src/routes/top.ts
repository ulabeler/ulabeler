import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
import {
  userTable,
  workTable,
  // eslint-disable-next-line camelcase
  base_categoryTable,
  // eslint-disable-next-line camelcase
  favorited_work_numberTable,
  // eslint-disable-next-line camelcase
  favorited_workTable,
  cartTable,
} from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import config from "../config/config.json";
import { cartListWorkDetail, useWorkList } from "../tools/TypeAlias/miscAlias";
import { getUserSocialInfo } from "../tools/user";
import { getMaxPage, getRandomIdList } from "../tools/util";

const maxViewOnPage = config.maxViewOnPage || 8; // 1ページに表示する最大件数

const env = process.env.U_DB_ENVIRONMENT || "development";
let host = "https://ulabeler.na2na.website";
if (env === "development") {
  host = "http://localhost:3001";
} else if (env === "staging") {
  host = "https://devulabeler.na2na.website";
} else {
  host = "https://ulabeler.na2na.website";
}

/* GET home page. */
router.get("/", async function (request, response) {
  const libraryWorkNumOnView = 20;
  const userInfo = request.user ? request.user : null;
  const libraryWorkList = await getRandomIdList(libraryWorkNumOnView, userInfo);
  console.table(libraryWorkList);
  response.render("top", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    userInfo: userInfo,
    workList: libraryWorkList,
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

router.get("/withdrawal", async (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    await knex("user")
      .update({
        deleted_at: new Date(),
      })
      .where("id", request.user.id);
    request.logout();
    const message =
      "退会手続きが完了しました。<br>再びご利用いただけるのをお待ちしております。";
    response.render("./components/message", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      message: message,
    });
  }
});

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

router.get("/my_work", async function (request, response) {
  let currentPage = 1; // 現在のページ番号
  let idx = 0; // 対象ページの最初のインデックス(配列のオフセット)

  if (
    request.query.page !== undefined &&
    request.query.page !== "" &&
    request.query.page !== null &&
    request.query.page !== "1"
  ) {
    idx = (Number(request.query.page) - 1) * maxViewOnPage;
    currentPage = Number(request.query.page);
  }

  const currentPageDescription = {
    title: "マイ作品リスト",
    uriPrefix: "/my_work",
  };

  if (request.user) {
    const userInfo: userTable = {
      id: request.user.id,
      name: request.user.name,
      icon_path: request.user.icon_path,
    };
    const userId: userTable["id"] = request.user.id;

    // workから、userIdと一致するworkを取得
    const userWorkList: useWorkList[] = await knex("work")
      .where("created_by_user_id", userId)
      .andWhere("deleted_at", null)
      .orderBy("create_at", "desc")
      .catch((err: Error) => {
        console.log(err);
        response.status(500).send("Internal Server Error");
      });

    if (userWorkList.length === 0) {
      response.render("list/my_list_first", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        title: "マイ作品リスト",
        userInfo: userInfo,
      });
      return;
    }

    const maxPage = ~~(userWorkList.length / maxViewOnPage);

    // userWorkListについて、base_category_idを取得
    // 取得した値は、userWorkList[i].baseCategoryNameに格納する
    for (let i = 0; i < userWorkList.length; i++) {
      const baseCategoryId: workTable["base_category_id"] =
        userWorkList[i].base_category_id;
      const baseCategoryName: string = await knex("base_category")
        .where("id", baseCategoryId)
        // eslint-disable-next-line camelcase
        .then((baseCategory: base_categoryTable[]) => {
          return baseCategory[0].name_subcategory;
        });
      userWorkList[i].baseCategoryName = baseCategoryName;
    }

    // userWorkListについて、favorited_work_numberから、いいね数を取得
    // 取得した値は、userWorkList[i].favoritedWorkNumberに格納する
    for (let i = 0; i < userWorkList.length; i++) {
      const favoritedWorkNumber: number = await knex("favorited_work_number")
        .where("favorited_to_id", userWorkList[i].id)
        // eslint-disable-next-line camelcase
        .then((favoritedWorkNumber: favorited_work_numberTable[]) => {
          return favoritedWorkNumber[0].number;
        })
        .catch((err: Error) => {
          console.log(err);
          response.status(500).send("Internal Server Error");
        });
      userWorkList[i].favoritedWorkNumber = favoritedWorkNumber;
    }

    // userWorkListについて、favorited_workから、いいねしているかどうかを取得
    // 取得した値は、userWorkList[i].favoritedWorkListに格納する
    for (let i = 0; i < userWorkList.length; i++) {
      const favoritedWorkList: boolean[] = [];
      const favoritedWorkNumber: number = await knex("favorited_work")
        .where("favorite_to", userWorkList[i].id)
        .andWhere("favorite_from", userId)
        // eslint-disable-next-line camelcase
        .then((favoritedWork: favorited_workTable[]) => {
          return favoritedWork.length;
        });
      favoritedWorkList.push(favoritedWorkNumber > 0);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userWorkList[i].isFavorited = favoritedWorkList[0];
    }

    // topPageWorkList.hashtagのJSON文字列をパースして配列に格納
    for (let i = 0; i < userWorkList.length; i++) {
      const hashtag = userWorkList[i].hashtag;
      const hashtagArray: string = JSON.stringify(hashtag);
      userWorkList[i].hashtag = hashtagArray;
    }

    response.render("list/my_list", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      workList: userWorkList,
      idx: idx,
      maxPage: maxPage,
      maxViewOnPage: maxViewOnPage,
      currentPage: currentPage,
      userInfo: userInfo,
      currentPageDescription: currentPageDescription,
      isMine: true,
      isCreatorView: false,
    });
  } else {
    response.redirect("/invalidAccess");
    return;
  }
});

router.get("/creator_work/:userId", async function (request, response) {
  if (request.params.userId) {
    let currentPage = 1; // 現在のページ番号
    let idx = 0; // 対象ページの最初のインデックス(配列のオフセット)
    if (
      request.query.page !== undefined &&
      request.query.page !== "" &&
      request.query.page !== null &&
      request.query.page !== "1"
    ) {
      idx = (Number(request.query.page) - 1) * maxViewOnPage;
      currentPage = Number(request.query.page);
    }

    const currentPageDescription = {
      title: "作品一覧",
      uriPrefix: `/creator_work/${request.params.userId}`,
    };

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
    };
    // console.log("isMine:" + isMine);
    // request.query.userIdに対応するユーザーを取得
    const TEMPuserInfoRow = await getUserSocialInfo(request.params.userId);
    if (!TEMPuserInfoRow) {
      response.render("components/message", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        message: "ユーザーが見つかりませんでした。",
        userInfo: request.user,
      });
      return;
    } else {
      const userInfo: userTable = {
        id: TEMPuserInfoRow.id,
        name: TEMPuserInfoRow.name,
        icon_path: TEMPuserInfoRow.icon_path,
        self_introduction: TEMPuserInfoRow.self_introduction,
      };

      // request.query.userIdの作品を取得
      const userWorkList: useWorkList[] = await knex("work")
        .where("created_by_user_id", request.params.userId)
        .andWhere("flag_public", 1)
        .andWhere("deleted_at", null)
        .orderBy("create_at", "desc")
        .catch((err: Error) => {
          console.log(err);
          response.status(500).send("Internal Server Error");
          return;
        });

      if (userWorkList.length === 0) {
        response.render("list/creator_work_first", {
          side_menu: JSON.parse(JSON.stringify(sideMenuList))[
            `${Boolean(request.user)}`
          ],
          title: currentPageDescription.title,
          userInfo: userInfo,
        });
        return;
      } else {
        let maxPage = 0; // 適当入れてる

        if (userWorkList) {
          maxPage = getMaxPage("dummy", userWorkList.length, maxViewOnPage);
        }

        // userWorkListについて、base_category_idを取得
        // 取得した値は、userWorkList[i].baseCategoryNameに格納する
        for (let i = 0; i < userWorkList.length; i++) {
          const baseCategoryId: workTable["base_category_id"] =
            userWorkList[i].base_category_id;
          const baseCategoryName: string = await knex("base_category")
            .where("id", baseCategoryId)
            // eslint-disable-next-line camelcase
            .then((baseCategory: base_categoryTable[]) => {
              return baseCategory[0].name_subcategory;
            });
          userWorkList[i].baseCategoryName = baseCategoryName;
        }

        // userWorkListについて、favorited_work_numberから、いいね数を取得
        // 取得した値は、userWorkList[i].favoritedWorkNumberに格納する
        for (let i = 0; i < userWorkList.length; i++) {
          const favoritedWorkNumber: number = await knex(
            "favorited_work_number"
          )
            .where("favorited_to_id", userWorkList[i].id)
            // eslint-disable-next-line camelcase
            .then((favoritedWorkNumber: favorited_work_numberTable[]) => {
              return favoritedWorkNumber[0].number;
            });
          userWorkList[i].favoritedWorkNumber = favoritedWorkNumber;
        }

        // userWorkListについて、favorited_workから、いいねしているかどうかを取得
        // 取得した値は、userWorkList[i].favoritedWorkListに格納する
        if (request.user) {
          for (let i = 0; i < userWorkList.length; i++) {
            const favoritedWorkList: boolean[] = [];
            const favoritedWorkNumber: number = await knex("favorited_work")
              .where("favorite_to", userWorkList[i].id)
              .andWhere("favorite_from", request.user.id)
              // eslint-disable-next-line camelcase
              .then((favoritedWork: favorited_workTable[]) => {
                return favoritedWork.length;
              });
            favoritedWorkList.push(favoritedWorkNumber > 0);
            userWorkList[i].isFavorited = favoritedWorkList[0];
          }
        } else {
          for (let i = 0; i < userWorkList.length; i++) {
            const favoritedWorkList: boolean[] = [];
            favoritedWorkList.push(false);
            userWorkList[i].isFavorited = favoritedWorkList[0];
          }
        }

        // topPageWorkList.hashtagのJSON文字列をパースして配列に格納
        for (let i = 0; i < userWorkList.length; i++) {
          const hashtag = userWorkList[i].hashtag;
          const hashtagArray: string = JSON.stringify(hashtag);
          userWorkList[i].hashtag = hashtagArray;
        }

        response.render("list/creator_work", {
          side_menu: JSON.parse(JSON.stringify(sideMenuList))[
            `${Boolean(request.user)}`
          ],
          workList: userWorkList,
          idx: idx,
          maxPage: maxPage,
          maxViewOnPage: maxViewOnPage,
          currentPage: currentPage,
          userInfo: userInfo,
          currentPageDescription: currentPageDescription,
          isMine: isMine(),
          isCreatorView: false,
        });
      }
    }
  } else {
    response.redirect("/invalidAccess");
    return;
  }
});

router.get("/sitepolicy", (request, response) => {
  const userInfo = request.user ? request.user : null;
  response.render("sitePolicy", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    userInfo: userInfo,
  });
});

router.get("/privacypolicy", (request, response) => {
  const userInfo = request.user ? request.user : null;
  response.render("privacyPolicy", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    userInfo: userInfo,
  });
});

router.get("/faq", (request, response) => {
  const userInfo = request.user ? request.user : null;
  response.render("faq", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    userInfo: userInfo,
  });
});

router.get("/cart", async (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    const currentCartList: cartTable[] = await knex("cart").where(
      "userId",
      request.user.id
    );
    console.log(currentCartList);
    const currentCartWorkDetailList: cartListWorkDetail[] = [];
    for (let i = 0; i < currentCartList.length; i++) {
      const workInfo: workTable[] = await knex("work")
        .select("name", "thumbnail_path", "unit_price", "base_category_id")
        .where("id", currentCartList[i].workId);
      currentCartWorkDetailList[i] = {
        workName: workInfo[0].name,
        workImagePath: workInfo[0].thumbnail_path,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        unitPrice: parseInt(workInfo[0].unit_price),
        baseCategoryId: workInfo[0].base_category_id,
      };
    }

    for (let i = 0; i < currentCartList.length; i++) {
      // eslint-disable-next-line camelcase
      const currentCartWorkCategoryName: base_categoryTable[] = await knex(
        "base_category"
      )
        .select("name_subcategory")
        .where("id", currentCartWorkDetailList[i].baseCategoryId);
      currentCartWorkDetailList[i].baseCategoryName =
        currentCartWorkCategoryName[0].name_subcategory;
    }

    for (let i = 0; i < currentCartList.length; i++) {
      currentCartWorkDetailList[i].workId = currentCartList[i].workId;
      currentCartWorkDetailList[i].quantity = currentCartList[i].quantity;
    }

    console.table(currentCartWorkDetailList);

    response.render("cart", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      currentCartWorkDetailList: currentCartWorkDetailList,
    });
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
