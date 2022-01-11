import { request } from "http";

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

router.post('/select',
        (request:any, response:any) => {
            console.log(request.body.search_text);
            connection.query(
                "SELECT name FROM  testtbl WHERE name like ? ORDER BY id asc",
                [`%${request.body.search_text}%`],
                (error:any,result:any) =>{
                    if(error){
                        console.log(error)
                        response.render("./database_select", {url:"/"})
                        console.log("；；")
                        return
                    }

                    for (let index = 0; index < result.length; index++) {
                        console.log(result[index]);
                    }

                    response.send({result: result})
                }
            )
        }
)


module.exports = router;