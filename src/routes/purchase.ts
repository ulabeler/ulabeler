/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line camelcase
// import { purchase_historyTable } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import { purchaseHistoryView } from "../tools/TypeAlias/miscAlias";
// import { workTable } from "./tableType_alias";

router.get("/history", async (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    // purchase_historyからuser_idが一致するものを取得
    // eslint-disable-next-line camelcase
    const purchaseHistory: purchaseHistoryView[] = await knex(
      "purchase_history"
    ).where("user_id", request.user.id);

    console.table(purchaseHistory);
    response.render("purchase_history_first", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
    });
  }
});

export default router;
