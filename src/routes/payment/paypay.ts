/* eslint-disable @typescript-eslint/no-explicit-any */
// ここからts共通部分
import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
// ここまで共通部分

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

// 決済番号の生成
import { v4 as uuidv4 } from "uuid";

router.post("/create_qr_code", (request, response) => {
  // POST送信された値の取得
  // itemName/itemPrice/itemCount/userName
  const itemName = request.body.itemName;
  const itemPrice = request.body.itemPrice;
  const itemCount = request.body.itemCount;
  const userName = request.body.userName;

  const orderDetail = {
    // uuidv4の先頭8桁を使用
    order_id: `${userName}_${uuidv4().substr(0, 4)}`,
    amount: itemPrice * itemCount,
    currency: "JPY",
    orderDescription: itemName,
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
    redirectUrl: "http://localhost:3001/payment/paypay/callback", // リダイレクトはGET
  };

  // eslint-disable-next-line new-cap
  PAYPAY.QRCodeCreate(payload, (paypayResponse: any) => {
    // console.log(response);
    // response内のurlを抽出
    if (paypayResponse["STATUS"] == 201) {
      // bodyをJSONパースする
      const body = JSON.parse(paypayResponse["BODY"]);
      // urlを取り出す
      const url = body.data.url;
      // urlへリダイレクト
      response.redirect(url);
    } else {
      console.log(paypayResponse);
    }
  });
});

router.get("/callback", (request, response) => {
  // GET送信された値をconsole.logで表示
  console.log(request);
  // GET送信された値をresponse.sendで返す
  // response.send("支払いが完了しました");
  // "/"へリダイレクト
  response.redirect("/");
});

export default router;
