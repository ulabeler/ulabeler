/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line camelcase
// import { purchase_historyTable } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
import sideMenuList from "../tools/data/sidemenu.json";
import {
  purchaseHistoryView,
  purchaseHistoryWorkList,
} from "../tools/TypeAlias/miscAlias";
// import { workTable } from "./tableType_alias";

router.get("/history", async (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    let index = 0;
    if (request.query.page && parseInt(request.query.page as string) > 0) {
      index = parseInt(request.query.page as string) - 1;
    }
    // purchase_historyからuser_idが一致するものを取得
    // eslint-disable-next-line camelcase
    const purchaseHistory: purchaseHistoryView[] = await knex(
      "purchase_history"
    )
      .where("user_id", request.user.id)
      .orderBy("purchased_at", "desc");

    // purchaseHistory[i].idに対応するpurchased_history_itemを取得
    if (purchaseHistory.length === 0) {
      response.render("purchase_history_first", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
      });
      return;
    } else {
      console.log("履歴有り");
      console.log("page:" + index);
      for (let i = 0; i < purchaseHistory.length; i++) {
        // console.table(purchaseHistory[i]);
        purchaseHistory[i].itemsDetail = await knex("purchased_history_item")
          .select(knex.raw("work_id as workId, quantity"))
          .where("purchase_history_id", purchaseHistory[i].id)
          .orderBy("work_id", "asc");
      }
      console.table(purchaseHistory[1].itemsDetail);

      for (let i = 0; i < purchaseHistory.length; i++) {
        for (let j = 0; j < purchaseHistory[i].itemsDetail.length; j++) {
          // inner joinで取得したってのしたかったけど生で書くの面倒で。。。リファクタリングでやる
          const workInfo: purchaseHistoryWorkList[] = await knex("work")
            .select(
              knex.raw(
                "id as workId, name as workName, thumbnail_path as workImagePath, unit_price as unitPrice, base_category_id as baseCategoryId"
              )
            )
            .where("id", purchaseHistory[i].itemsDetail[j].workId);
          // console.table(workInfo);
          purchaseHistory[i].itemsDetail[j] = {
            ...purchaseHistory[i].itemsDetail[j],
            ...workInfo[0],
          };
        }
      }

      for (let i = 0; i < purchaseHistory.length; i++) {
        for (let j = 0; j < purchaseHistory[i].itemsDetail.length; j++) {
          const workInfo: purchaseHistoryWorkList[] = await knex(
            "base_category"
          )
            .select(knex.raw("name_subcategory as baseCategoryName"))
            .where("id", purchaseHistory[i].itemsDetail[j].baseCategoryId);
          purchaseHistory[i].itemsDetail[j].baseCategoryName =
            workInfo[0].baseCategoryName;
        }
      }

      console.table(purchaseHistory[index]);
      response.render("purchase_history", {
        side_menu: JSON.parse(JSON.stringify(sideMenuList))[
          `${Boolean(request.user)}`
        ],
        purchaseHistory: purchaseHistory,
        index: index,
      });
    }
  }
});

router.get("/purchase_confirmation", function (request, response) {
  const cookie = request.cookies;
  if (typeof cookie.pay == "undefined") {
    response.cookie("pay", "card", { maxAge: 100 * 60 * 100, httpOnly: false });
  }
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate() + 3;
  if (typeof cookie.day == "undifind") {
    response.cookie("day", `${month}/${day} 18時～20時`, {
      maxAge: 100 * 60 * 100,
      httpOnly: false,
    });
  }
  const id = request.session.name;
  const sql =
    "SELECT w.name,w.work_tex_path,w.unit_price,b.name_subcategory as total FROM work as w INNER JOIN base_category as b ON b.id = w.base_category_id WHERE created_by_user_id = ? and purchase_flg = 1";
  connect.query(sql, [id], function (err, result_r) {
    if (err) {
      throw err;
    } else {
      // response.json(result_r);
      const sql =
        "SELECT * FROM delivery_address WHERE user_id = ? ORDER BY updated_at desc limit 1";
      connect.query(sql, [id], function (err, result_c) {
        if (err) {
          throw err;
        } else {
          const sql = "select * from user where id = ?";
          connect.query(sql, [id], function (err, result_d) {
            if (err) {
              throw err;
            } else {
              response.render("purchase_confirmation", {
                result_r: result_r,
                result_c: result_c,
                result_d: result_d,
                cookie: cookie,
                year: year,
                month: month,
                day: day,
              });
              // response.json(result_c);
            }
          });
        }
      });
      // response.send(result_r);
    }
  });
});

export default router;
