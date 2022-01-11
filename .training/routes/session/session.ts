//ここからts共通部分
export {};
const express = require('express');
const router = express.Router();
//ここまで共通部分

const mysql = require('mysql2');
const sql_settings = require("../../config/sql.json"); //設定は別ファイルに乗っけました。
    let connection:any;
    let result:any;
    connection = mysql.createConnection({
            host: sql_settings["host"],
            user: sql_settings["user"],
            password: sql_settings["password"],
            database: sql_settings["database"],
            multipleStatements: true
        });

    
    router.get('/dev_check_session', (req:any, res:any) => {
        let uid = 'empty';
        let temp_img_name = 'empty';
        console.log(req.session);
        if (req.session.uid != undefined) {
            uid = req.session.uid;
        }
        res.render('dev_session.ejs', {
            uid: uid,
            temp_img_name: req.session.temp_img_name,
        });
    });

    router.post('/dev_create_session', (req:any, res:any) => {
        //requestボディから値を取得
        //取得した値をセッションに保存
        req.session.uid = req.body.uid;
        res.redirect('/session/dev_check_session');
    })

    module.exports = router;