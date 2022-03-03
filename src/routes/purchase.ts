/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import express from "express";
// eslint-disable-next-line camelcase
import {
  // eslint-disable-next-line camelcase
  base_categoryTable,
  cartTable,
  // eslint-disable-next-line camelcase
  delivery_addressTable,
  workTable,
  // eslint-disable-next-line camelcase
  tempdeliverysettingsTable,
} from "tools/TypeAlias/tableType_alias";
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
import { cartListWorkDetail } from "../tools/TypeAlias/miscAlias";
import { v4 as uuidv4 } from "uuid";

import PAYPAY from "@paypayopa/paypayopa-sdk-node";
const PAYPAY_API_KEY = process.env.PAYPAY_API_KEY;
const PAYPAY_API_SECRET = process.env.PAYPAY_API_SECRET;
const PAYPAY_MERCHANT_ID = process.env.PAYPAY_MERCHANT_ID;

// eslint-disable-next-line new-cap
PAYPAY.Configure({
  clientId: PAYPAY_API_KEY || "",
  clientSecret: PAYPAY_API_SECRET || "",
  merchantId: PAYPAY_MERCHANT_ID,
  productionMode: false,
});

const env = process.env.U_DB_ENVIRONMENT || "development";
let host = "https://ulabeler.na2na.website";
if (env === "development") {
  host = "http://localhost:3001";
} else if (env === "staging") {
  host = "https://devulabeler.na2na.website";
} else {
  host = "https://ulabeler.na2na.website";
}

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
      // console.table(purchaseHistory[1].itemsDetail);

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

      console.table(purchaseHistory);
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

router.get("/purchase_confirmation", async function (request, response) {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    const currentCartList: cartTable[] = await knex("cart").where(
      "userId",
      request.user.id
    );
    // console.log(currentCartList);
    const currentCartWorkDetailList: cartListWorkDetail[] = [];
    for (let i = 0; i < currentCartList.length; i++) {
      const workInfo: workTable[] = await knex("work")
        .select("name", "thumbnail_path", "unit_price", "base_category_id")
        .where("id", currentCartList[i].workId);
      currentCartWorkDetailList[i] = {
        workName: workInfo[0].name,
        workImagePath: workInfo[0].thumbnail_path,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        unitPrice: parseInt(workInfo[0].unit_price),
        baseCategoryId: workInfo[0].base_category_id,
      };
    }

    for (let i = 0; i < currentCartList.length; i++) {
      // eslint-disable-next-line camelcase
      const currentCartWorkCategoryName: base_categoryTable[] = await knex(
        "base_category"
      )
        .select("name_subcategory")
        .where("id", currentCartWorkDetailList[i].baseCategoryId);
      currentCartWorkDetailList[i].baseCategoryName =
        currentCartWorkCategoryName[0].name_subcategory;
    }

    for (let i = 0; i < currentCartList.length; i++) {
      currentCartWorkDetailList[i].workId = currentCartList[i].workId;
      currentCartWorkDetailList[i].quantity = currentCartList[i].quantity;
    }

    // console.table(currentCartWorkDetailList);
    // eslint-disable-next-line camelcase
    const deliveryAddress: delivery_addressTable[] = await knex(
      "delivery_address"
    )
      .where("user_id", request.user.id)
      .orderBy("updated_at", "desc")
      .limit(1);

    const currentTempDeliveryInfo: tempdeliverysettingsTable[] = await knex(
      "tempdeliverysettings"
    ).where("userId", request.user.id);

    const threeDaysLater = new Date();
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    let estimatedDeliveryDateString =
      threeDaysLater.getMonth() + 1 + "月" + threeDaysLater.getDate() + "日";

    let estimatedDeliveryTimeCategory = "時間帯指定なし";

    if (currentTempDeliveryInfo.length !== 0) {
      // console.table(currentTempDeliveryInfo);
      // 3日後の日付をmm月dd日に変換
      estimatedDeliveryDateString =
        currentTempDeliveryInfo[0].estimatedDeliveryDate.getMonth() +
        1 +
        "月" +
        currentTempDeliveryInfo[0].estimatedDeliveryDate.getDate() +
        "日";
      estimatedDeliveryTimeCategory =
        currentTempDeliveryInfo[0].estimatedDeliveryTimeCategory;
    }

    const shippingFee = 300; // 基本の配送料金
    const paymentMethod = await knex("user")
      .select("name_card", "cardnumber")
      .where("id", request.user.id);

    console.log(paymentMethod);

    response.render("purchase/purchase_confirmation_first", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      CartWorkDetailList: currentCartWorkDetailList,
      shippingFee: shippingFee,
      estimatedDeliveryDateString: estimatedDeliveryDateString,
      estimatedDeliveryTimeCategory: estimatedDeliveryTimeCategory,
      paymentMethod: paymentMethod,
      deliveryAddress: deliveryAddress,
    });
  }
});

