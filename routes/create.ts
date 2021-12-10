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


router.get('/select_object', (request: any, response: any) => {
    connection.query('select name_category from base_category ORDER BY name_category', (err: any, results: any) => {
        console.log(results);
        if (err) {
            console.error(err);
            return;
        }
        // name_categoryがひとまとまりになるように取り出す
        let name_category: string[] = [];
        for (let i = 0; i < results.length; i++) {
            if (name_category.indexOf(results[i].name_category) === -1) {
                name_category.push(results[i].name_category);
            }
        }
        console.log("#####################################");
        console.log(name_category);
        //select_objectに渡す
        response.render('create/select_object', {
            name_category: name_category,

        });
        //response.json(results);
    });
});

router.post('/select_object_sub', (request: any, response: any) => {
    //POSTパラメータを取得
    let category = request.body.category;
    console.log(category);

    connection.query('select name_subcategory from base_category WHERE name_category = ? ORDER BY name_subcategory',
        [category],
        (err: any, results: any) => {
            console.log(results);
            if (err) {
                console.error(err);
                return;
            }
            // name_subcategoryがひとまとまりになるように取り出す
            let name_subcategory: string[] = [];
            for (let i = 0; i < results.length; i++) {
                if (name_subcategory.indexOf(results[i].name_subcategory) === -1) {
                    name_subcategory.push(results[i].name_subcategory);
                }
            }
            console.log("#####################################");

            //Cookieの設定
            response.cookie('category', category);

            //categoryをページに表示
            response.render('create/select_object_sub', {
                category: category,
                name_subcategory: name_subcategory
            });
        });
});

router.post('/select_color', (request: any, response: any) => {
    // POSTパラメータを取得
    let category = request.body.category_sub;
    //Cookieに格納
    response.cookie('category_sub', category);
    response.render('create/select_color', {
        category: category
    });
});

router.post('/customize_editing', (request: any, response: any) => {
    //colorとcategory_subを取得
    let color = request.body.color;
    let category_sub = request.body.category_sub;
    console.log(color);
    console.log(category_sub);
    response.render('create/customize_editing', {
        color: color,
        category_sub: category_sub
    });
});

router.get('/select_image_filter', function (request: any, response: any, next: any) {
    const uploaded_picture = "./images/4.jpg"
    response.render('create/select_image_filter', { uploaded_picture: uploaded_picture });
});

router.post('/work_settings', (request: any, response: any) => {
    //未完
    let category_sub = request.body.category_sub;
    response.render('create/work_settings', { category_sub: category_sub });
});

router.get('/work_settings', (request: any, response: any) => {
    //テスト用
    response.render('create/work_settings');
});

router.post('/work_setting_confirmation', (request: any, response: any) => {
    //未完
    
    response.render('create/work_setting_confirmation');
});

router.get('/work_setting_confirmation', (request: any, response: any) => {
    //テスト用
    response.render('create/work_setting_confirmation');
});


module.exports = router;


//not for use
{

    // router.get('/select_object_sub', (request: any, response: any) => {
    //     //GETパラメーターを取得
    //     let category = request.query.category;
    //     console.log(category);
    //     connection.query('select name_subcategory from base_category WHERE name_category = ? ORDER BY name_subcategory',
    //         [category],
    //         (err: any, results: any) => {
    //             console.log(results);
    //             if (err) {
    //                 console.error(err);
    //                 return;
    //             }
    //             // name_subcategoryがひとまとまりになるように取り出す
    //             let name_subcategory: string[] = [];
    //             for (let i = 0; i < results.length; i++) {
    //                 if (name_subcategory.indexOf(results[i].name_subcategory) === -1) {
    //                     name_subcategory.push(results[i].name_subcategory);
    //                 }
    //             }
    //             console.log("#####################################");

    //             //categoryをページに表示
    //             response.render('create/select_object_sub', {
    //                 category: category,
    //                 name_subcategory: name_subcategory
    //             });
    //         });
    // });

}