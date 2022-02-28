/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from "express";
import { userTable, workTable } from "tools/TypeAlias/tableType_alias";
import { addCart } from "../tools/util";
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
import { pickHashTags } from "../tools/parser";
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

router.post("/work_setting", async function (request, response) {
  if (!request.user) {
    response.status(401).send("UnAuthorized");
  } else {
    // workIdのスペースを取り除く
    const workId = request.body.workId.replace(/\s+/g, "");
    // console.log(`${host}/work/${workId}/edit`);
    // console.log(request.headers.referer);
    // if (request.headers.referer !== `${host}/work/${workId}/edit`) {
    //   response.redirect("/invalidAccess");
    //   return;
    // } else {
    if (
      !request.body.workName &&
      !request.body.workIntroduction &&
      !request.body.isPublic
    ) {
      response.redirect("/invalidAccess");
    } else {
      console.log(workId);
      const newIntroduction = request.body.workIntroduction;
      const parse = pickHashTags(newIntroduction);
      console.log(parse);
      request.session!.parseResult = parse;

      const currentWorkInfo = await knex("work").where("id", workId);
      console.table(currentWorkInfo);
      response.render("create/work_setting_confirmation", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        userInfo: request.user,
        work: currentWorkInfo[0],
        newName: request.body.workName,
        newIntroduction: parse.text,
        newIsPublic: request.body.isPublic,
        hashTag: parse.hashTag,
        baseCategory: request.session!.baseCategory,
      });
      return;
    }
    // }
  }
});

router.post("/work_setting_confirmation", async function (request, response) {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  }
  // console.log(request.body);
  const workId = request.body.workId;
  // const name = request.body.newName;

  addCart(workId, request.user.id);

  response.redirect("/purchase/purchase_confirmation");
  return;
});

export default router;
