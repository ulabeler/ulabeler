/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from "express";
import {
  // eslint-disable-next-line camelcase
  base_categoryTable,
  userTable,
  workTable,
} from "tools/TypeAlias/tableType_alias";
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
const environment = process.env.U_DB_ENVIRONMENT || "development";

import {
  sendDiscordV2,
  setDiscordPayload,
} from "../tools/discord_send_message";
import { discordMessageDetail } from "tools/TypeAlias/miscAlias";

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

      const currentWorkInfo: workTable[] = await knex("work").where(
        "id",
        workId
      );

      // eslint-disable-next-line camelcase
      const currentWorkBaseInfo: base_categoryTable[] = await knex(
        "base_category"
      )
        .where("id", currentWorkInfo[0].base_category_id)
        .catch((err: Error) => {
          console.log(err);
        });
      console.table(currentWorkBaseInfo);

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
        baseCategory: currentWorkBaseInfo[0].name_subcategory,
        rawNewIntroduction: newIntroduction,
      });
      return;
    }
    // }
  }
});

router.post("/work_setting_confirmation", async function (request, response) {
  if (!request.user) {
    response.status(401).redirect("/invalidAccess");
    return;
  } else if (
    typeof request.body.newIsPublic === "undefined" &&
    !request.body.newName &&
    !request.body.workId &&
    !request.body.rawNewIntroduction
  ) {
    response.status(400).send("Bad Request");
    return;
  } else {
    // console.log(request.body);
    const workId = request.body.workId;
    // const name = request.body.newName;
    const parse = pickHashTags(request.body.rawNewIntroduction);
    console.table(parse);

    const isNewPublicTinyInt = request.body.newIsPublic === "true" ? 1 : 0;

    await knex("work")
      .update({
        name: request.body.newName,
        introduction: parse.text,
        flag_public: isNewPublicTinyInt,
        // parse.hashTag.lengthが0ならばnullにする
        hashtag:
          parse.hashTag.length === 0 ? null : JSON.stringify(parse.hashTag),
      })
      .where("id", workId)
      .then(() => {
        addCart(workId, request.user!.id);
        response.status(200).send(true);
        return;
      })
      .catch((err: Error) => {
        const detail: discordMessageDetail = {
          requestURI: request.originalUrl,
          statusCode: 500,
          message: err.message,
        };
        const payload = setDiscordPayload(environment, true, detail);
        sendDiscordV2(payload);
        console.log(err);
        response.sendStatus(500);
        return;
      });
  }
});

export default router;
