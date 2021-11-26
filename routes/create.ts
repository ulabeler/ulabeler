//ここからts共通部分
export {};
const express = require('express');
const router = express.Router();
//ここまで共通部分
const mysql = require('mysql2');
    let connection:any;
    let result:any;
    connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            multipleStatements: true
    });


router.get('/select_object', (request:any, response:any) => {
    connection.query('select id, name_category, name_subcategory, thumbnail_path from base_category', (err:any, results:any) => {
        console.log(results);
        //if (err) {
        //     console.error(err);
        //     return;
        // }
        // response.json(results);
    });
});