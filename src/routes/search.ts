/* eslint-disable no-invalid-this */
import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import { searchWordParse, searchQueryParser } from "../tools/parser";
import { parsedQuery } from "../tools/TypeAlias/miscAlias";

import { userTable, workTable } from "tools/TypeAlias/tableType_alias";

router.get("/old/", (request, response) => {
  console.log(request.query.q);
  const searchQuery = searchWordParse(request.query.q as string);
  console.table(searchQuery);
  if (searchQuery.length !== 0) {
    // searchQueryに@が含まれる要素がある場合、userTableからそのユーザーのidを取得
    if (searchQuery.length === 1 && searchQuery[0].includes("@")) {
      knex("user")
        .where("id", searchQuery[0].slice(1))
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
              `/creator_work/${searchQuery[0].slice(1)}?q=${request.query.q}`
            );
            return;
          }
        });
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
            .on("query", function (data: string[]) {
              console.log(data);
            })
            .then((resultWork: workTable[]) => {
              if (resultWork.length !== 0) {
                response.status(200).json(resultWork);
                return;
              } else {
                response.render("search_error", {
                  side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                    `${Boolean(request.user)}`
                  ],
                  recentQuery: request.query.q,
                });
                return;
              }
            });
        }
      }
    }
  }
});

router.get("/", (request, response) => {
  console.log(request.query.q);
  const parsedQuery: parsedQuery = searchQueryParser(request.query.q as string);
  console.table(parsedQuery);
  if (parsedQuery.rawQuery.length !== 0) {
    // searchQueryに@が含まれる要素がある場合、userTableからそのユーザーのidを取得
    if (parsedQuery.rawQuery.length === 1 && parsedQuery.userId) {
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
        });
    } else if (
      parsedQuery.other.length === 0 &&
      parsedQuery.userId === null &&
      parsedQuery.hashTags
    ) {
      knex("work")
        // hashtagはjson型。一つでも一致したらその結果を返す
        .where(function () {
          for (let i = 0; i < parsedQuery.hashTags.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.orWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
          }
        })
        .on("query", function (data: string[]) {
          console.log(data);
        })
        .then((resultWork: workTable[]) => {
          response.status(200).json(resultWork);
        });
    } else {
      response.render("search_error", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        recentQuery: request.query.q,
      });
      return;
    }
  }
});

export default router;
