import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line new-cap
const router = express.Router();
// import sideMenuList from "../tools/data/sidemenu.json";
import { searchWordParse } from "../tools/parser";

import { userTable } from "tools/TypeAlias/tableType_alias";

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
          knex("user")
            .select("id", "name", "icon_path", "self_introduction")
            .where("id", searchQuery[i].slice(1))
            .then((resultUser: userTable[]) => {
              if (resultUser.length !== 0) {
                response.status(200).json(resultUser[0]);
                return;
              } else {
                response.status(200).send("対象のユーザーはいませんでした。");
                return;
              }
            });
        }
      }
    }
  }
});

export default router;
