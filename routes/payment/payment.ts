import { request } from "http";

//ここからts共通部分
export { };
const express = require('express');
const router = express.Router();
//ここまで共通部分
const mysql = require('mysql2');
let connection: any;
let result: any;
connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});


router.get('/', (request: any, response: any) => {
    response.render('train/payment/payment_test');
});

router.get('/checkout', (request: any, response: any) => {
    response.render('train/payment/checkout');
});

module.exports = router;