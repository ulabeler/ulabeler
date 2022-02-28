import express from "express";
import { userTable, workTable } from "tools/TypeAlias/tableType_alias";
import { knex } from "../app";
// import { putObject } from "../tools/aws/aws";
// eslint-disable-next-line new-cap
const router = express.Router();
// const env = process.env.U_DB_ENVIRONMENT || "development";
// const host =
//   env === "development"
//     ? "http://localhost:3001"
//     : "https://ulabeler.na2na.website";
import sideMenuList from "../tools/data/sidemenu.json";
// import { v4 as uuidv4 } from "uuid"; // uuidv4()
// const mediaProxyPrefix = process.env.MEDIAPROXYPREFIX || "";
// import sharp from "sharp";

router.get("/work_setting", async function (request, response) {
  if (!request.user) {
    response.redirect("/invalidAccess"); // 未ログイン時の処理を追加すべき。
    return;
  }
  const objectName = request.cookies.object_name;
  const workId = request.cookies.work_id;
  console.log(workId);
  const queryarray = request.query;
  const date = new Date();

  const creatorInfo: userTable = await knex("user")
    .select("*")
    .where("id", request.user.id)
    .catch((err: Error) => {
      console.log(err);
    });

  const currentWorkInfo: workTable = await knex("work")
    .select("*")
    .where("id", workId)
    .catch((err: Error) => {
      console.log(err);
    });

  console.log(creatorInfo);
  console.table(currentWorkInfo);

  response.render("create/work_setting", {
    date: date,
    queryarray: queryarray,
    object_name: objectName,
    results: creatorInfo,
    result_w: currentWorkInfo,
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
  });
});

export default router;