router.get("/select_delivery_date", async (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    const shippingFee = 300;
    const threeDaysLater = new Date();
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    const threeDaysLaterString =
      threeDaysLater.getMonth() + 1 + "月" + threeDaysLater.getDate() + "日";

    const immediateDelivery = new Date();
    immediateDelivery.setDate(immediateDelivery.getDate() + 1);
    const immediateDeliveryString =
      immediateDelivery.getMonth() +
      1 +
      "月" +
      immediateDelivery.getDate() +
      "日";

    // 午前10時よりも前ならばtrue
    const isAllowImmediateDelivery: boolean = new Date().getHours() < 10;
    response.render("purchase/select_delivery_date", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      threeDaysLaterString: threeDaysLaterString,
      immediateDeliveryString: immediateDeliveryString,
      shippingFee: shippingFee,
      isAllowImmediateDelivery: isAllowImmediateDelivery,
    });
  }
});

router.get("/select_address", async (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  } else {
    // eslint-disable-next-line camelcase
    const deliveryAddress: delivery_addressTable[] = await knex(
      "delivery_address"
    )
      .where("user_id", request.user.id)
      .orderBy("updated_at", "desc")
      .limit(3)
      .catch((error: Error) => {
        console.log(error);
      });
    response.render("purchase/select_address", {
      results: deliveryAddress,
    });
  }
});

router.get("/select_payment_method", async (request, response) => {
  if (!request.user) {
    response.status(403).send("Forbidden");
  } else {
    response.render("purchase/select_payment_first.ejs");
  }
});

