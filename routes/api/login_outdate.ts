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

//uuidを生成する
const uuid = require('uuid');


//ログイン処理
router.post('/login', (req: any, res: any) => {
    let user_id = req.body.user_id;
    let password = req.body.password;
    let sql = 'SELECT * FROM user WHERE user_id = ? AND password = ?';
    connection.query(sql, [user_id, password], (err: any, results: any) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            if (results.length > 0) {
                //ログイン成功
                let token = uuid.v4();
                let sql = 'UPDATE user SET token = ? WHERE user_id = ?';
                connection.query(sql, [token, user_id], (err: any, results: any) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        res.status(200).send({
                            token: token
                        });
                    }
                });
            } else {
                //ログイン失敗
                res.status(401).send('Unauthorized');
            }
        }
    });
});

module.exports = router;