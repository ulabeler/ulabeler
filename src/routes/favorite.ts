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
  // eslint-disable-next-line camelcase
  favorited_userTable,
} from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import { myFavoriteWorkList } from "../tools/TypeAlias/miscAlias";
import config from "../config/config.json";
const maxViewOnPage = config.maxViewOnPage || 8; // 1ページに表示する最大件数

router.get("/work", async (request, response) => {
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
    // eslint-disable-next-line camelcase
    const favoritedWorkList: favorited_workTable[] = await knex(
      "favorited_work"
    )
      .where("favorite_from", userId)
      .orderBy(orderBy)
      .catch((error: Error) => {
        console.log(error);
      });

    if (favoritedWorkList.length === 0) {
      response.render("list/my_favorite_work_list_first", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        currentPageDescription: currentPageDescription,
        isCreatorView: "myFavWorkList",
      });
    } else {
      // それぞれのfavorite.toから、workテーブルを取得し結果を配列に格納する。
      const myFavoriteWorkList: myFavoriteWorkList[] = [];
      for (let i = 0; i < favoritedWorkList.length; i++) {
        const work: workTable[] = await knex("work")
          .where("id", favoritedWorkList[i].favorite_to)
          .catch((error: Error) => {
            console.log(error);
          });
        myFavoriteWorkList.push({
          id: work[0].id,
          created_by_user_id: work[0].created_by_user_id,
          base_category_id: work[0].base_category_id,
          name: work[0].name,
          work_tex_path: work[0].work_tex_path,
          thumbnail_path: work[0].thumbnail_path,
          flag_public: work[0].flag_public,
          unit_price: work[0].unit_price,
          hashtag: work[0].hashtag,
          introduction: work[0].introduction,
          create_at: work[0].create_at,
          num_of_images: work[0].num_of_images,
          favorited_at: favoritedWorkList[i].favorited_at,
          isFavorited: true,
        });
      }

      // userWorkListについて、base_category_idを取得
      // 取得した値は、myFavoriteWorkList[i].baseCategoryNameに格納する
      for (let i = 0; i < myFavoriteWorkList.length; i++) {
        const baseCategoryId: workTable["base_category_id"] =
          myFavoriteWorkList[i].base_category_id;
        const baseCategoryName: string = await knex("base_category")
          .where("id", baseCategoryId)
          // eslint-disable-next-line camelcase
          .then((baseCategory: base_categoryTable[]) => {
            return baseCategory[0].name_subcategory;
          });
        myFavoriteWorkList[i].baseCategoryName = baseCategoryName;
      }

      // userWorkListについて、favorited_work_numberから、いいね数を取得
      // 取得した値は、myFavoriteWorkList[i].favoritedWorkNumberに格納する
      for (let i = 0; i < myFavoriteWorkList.length; i++) {
        const favoritedWorkNumber: number = await knex("favorited_work_number")
          .where("favorited_to_id", myFavoriteWorkList[i].id)
          // eslint-disable-next-line camelcase
          .then((favoritedWorkNumber: favorited_work_numberTable[]) => {
            return favoritedWorkNumber[0].number;
          });
        myFavoriteWorkList[i].favoritedWorkNumber = favoritedWorkNumber;
      }

      // myFavoriteWorkListについて、作品の作者の"name","icon_path"を取得
      // 取得した値は、myFavoriteWorkList[i].userInfoに格納する
      for (let i = 0; i < myFavoriteWorkList.length; i++) {
        const userInfo: userTable[] = await knex("user")
          .where("id", myFavoriteWorkList[i].created_by_user_id)
          // eslint-disable-next-line camelcase
          .then((user: userTable[]) => {
            return [
              {
                name: user[0].name,
                icon_path: user[0].icon_path,
              },
            ];
          });
        myFavoriteWorkList[i].name = userInfo[0].name as string;
        myFavoriteWorkList[i].creatorIconPath = userInfo[0].icon_path as string;
      }

      // myFavoriteWorkListについて、created_by_user_idとrequest.user.idが同じかどうかを判定
      // 取得した値は、myFavoriteWorkList[i].userFlagIsMineに格納する
      for (let i = 0; i < myFavoriteWorkList.length; i++) {
        const userFlagIsMine: boolean =
          myFavoriteWorkList[i].created_by_user_id === request.user.id;
        myFavoriteWorkList[i].userFlagIsMine = userFlagIsMine;
      }

      let maxPage = ~~(myFavoriteWorkList.length / maxViewOnPage);
      if (myFavoriteWorkList.length % maxViewOnPage !== 0) {
        maxPage++;
      }

      response.render("list/my_favorite_work_list", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        workList: myFavoriteWorkList,
        idx: idx,
        maxPage: maxPage,
        maxViewOnPage: maxViewOnPage,
        currentPage: currentPage,
        currentPageDescription: currentPageDescription,
        favoritedWorkList: favoritedWorkList,
        isCreatorView: "myFavWorkList",
      });
    }
  }
});

