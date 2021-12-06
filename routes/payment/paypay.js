"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
//ここまで共通部分
const mysql = require('mysql2');
let connection;
let result;
connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});
const PAYPAY = require('@paypayopa/paypayopa-sdk-node');
const PAYPAY_API_KEY = process.env.PAYPAY_API_KEY;
const PAYPAY_API_SECRET = process.env.PAYPAY_API_SECRET;
const PAYPAY_MERCHANT_ID = process.env.PAYPAY_MERCHANT_ID;
PAYPAY.Configure({
    clientId: PAYPAY_API_KEY,
    clientSecret: PAYPAY_API_SECRET,
    merchantId: PAYPAY_MERCHANT_ID,
    productionMode: false,
});
//決済番号の生成
const { v4: uuidv4 } = require('uuid');
router.post('/create_qr_code', (request, response) => {
    //POST送信された値の取得
    //item_name/item_price/item_count/user_name
    const item_name = request.body.item_name;
    const item_price = request.body.item_price;
    const item_count = request.body.item_count;
    const user_name = request.body.user_name;
    const order_detail = {
        //uuidv4の先頭8桁を使用
        order_id: `${user_name}_${uuidv4().substr(0, 4)}`,
        amount: item_price * item_count,
        currency: 'JPY',
        orderDescription: item_name
    };
    let payload = {
        //uuidで指定
        merchantPaymentId: order_detail.order_id,
        amount: {
            amount: order_detail.amount,
            currency: "JPY"
        },
        codeType: "ORDER_QR",
        orderDescription: order_detail.orderDescription,
        isAuthorization: false,
        redirectUrl: "http://localhost:3001/payment/paypay/callback", //リダイレクトはGET
    };
    PAYPAY.QRCodeCreate(payload, (paypay_response) => {
        //console.log(response);
        //response内のurlを抽出
        if (paypay_response["STATUS"] == 201) {
            //bodyをJSONパースする
            let body = JSON.parse(paypay_response["BODY"]);
            //urlを取り出す
            let url = body.data.url;
            //urlへリダイレクト
            response.redirect(url);
        }
        else {
            console.log(paypay_response);
        }
    });
});
router.get('/callback', (request, response) => {
    //GET送信された値をconsole.logで表示
    console.log(request);
    //GET送信された値をresponse.sendで返す
    response.send("支払いが完了しました");
});
module.exports = router;
