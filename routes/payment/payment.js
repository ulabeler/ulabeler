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
router.get('/', (request, response) => {
    response.render('payment/payment_test');
});
module.exports = router;
