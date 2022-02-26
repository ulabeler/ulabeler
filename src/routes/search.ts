/* eslint-disable no-invalid-this */
import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import { searchQueryParser } from "../tools/parser";
import { parsedQuery, searchResult } from "../tools/TypeAlias/miscAlias";
import { searchWork, searchUser } from "../tools/search";
import { getMaxPage } from "../tools/util";

import {
  userTable,
  workTable,
  // eslint-disable-next-line camelcase
  base_categoryTable,
} from "tools/TypeAlias/tableType_alias";

router.get("/", async (request, response) => {
  const parsedQuery: parsedQuery = searchQueryParser(request.query.q as string);
  console.table(parsedQuery);
  if (parsedQuery.userId && parsedQuery.rawQuery.length === 1) {
    // ユーザーidが含まれている場合の処理
    knex("user")
      .where("id", parsedQuery.userId)
      .select("id")
      .then((user: userTable[]) => {
        if (user.length === 0) {
          response.render("search_error", {
            side_menu: JSON.parse(JSON.stringify(sideMenuList))[
              `${Boolean(request.user)}`
            ],
            recentQuery: request.query.q,
          });
          return;
        } else {
          response.redirect(
            `/creator_work/${parsedQuery.userId}?q=${request.query.q}`
          );
          return;
        }
      })
      .catch((error: Error) => {
        console.log(error);
      });
  } else if (parsedQuery.rawQuery.length !== 0) {
    const viewType = "searchResult";
    let currentPage = 1;
    let idx = 0;
    const maxViewOnPage = 4;
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
      title: "検索結果",
      uriPrefix: `/search/?q=${request.query.q}&page=`,
    };
    const searchResult: searchResult = {
      workList: await searchWork(parsedQuery),
      singleUserSearchResult: await searchUser(parsedQuery),
    };

    let maxPage = 0; // 適当入れてる

    if (searchResult.workList) {
      maxPage = getMaxPage(
        viewType,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchResult.workList.length,
        maxViewOnPage
      );
      // それぞれの作者情報の取得。お気に入り作品リストと同じような処理すればいいはず
      // 対象の作品のお気に入り数の取得
      // ログイン状態により分岐
      // お気に入りしているか

      // searchResult.workListにある作品のbaseCategoryNameの取得
      // 結果はsearchResult.workList.baseCategoryNameに格納
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (let i = 0; i < searchResult.workList.length; i++) {
        const baseCategoryId: workTable["base_category_id"] =
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          searchResult.workList[i].base_category_id;
        const baseCategoryName: string = await knex("base_category")
          .where("id", baseCategoryId)
          // eslint-disable-next-line camelcase
          .then((baseCategory: base_categoryTable[]) => {
            return baseCategory[0].name_subcategory;
          });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchResult.workList[i].baseCategoryName = baseCategoryName;
      }

      // 作品の作者の"name","icon_path"を取得
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      for (let i = 0; i < searchResult.workList.length; i++) {
        const userInfo: userTable[] = await knex("user")
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          .where("id", searchResult.workList[i].created_by_user_id)
          // eslint-disable-next-line camelcase
          .then((user: userTable[]) => {
            return [
              {
                name: user[0].name,
                icon_path: user[0].icon_path,
              },
            ];
          });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchResult.workList[i].creatorName = userInfo[0].name as string;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        searchResult.workList[i].creatorIconPath = userInfo[0]
          .icon_path as string;
      }

      if (request.user) {
        // myFavoriteWorkListについて、created_by_user_idとrequest.user.idが同じかどうかを判定
        // 取得した値は、searchResult.workList[i].userFlagIsMineに格納する
        // お気に入りしているかどうかの判定
        // 取得した値はsearchResult.workList[i].isFavoritedに格納する
      }
    }

    // TODO ユーザーが複数ヒットした時にsingleUserSearchResultの値を使わないように(ejs側で対応済み、falseにしてるところに条件を入れる)
    // TODO ユーザー名と作品名をごちゃまぜにして検索できるフリーワード検索時、workListのものと被る可能性があるので、被るものは除外し、新たな配列を用意して渡す。渡した後にはfalseを入れる。
    console.table(searchResult.workList);
    response.render("list/search_result", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      searchResult: searchResult,
      parsedQuery: parsedQuery,
      recentQuery: request.query.q,
      currentPage: currentPage,
      currentPageDescription: currentPageDescription,
      isCreatorView: viewType,
      idx: idx,
      maxPage: maxPage,
    });
  } else {
    // クエリが空の場合の処理
    response.render("search_error", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      recentQuery: request.query.q,
    });
    return;
  }
});

export default router;