router.get("/submit", async (request, response) => {
  if (request.headers.referer) {
    const rawReferer = request.headers.referer;
    // refererからgetパラメータを取り除く
    const referer = rawReferer;
    if (!request.user) {
      response.redirect("/invalidAccess");
      return;
    } else if (!(host + "/purchase/purchase_confirmation" == referer)) {
      console.log("referer: " + referer);
      response.redirect("/invalidAccess");
      return;
    } else {
      const currentCartList: cartTable[] = await knex("cart").where(
        "userId",
        request.user.id
      );
      // console.log(currentCartList);
      const currentCartWorkDetailList: cartListWorkDetail[] = [];
      for (let i = 0; i < currentCartList.length; i++) {
        const workInfo: workTable[] = await knex("work")
          .select("name", "thumbnail_path", "unit_price", "base_category_id")
          .where("id", currentCartList[i].workId);
        currentCartWorkDetailList[i] = {
          workName: workInfo[0].name,
          workImagePath: workInfo[0].thumbnail_path,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          unitPrice: parseInt(workInfo[0].unit_price),
          baseCategoryId: workInfo[0].base_category_id,
        };
      }

      for (let i = 0; i < currentCartList.length; i++) {
        // eslint-disable-next-line camelcase
        const currentCartWorkCategoryName: base_categoryTable[] = await knex(
          "base_category"
        )
          .select("name_subcategory")
          .where("id", currentCartWorkDetailList[i].baseCategoryId);
        currentCartWorkDetailList[i].baseCategoryName =
          currentCartWorkCategoryName[0].name_subcategory;
      }

      for (let i = 0; i < currentCartList.length; i++) {
        currentCartWorkDetailList[i].workId = currentCartList[i].workId;
        currentCartWorkDetailList[i].quantity = currentCartList[i].quantity;
      }

      // console.table(currentCartWorkDetailList);
      // eslint-disable-next-line camelcase
      const deliveryAddress: delivery_addressTable[] = await knex(
        "delivery_address"
      )
        .where("user_id", request.user.id)
        .orderBy("updated_at", "desc")
        .limit(1);

      const currentTempDeliveryInfo: tempdeliverysettingsTable[] = await knex(
        "tempdeliverysettings"
      ).where("userId", request.user.id);

      const threeDaysLater = new Date();
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);
      let estimatedDeliveryDateString =
        threeDaysLater.getMonth() + 1 + "月" + threeDaysLater.getDate() + "日";

      let estimatedDeliveryTimeCategory = "時間帯指定なし";

      if (currentTempDeliveryInfo.length !== 0) {
        // console.table(currentTempDeliveryInfo);
        // 3日後の日付をmm月dd日に変換
        estimatedDeliveryDateString =
          currentTempDeliveryInfo[0].estimatedDeliveryDate.getMonth() +
          1 +
          "月" +
          currentTempDeliveryInfo[0].estimatedDeliveryDate.getDate() +
          "日";
        estimatedDeliveryTimeCategory =
          currentTempDeliveryInfo[0].estimatedDeliveryTimeCategory;
      }

      const shippingFee = 300; // 基本の配送料金
      const paymentMethod = await knex("user")
        .select("name_card", "cardnumber")
        .where("id", request.user.id);

      // 注文IDの生成
      // UUIDの下12桁を取得
      const orderId = uuidv4().split("-").slice(-1)[0];
      console.log(orderId);
      console.log(paymentMethod[0].name_card);

      if (paymentMethod[0].name_card !== "PayPay") {
        // DBへの追加処理
        await knex("purchase_history").insert({
          id: orderId,
          user_id: request.user.id,
          number_invoice: null,
          purchased_at: new Date(),
          payment_method: "クレジットカード",
        });

        for (let i = 0; i < currentCartList.length; i++) {
          await knex("purchased_history_item").insert({
            purchase_history_id: orderId,
            work_id: currentCartList[i].workId,
            quantity: currentCartList[i].quantity,
          });
        }

        // cartテーブルのデータを削除
        await knex("cart").where("userId", request.user.id).del();

        response.render("purchase/purchase_completion", {
          side_menu: JSON.parse(JSON.stringify(sideMenuList))[
            `${Boolean(request.user)}`
          ],
          CartWorkDetailList: currentCartWorkDetailList,
          shippingFee: shippingFee,
          estimatedDeliveryDateString: estimatedDeliveryDateString,
          estimatedDeliveryTimeCategory: estimatedDeliveryTimeCategory,
          paymentMethod: paymentMethod,
          deliveryAddress: deliveryAddress,
        });
        return;
      } else {
        let sumAmount = 0;
        for (let i = 0; i < currentCartWorkDetailList.length; i++) {
          sumAmount +=
            currentCartWorkDetailList[i].unitPrice! *
            currentCartWorkDetailList[i].quantity!;
        }
        sumAmount += shippingFee;
        const orderDetail = {
          // uuidv4の先頭8桁を使用
          order_id: orderId,
          amount: sumAmount,
          currency: "JPY",
          orderDescription: "Ulabelerお買い上げ分",
        };

        const payload = {
          // uuidで指定
          merchantPaymentId: orderDetail.order_id,
          amount: {
            amount: orderDetail.amount,
            currency: "JPY",
          },
          codeType: "ORDER_QR",
          orderDescription: orderDetail.orderDescription,
          isAuthorization: false,
          redirectUrl: `${host}/purchase/paypay/callback/${orderDetail.order_id}`, // リダイレクトはGET
        };
        // eslint-disable-next-line new-cap
        PAYPAY.QRCodeCreate(payload, (paypayRawResponse) => {
          // console.log(response);
          // response内のurlを抽出
          const paypayResponse = paypayRawResponse;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          if (paypayResponse["STATUS"] == 201) {
            // bodyをJSONパースする
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const body = JSON.parse(paypayResponse["BODY"]);
            // urlを取り出す
            const url = body.data.url;
            // urlへリダイレクト
            response.redirect(url);
          } else {
            console.log(paypayResponse);
          }
        });
      }
    }
  } else {
    response.redirect("/invalidAccess");
    return;
  }
});

