/* eslint-disable no-invalid-this */
import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import { searchQueryParser } from "../tools/parser";
import { parsedQuery } from "../tools/TypeAlias/miscAlias";

import { userTable, workTable } from "tools/TypeAlias/tableType_alias";

router.get("/", (request, response) => {
  console.log(request.query.q);
  const parsedQuery: parsedQuery = searchQueryParser(request.query.q as string);
  console.table(parsedQuery);
  if (parsedQuery.rawQuery.length !== 0) {
    // searchQueryに@が含まれる要素がある場合、userTableからそのユーザーのidを取得
    if (parsedQuery.userId) {
      // ユーザーidが含まれている場合の処理
      if (parsedQuery.rawQuery.length === 1) {
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
      } else if (parsedQuery.hashTags && parsedQuery.other.length === 0) {
        // userId + ハッシュタグ
        knex("work")
          .where("created_by_user_id", parsedQuery.userId)
          // hashtagはjson型。一つでも一致したらその結果を返す
          .andWhere(function () {
            for (let i = 0; i < parsedQuery.hashTags.length; i++) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.andWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
            }
          })
          .then((resultWork: workTable[]) => {
            if (resultWork.length === 0) {
              response.render("search_error", {
                side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                  `${Boolean(request.user)}`
                ],
                recentQuery: request.query.q,
              });
              return;
            } else {
              response.status(200).json(resultWork);
            }
          })
          .catch((error: Error) => {
            console.log(error);
          });
      } else {
        // 全部入り
        knex("work")
          .where("created_by_user_id", parsedQuery.userId)
          // hashtagはjson型。一つでも一致したらその結果を返す
          .andWhere(function () {
            for (let i = 0; i < parsedQuery.hashTags.length; i++) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.andWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
            }
          })
          .andWhere(function () {
            for (let i = 0; i < parsedQuery.other.length; i++) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.andWhere("name", "like", `%${parsedQuery.other[i]}%`);
            }
          })
          .then((resultWork: workTable[]) => {
            if (resultWork.length === 0) {
              response.render("search_error", {
                side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                  `${Boolean(request.user)}`
                ],
                recentQuery: request.query.q,
              });
              return;
            } else {
              response.status(200).json(resultWork);
            }
          })
          .catch((error: Error) => {
            console.log(error);
          });
      }
    } else if (parsedQuery.hashTags.length !== 0) {
      // ユーザーidはないが、ハッシュタグがある場合の処理
      if (parsedQuery.other.length !== 0) {
        knex("work")
          // hashtagはjson型。一つでも一致したらその結果を返す
          .where(function () {
            for (let i = 0; i < parsedQuery.hashTags.length; i++) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.andWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
            }
          })
          .then((resultWork: workTable[]) => {
            if (resultWork.length === 0) {
              response.render("search_error", {
                side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                  `${Boolean(request.user)}`
                ],
                recentQuery: request.query.q,
              });
              return;
            } else {
              response.status(200).json(resultWork);
              return;
            }
          });
      } else {
        // ハッシュタグとその他がある場合の処理
        knex("work")
          // hashtagはjson型。一つでも一致したらその結果を返す
          .where(function () {
            for (let i = 0; i < parsedQuery.hashTags.length; i++) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.andWhere("hashtag", "like", `%${parsedQuery.hashTags[i]}%`);
            }
          })
          .andWhere(function () {
            for (let i = 0; i < parsedQuery.other.length; i++) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              this.andWhere("name", "like", `%${parsedQuery.other[i]}%`);
            }
          })
          .on("query", function (data: string[]) {
            console.log(data);
          })
          .then((resultWork: workTable[]) => {
            if (resultWork.length === 0) {
              response.render("search_error", {
                side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                  `${Boolean(request.user)}`
                ],
                recentQuery: request.query.q,
              });
              return;
            } else {
              response.status(200).json(resultWork);
            }
          });
      }
    } else if (parsedQuery.other.length !== 0) {
      // ユーザーidとハッシュタグがないが、その他がある場合の処理
      knex("work")
        .where(function () {
          for (let i = 0; i < parsedQuery.other.length; i++) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.andWhere("name", "like", `%${parsedQuery.other[i]}%`);
          }
        })
        .then((resultWork: workTable[]) => {
          if (resultWork.length === 0) {
            response.render("search_error", {
              side_menu: JSON.parse(JSON.stringify(sideMenuList))[
                `${Boolean(request.user)}`
              ],
              recentQuery: request.query.q,
            });
            return;
          } else {
            response.status(200).json(resultWork);
          }
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
  }
});

export default router;
