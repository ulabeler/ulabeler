import express from "express";
import { knex } from "../app";
// eslint-disable-next-line new-cap
const router = express.Router();
// const env = process.env.U_DB_ENVIRONMENT || "development";
// const host =
//   env === "development"
//     ? "http://localhost:3001"
//     : "https://ulabeler.na2na.website";
import sideMenuList from "../tools/data/sidemenu.json";

import {
  // eslint-disable-next-line camelcase
  base_categoryTable,
} from "tools/TypeAlias/tableType_alias";

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
  // ベース洗濯後の分岐
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
      response.cookie("object_name", object, {
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
router.get("/select_color", function (request, response) {
  const objectName = request.cookies.object_name;
  response.render("create/select_color", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    object_name: objectName,
  });
});
router.post("/select_color", function (request, response) {
  const color = request.body.color;
  response.cookie("color", color, { maxAge: 100 * 60 * 100, httpOnly: false });
  response.redirect("/customize/customize_editing");
  return;
});

// カスタマイズ画面
router.get("/customize_editing", function (request, response) {
  // console.log( req.cookies.color);
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

// router.post("/customize_editing", function (req, res) {
//   const base = req.body.base;
//   // console.log(base);
//   const id = req.session.name;
//   const imagename = uuidv4();
//   const rawUUID = uuidv4();
//   const uuid = rawUUID.substring(rawUUID.length - 12);
//   const object_id = req.cookies.object_id;
//   res.cookie("image_path", imagename, {
//     maxAge: 100 * 60 * 100,
//     httpOnly: false,
//   });
//   // const decode_data = base64.decode(base);
//   fs.writeFile(`public/images/${imagename}.png`, base, "base64", (err) => {
//     // 書き出しに失敗した場合
//     if (err) {
//       console.log("エラーが発生しました。" + err);
//       throw err;
//     } else {
//       console.log("ファイルが正常に書き出しされました");
//     }
//   });
//   // putObjectImg(imagename,decode_data); // コメント解除すればAWSに保存可能
//   // AWSに挿入したpathの取り出し方わかってない。
//   const sql =
//     "INSERT INTO work(id, created_by_user_id, base_category_id,work_tex_path,purchase_flg) VALUES (?, ?, ?,?,1)";
//   connect.query(sql, [uuid, id, object_id, imagename], function (err, results) {
//     if (err) {
//       throw err;
//     } else {
//       console.log("挿入");
//       const sql =
//         "INSERT INTO favorited_work_number(favorited_to_id,number) VALUES (?,0)";
//       connect.query(sql, [uuid]);
//       res.cookie("work_id", uuid, { maxAge: 100 * 60 * 100, httpOnly: false });
//       res.redirect("/workSet/work_setting");
//       return;
//     }
//   });
// });
export default router;
