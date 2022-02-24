/* eslint-disable no-invalid-this */
import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line new-cap
const router = express.Router();
// import sideMenuList from "../tools/data/sidemenu.json";
import { searchWordParse } from "../tools/parser";

import { workTable } from "tools/TypeAlias/tableType_alias";

router.get("/", (request, response) => {
  console.log(request.query.q);
  const searchQuery = searchWordParse(request.query.q as string);
  console.table(searchQuery);
  if (searchQuery.length !== 0) {
    // searchQueryに@が含まれる要素がある場合、userTableからそのユーザーのidを取得
    if (searchQuery.length === 1 && searchQuery[0].includes("@")) {
      response.redirect(`/creator_work/${searchQuery[0].slice(1)}`);
      return;
    } else {
      for (let i = 0; i < searchQuery.length; i++) {
        if (searchQuery[i].indexOf("@") !== -1) {
          // searchQuery[i]以外の要素を別の配列に格納
          const searchQueryWithoutUserId = searchQuery
            .slice(0, i)
            .concat(searchQuery.slice(i + 1));
          knex("work")
            .where("created_by_user_id", searchQuery[i].slice(1))
            // andWhereで検索条件を追加。
            // searchQueryWithoutUserIdの要素数分だけ繰り返す
            // nameを検索
            .andWhere(function () {
              for (let j = 0; j < searchQueryWithoutUserId.length; j++) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.andWhere(
                  "name",
                  "like",
                  `%${searchQueryWithoutUserId[j]}%`
                );
              }
            })
            .then((resultWork: workTable[]) => {
              if (resultWork.length !== 0) {
                response.status(200).json(resultWork);
                return;
              } else {
                response.status(200).send("対象の作品は見つかりませんでした。");
                return;
              }
            });
        }
      }
    }
  }
});

export default router;
