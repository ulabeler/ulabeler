import express from "express";
// import { knex } from "../app";
// eslint-disable-next-line new-cap
const router = express.Router();
// const env = process.env.U_DB_ENVIRONMENT || "development";
// const host =
//   env === "development"
//     ? "http://localhost:3001"
//     : "https://ulabeler.na2na.website";
import sideMenuList from "../tools/data/sidemenu.json";

// オブジェクト選択
router.get("/select_object", function (request, response) {
  if (!request.user) {
    response.redirect("/invalidAccess"); // 未ログイン時の処理を追加すべき。
    return;
  } else {
    response.render("create/select_object", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
    });
  }
});

export default router;
