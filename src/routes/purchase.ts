import express from "express";
// import { knex } from "../app";
// import bcrypt from 'bcrypt';
// import {
//   userTable,
//   workTable,
//   // eslint-disable-next-line camelcase
//   base_categoryTable,
//   // eslint-disable-next-line camelcase
//   favorited_work_numberTable,
//   // eslint-disable-next-line camelcase
//   favorited_workTable,
//   // eslint-disable-next-line camelcase
//   favorited_userTable,
// } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
// import { myFavoriteWorkList } from "../tools/TypeAlias/miscAlias";

router.get("/history", (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    response.render("purchase_history_first", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
    });
  }
});

export default router;
