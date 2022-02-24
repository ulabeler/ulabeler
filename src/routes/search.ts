/* eslint-disable no-invalid-this */
import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import { searchQueryParser } from "../tools/parser";
import { parsedQuery } from "../tools/TypeAlias/miscAlias";
import { searchWork } from "../tools/search";

import { userTable } from "tools/TypeAlias/tableType_alias";

router.get("/", async (request, response) => {
  console.log(request.query.q);
  const parsedQuery: parsedQuery = searchQueryParser(request.query.q as string);
  console.table(parsedQuery);
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
    }
  } else if (parsedQuery.rawQuery.length !== 0) {
    const searchWorkResult = await searchWork(parsedQuery);
    console.log(searchWorkResult);
    response.status(200).json(searchWorkResult);
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
