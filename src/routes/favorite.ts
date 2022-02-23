import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
import {
  userTable,
  workTable,
  // eslint-disable-next-line camelcase
  base_categoryTable,
  // eslint-disable-next-line camelcase
  //   favorited_work_numberTable,
  // eslint-disable-next-line camelcase
  favorited_workTable,
} from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import config from "../config/config.json";
const maxViewOnPage = config.maxViewOnPage || 8; // 1ページに表示する最大件数

router.get("/work", (request, response) => {
  const orderBy = request.query.orderBy
    ? request.query.orderBy
    : "favorited_at"; // 後で変更するかは要検討。UI見るに可変ではなさそうな気はする。
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
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
      title: "お気に入り作品リスト",
      uriPrefix: `/favorite/work`,
    };
    const userId = request.user.id;
    // favorited_workTableから、favorite_fromがuserIdのレコードを取得
    knex("favorited_work")
      .where("favorite_from", userId)
      .orderBy(orderBy)
      // eslint-disable-next-line camelcase
      .then((favoritedWork: favorited_workTable[]) => {
        if (favoritedWork.length == 0) {
          response.render("list/my_favorite_work_list", {
            side_menu: JSON.parse(JSON.stringify(sideMenuList))[
              `${Boolean(request.user)}`
            ],
            currentPageDescription: currentPageDescription,
            workList: null,
          });
        } else {
          let maxPage = ~~(favoritedWork.length / maxViewOnPage);
          if (favoritedWork.length % maxViewOnPage !== 0) {
            maxPage++;
          }
          console.log(maxPage);
          console.log(favoritedWork.length);
          // それぞれのレコードのfavorite_toを取得し、workTableからそれぞれのレコードを取得
          const favoritedWorkIdList: string[] = [];
          const favoritedWorkList: boolean[] = [];
          // eslint-disable-next-line camelcase
          favoritedWork.forEach((favoritedWork: favorited_workTable) => {
            favoritedWorkIdList.push(favoritedWork.favorite_to);
            favoritedWorkList.push(true);
          });
          knex("work")
            .whereIn("id", favoritedWorkIdList)
            .then((workList: workTable[]) => {
              // workTableから、user_idがuserIdのレコードを取得
              knex("user")
                .where("id", userId)
                .then((user: userTable[]) => {
                  const userFlagIsMine: boolean[] = [];
                  // user.idとwork.user_idが一致するかどうかを判定し、一致する場合はtrueを返す
                  workList.forEach((work: workTable) => {
                    userFlagIsMine.push(work.created_by_user_id === userId);
                  });
                  // workList.base_category_idをキーにして、base_categoryテーブルからカテゴリ名を取得し、workListに追加
                  // eslint-disable-next-line camelcase
                  const baseCategoryList: base_categoryTable[] = [];
                  workList.forEach((work: workTable) => {
                    knex("base_category")
                      .where("id", work.base_category_id)
                      // eslint-disable-next-line camelcase
                      .then((baseCategory: base_categoryTable[]) => {
                        baseCategoryList.push(baseCategory[0]);
                        // workList.idそれぞれについて、favorited_work_numberから、いいね数を取得
                        if (baseCategoryList.length === workList.length) {
                          const favoritedWorkNumberList: number[] = [];
                          favoritedWorkIdList.forEach(
                            (favoritedWorkId: string) => {
                              knex("favorited_work")
                                .where("favorite_to", favoritedWorkId)
                                .then(
                                  (
                                    // eslint-disable-next-line camelcase
                                    favoritedWorkNumber: favorited_workTable[]
                                  ) => {
                                    favoritedWorkNumberList.push(
                                      favoritedWorkNumber.length
                                    );
                                    if (
                                      favoritedWorkNumberList.length ===
                                      workList.length
                                    ) {
                                      response.render(
                                        "list/my_favorite_work_list",
                                        {
                                          side_menu: JSON.parse(
                                            JSON.stringify(sideMenuList)
                                          )[`${Boolean(request.user)}`],
                                          workList: workList,
                                          baseCategoryList: baseCategoryList,
                                          idx: idx,
                                          maxPage: maxPage,
                                          maxViewOnPage: maxViewOnPage,
                                          currentPage: currentPage,
                                          userInfo: user,
                                          currentPageDescription:
                                            currentPageDescription,
                                          isMine: userFlagIsMine,
                                          favoritedWorkList: favoritedWorkList,
                                          isCreatorView: "myFavWorkList",
                                          favoritedWorkNumberList:
                                            favoritedWorkNumberList, // お気に入り数
                                        }
                                      );
                                    }
                                  }
                                )
                                .catch((error: Error) => {
                                  console.log(error);
                                });
                            }
                          );
                        }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                      });
                  });
                })
                .catch((error: Error) => {
                  console.log(error);
                });
            });
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }
});

export default router;