router.get("/paypay/callback/:orderId", async (request, response) => {
  if (!request.user) {
    response.redirect("/invalidAccess");
    return;
  }
  const currentCartList: cartTable[] = await knex("cart").where(
    "userId",
    request.user.id
  );
  // console.log(currentCartList);
  const currentCartWorkDetailList: cartListWorkDetail[] = [];
  for (let i = 0; i < currentCartList.length; i++) {
    const workInfo: workTable[] = await knex("work")
      .select("name", "thumbnail_path", "unit_price", "base_category_id")
      .where("id", currentCartList[i].workId);
    currentCartWorkDetailList[i] = {
      workName: workInfo[0].name,
      workImagePath: workInfo[0].thumbnail_path,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      unitPrice: parseInt(workInfo[0].unit_price),
      baseCategoryId: workInfo[0].base_category_id,
    };
  }

  for (let i = 0; i < currentCartList.length; i++) {
    // eslint-disable-next-line camelcase
    const currentCartWorkCategoryName: base_categoryTable[] = await knex(
      "base_category"
    )
      .select("name_subcategory")
      .where("id", currentCartWorkDetailList[i].baseCategoryId);
    currentCartWorkDetailList[i].baseCategoryName =
      currentCartWorkCategoryName[0].name_subcategory;
  }

  for (let i = 0; i < currentCartList.length; i++) {
    currentCartWorkDetailList[i].workId = currentCartList[i].workId;
    currentCartWorkDetailList[i].quantity = currentCartList[i].quantity;
  }

  // console.table(currentCartWorkDetailList);
  // eslint-disable-next-line camelcase
  const deliveryAddress: delivery_addressTable[] = await knex(
    "delivery_address"
  )
    .where("user_id", request.user.id)
    .orderBy("updated_at", "desc")
    .limit(1);

  const currentTempDeliveryInfo: tempdeliverysettingsTable[] = await knex(
    "tempdeliverysettings"
  ).where("userId", request.user.id);

  const threeDaysLater = new Date();
  threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  let estimatedDeliveryDateString =
    threeDaysLater.getMonth() + 1 + "月" + threeDaysLater.getDate() + "日";

  let estimatedDeliveryTimeCategory = "時間帯指定なし";

  if (currentTempDeliveryInfo.length !== 0) {
    // console.table(currentTempDeliveryInfo);
    // 3日後の日付をmm月dd日に変換
    estimatedDeliveryDateString =
      currentTempDeliveryInfo[0].estimatedDeliveryDate.getMonth() +
      1 +
      "月" +
      currentTempDeliveryInfo[0].estimatedDeliveryDate.getDate() +
      "日";
    estimatedDeliveryTimeCategory =
      currentTempDeliveryInfo[0].estimatedDeliveryTimeCategory;
  }

  const shippingFee = 300; // 基本の配送料金
  const paymentMethod = await knex("user")
    .select("name_card", "cardnumber")
    .where("id", request.user.id);

  // 注文IDの生成
  // UUIDの下12桁を取得
  const orderId = request.params.orderId;
  console.log(orderId);
  console.log(paymentMethod[0].name_card);
  // DBへの追加処理
  await knex("purchase_history").insert({
    id: orderId,
    user_id: request.user.id,
    number_invoice: null,
    purchased_at: new Date(),
    payment_method: "クレジットカード",
  });

  for (let i = 0; i < currentCartList.length; i++) {
    await knex("purchased_history_item").insert({
      purchase_history_id: orderId,
      work_id: currentCartList[i].workId,
      quantity: currentCartList[i].quantity,
    });
  }

  // cartテーブルのデータを削除
  await knex("cart").where("userId", request.user.id).del();

  response.render("purchase/purchase_completion", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    CartWorkDetailList: currentCartWorkDetailList,
    shippingFee: shippingFee,
    estimatedDeliveryDateString: estimatedDeliveryDateString,
    estimatedDeliveryTimeCategory: estimatedDeliveryTimeCategory,
    paymentMethod: paymentMethod,
    deliveryAddress: deliveryAddress,
  });
  return;
});

export default router;
