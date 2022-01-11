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


    router.get('/file_upload', (req:any, res:any) => {
        let uid = 'empty';
        console.log(req.session);
        if (req.session.uid != undefined) {
            uid = req.session.uid;
            res.render('file_upload_form.ejs', {
                uid: uid
            });
        }else{
            //uidがない場合はログイン画面にリダイレクト
            res.redirect('/session/dev_check_session');
        }
    });

    module.exports = router;