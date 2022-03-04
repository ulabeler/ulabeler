import express from "express";
import { knex } from "../app";
import base64 from "urlsafe-base64";
import { putObject } from "../tools/aws/aws";
// eslint-disable-next-line new-cap
const router = express.Router();
// const env = process.env.U_DB_ENVIRONMENT || "development";
// const host =
//   env === "development"
//     ? "http://localhost:3001"
//     : "https://ulabeler.na2na.website";
import sideMenuList from "../tools/data/sidemenu.json";
import { v4 as uuidv4 } from "uuid"; // uuidv4()
const mediaProxyPrefix = process.env.MEDIAPROXYPREFIX || "";
import sharp from "sharp";

import {
  workTable,
  // eslint-disable-next-line camelcase
  base_categoryTable,
  // eslint-disable-next-line camelcase
  favorited_work_numberTable,
} from "tools/TypeAlias/tableType_alias";
// import { getObjectVanillaThumbnailPath } from "../tools/util";

// オブジェクト選択
router.get("/select_object", function (request, response) {
  // ページ表示用
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

router.post("/select_object", async function (request, response) {
  // ベース選択後の分岐
  if (!request.user) {
    response.redirect("/invalidAccess"); // 未ログイン時の処理を追加すべき。
    return;
  } else {
    const objectId: string = request.body.object; // なかったら400返す
    const object = await knex("base_category")
      .select("name_category")
      .where("id", objectId)
      .catch((err: Error) => {
        console.log(err);
      });
    console.table(object[0].name_category == "スマホケース"); // TODO: subcategoryとname_categoryが一緒だったらここに飛ぶようにする
    if (object[0].name_category == "スマホケース") {
      response.redirect("/customize/select_object_sub");
      return;
    } else {
      response.cookie("object_name", object[0].name_category, {
        maxAge: 100 * 60 * 100,
        httpOnly: false,
      });
      response.cookie("object_id", objectId, {
        maxAge: 100 * 60 * 100,
        httpOnly: false,
      });
      response.redirect("/customize/select_color");
      return;
    }
  }
});

// iPhone選択
router.get("/select_object_sub", function (request, response) {
  response.render("create/select_object_sub", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
  });
});

router.post("/select_object_sub", async function (request, response) {
  const objectId = request.body.object;
  // eslint-disable-next-line camelcase
  const result: base_categoryTable[] = await knex("base_category")
    .where("id", objectId)
    .catch((err: Error) => {
      console.log(err);
    });
  response.cookie("object_name", result[0].name_subcategory, {
    maxAge: 100 * 60 * 100,
    httpOnly: false,
  });
  response.cookie("object_id", result[0].id, {
    maxAge: 100 * 60 * 100,
    httpOnly: false,
  });
  response.redirect("/customize/select_color");
  return;
});

// カラー選択
router.get("/select_color", async function (request, response) {
  // const objectName = request.cookies.object_name;
  // const objectId = request.cookies.object_id;
  // const thumbnailPath = await getObjectVanillaThumbnailPath(objectId).catch(
  //   (error: Error) => {
  //     console.error(error);
  //     response.redirect("/customize/select_object");
  //     return;
  //   }
  // );

  // response.render("create/select_color", {
  //   side_menu: JSON.parse(JSON.stringify(sideMenuList))[
  //     `${Boolean(request.user)}`
  //   ],
  //   object_name: objectName,
  //   thumbnailPath: thumbnailPath,
  // });
  response.redirect("/customize/customize_editing");
});
router.post("/select_color", function (request, response) {
  const color = request.body.color;
  response.cookie("color", color, { maxAge: 100 * 60 * 100, httpOnly: false });
  response.redirect("/customize/customize_editing");
  return;
});

// カスタマイズ画面
router.get("/customize_editing", function (request, response) {
  // console.log( request.cookies.color);
  const color = request.cookies.color;
  const objectName = request.cookies.object_name;
  response.render("create/customize_editing2", {
    color: color,
    object_name: objectName,
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
  });
});

router.post("/customize_editing", async function (request, response) {
  if (!request.user) {
    response.redirect("/invalidAccess"); // 未ログイン時の処理を追加すべき。
    return;
  } else {
    const base = request.body.base;
    const workTexPath = "media/workTexture/" + uuidv4() + ".png";
    const thumbnailPath = "media/workThumbnail/" + uuidv4() + ".webp";
    response.cookie("image_path", thumbnailPath, {
      maxAge: 100 * 60 * 100,
      httpOnly: false,
    });

    // base64で送られてきたbaseをデコードする
    const decodedImage = base64.decode(base);

    const thumbnailBuffer = await sharp(decodedImage)
      .resize(null, 512)
      .webp()
      .toBuffer();

    const workTexBuffer = await sharp(decodedImage).png().toBuffer();

    const unitPrice = 600; // TODO 物によって変わるようにこの前にDB叩いて引っ張ってくる

    const workInfo: workTable = {
      id: uuidv4().substring(36 - 12),
      created_by_user_id: request.user.id,
      base_category_id: request.cookies.object_id,
      name: "情報編集中のアイテム",
      work_tex_path: `${mediaProxyPrefix}${workTexPath}`,
      thumbnail_path: `${mediaProxyPrefix}${thumbnailPath}`,
      flag_public: false,
      unit_price: unitPrice,
      hashtag: "{}" as string,
      num_of_images: 0,
      create_at: new Date(),
    };

    // eslint-disable-next-line camelcase
    const favWorkInfo: favorited_work_numberTable = {
      favorited_to_id: workInfo.id,
      number: 0,
    };

    console.table(workInfo);

    await putObject(thumbnailPath, thumbnailBuffer).then(() => {
      console.log("Thumbnail dist->");
      console.log(workInfo.thumbnail_path);
    });

    await putObject(workTexPath, workTexBuffer).then(() => {
      console.log("Texture dist->");
      console.log(workInfo.work_tex_path);
    });

    await knex("work").insert(workInfo);
    await knex("favorited_work_number")
      .insert(favWorkInfo)
      .catch((err: Error) => {
        console.log(err);
      });

    response.cookie("work_id", workInfo.id, {
      maxAge: 100 * 60 * 100,
      httpOnly: false,
    });
    response.redirect("/workSet/work_setting");
    return;
  }
});
export default router;