router.get("/v1/creator", (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    // request.query.viewTypeがundefinedの場合は、"list"をviewTypeに設定。
    // viewTypeには"list"か"tile"が入る。
    const viewType = request.query.viewType === "tile" ? "tile" : "list";
    const orderBy = request.query.orderBy
      ? request.query.orderBy
      : "favorited_at"; // 後で変更するかは要検討。UI見るに可変ではなさそうな気はする。
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
      title: "お気に入り作者リスト",
      uriPrefix: `/favorite/creator`,
    };
    const userId = request.user.id;
    // お気に入り作者リストを取得
    knex("favorited_user")
      .where("favorite_from", userId)
      .orderBy(orderBy)
      // eslint-disable-next-line camelcase
      .then((favoritedUser: favorited_userTable[]) => {
        if (favoritedUser.length == 0) {
          response.status(500).send("お気に入り作者がありません");
        } else {
          console.log(viewType);
          console.log(currentPage);
          console.log(idx);
          response.render("list/my_favorite_creator_list1", {
            side_menu: JSON.parse(JSON.stringify(sideMenuList))[
              `${Boolean(request.user)}`
            ],
            currentPageDescription: currentPageDescription,
          });
        }
      });
  }
});

router.get("/creator", async (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    // request.query.viewTypeがundefinedの場合は、"list"をviewTypeに設定。
    // viewTypeには"list"か"tile"が入る。
    const viewType = request.query.viewType === "tile" ? "tile" : "list";
    const orderBy = request.query.orderBy
      ? request.query.orderBy
      : "favorited_at"; // 後で変更するかは要検討。UI見るに可変ではなさそうな気はする。
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
      title: "お気に入り作者リスト",
      uriPrefix: `/favorite/creator`,
    };
    const userId = request.user.id;
    // お気に入り作者リストを取得
    // eslint-disable-next-line camelcase
    const favoritedUser: favorited_userTable[] = await knex("favorited_user")
      .where("favorite_from", userId)
      .orderBy(orderBy);
    if (favoritedUser.length == 0) {
      console.log(viewType);
      console.log(currentPage);
      console.log(idx);
      response.render("list/my_favorite_creator_list1", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        currentPageDescription: currentPageDescription,
      });
    } else {
      const myFavoriteCreatorList: userTable[] = [];
      // favoritedUserのfavorite_toのidに一致するuserを取得
      for (let i = 0; i < favoritedUser.length; i++) {
        const user: userTable = await knex("user")
          .select("id", "name", "icon_path", "self_introduction")
          .where("id", favoritedUser[i].favorite_to)
          .first();
        myFavoriteCreatorList.push(user);
      }

      console.table(myFavoriteCreatorList);
      console.log(viewType);
      console.log(currentPage);
      console.log(idx);
      response.status(200).send("お気に入り作者あり");
    }
  }
});

export default router;
