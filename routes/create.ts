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
    response.render('create/select_color', {
        category: category
    });
});

router.get('/customize_editing', (request: any, response: any) => {
    response.render('create/customize_editing');
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