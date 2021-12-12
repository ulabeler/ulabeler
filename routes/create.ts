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

    connection.query('select id , name_subcategory from base_category WHERE name_category = ? ORDER BY name_subcategory',
        [category],
        (err: any, results: any) => {
            console.log(results);
            if (err) {
                console.error(err);
                return;
            }
            // name_subcategoryがひとまとまりになるように取り出す
            console.log(results);
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
    //Cookieからtitleとdescriptionを取得
    let title = request.cookies.title;
    console.log(title);
    let description = request.cookies.raw_description;
    console.log(description);
    console.log("#####################################");
    //Cookieからcategory_subを取得
    let category_sub = request.cookies.category_sub;
    response.render('create/work_settings_reedit'
        , {
            category_sub: category_sub,
            title: title,
            description: description
        });
});


router.post('/work_setting_confirmation', (request: any, response: any) => {
    //title,descriptionを取得
    let title = request.body.title;
    let description = request.body.description;
    //Cooikeに格納
    response.cookie('title', title);
    response.cookie('raw_description', description);
    // console.log("title:" + title);
    // console.log("description:" + description);
    //cookieから、category_subを取得
    let category_sub = request.cookies.category_sub;
    // console.log("category_sub:" + category_sub);
    //descriptionからハッシュタグの取り出し
    //hash_tag配列に格納
    let hash_tag: string[] = [];
    for (let i = 0; i < description.length; i++) {
        if (description[i] === "#") {
            let j = i;
            while (description[j] !== " " && description[j] !== "　" && description[j] !== "," && description[j] !== "." && description.length !== j) {
                j++;
            }
            let tag = description.slice(i, j);
            hash_tag.push(tag);
        }
    }
    //hash_tagの要素内に、\r\nがあれば、それ以降の値を削除
    for (let i = 0; i < hash_tag.length; i++) {
        if (hash_tag[i].indexOf("\r\n") !== -1) {
            hash_tag[i] = hash_tag[i].slice(0, hash_tag[i].indexOf("\r\n"));
        }
    }
    //descriptionから、hash_tagの要素を除去
    for (let i = 0; i < hash_tag.length; i++) {
        //hash_tagの要素の直後に"\r\n"があれば、それも除去する
        if (description.indexOf(hash_tag[i]) !== -1) {
            if (description.indexOf("\r\n", description.indexOf(hash_tag[i])) !== -1) {
                description = description.slice(0, description.indexOf(hash_tag[i])) + description.slice(description.indexOf("\r\n", description.indexOf(hash_tag[i])) + 2);
            } else {
                description = description.slice(0, description.indexOf(hash_tag[i])) + description.slice(description.indexOf(hash_tag[i]) + hash_tag[i].length);
            }
        }
    }
    //descriptionの先頭に、\r\nがあれば除去する
    if (description.startsWith("\r\n")) {
        description = description.slice(2);
    }
    // //descriptionの末尾に、\r\nがあれば除去する
    if (description.endsWith("\r\n")) {
        description = description.slice(0, description.length - 2);
    }
    console.log("hashtag:" + hash_tag);
    response.render('create/work_setting_confirmation', {
        category_sub: category_sub,
        title: title,
        description: description,
        hash_tag: hash_tag
    });
});


router.get('/work_setting_confirmation', (request: any, response: any) => {
    response.render('create/work_setting_confirmation')
});

router.post('/submit', (request: any, response: any) => {
    //POSTパラメータを取得
    //DB Insertに必要なものは
    // userID,category_ID,title(nameになってる),テクスチャの保存先,サムネの保存先,公開フラグ(booleanではなく0,1),単価,hash_tag,説明文,画像何枚使ったか,いんさーとした日時
    //Cookieからtitleとdescriptionを取得
    let user_id = "user";
    //category_idは、MySQLから取得
    connection.query('SELECT id FROM base_category WHERE name_subcategory = ?', request.cookies.category_sub, function (error: any, results: any, fields: any) {
        if (error) throw error;
        let category_id = results[0].id;
        console.log(category_id);
        let title = request.cookies.title;

        let is_public = 1;

        let amount = 300; //単価は後で作りこみ

        //POSTで送られてくるraw_hash_tagsは","で区切られているので、それを","で区切って配列に格納
        let raw_hash_tags = request.body.raw_hash_tags;
        let array_hash_tags: string[] = raw_hash_tags.split(",");
        //array_hash_tagsをjsonに変換
        let hash_tags = JSON.stringify(array_hash_tags);
        console.log(hash_tags);

        console.log("title:" + title);

        //POSTで送られてきたdescription_wo_tagsを取得
        let description_wo_tags = request.body.description_wo_tags;
        console.log("\"" + description_wo_tags + "\"");

        //テスト用
        const work_tex_path = "./public/images/works/001.png";
        const thumbnail_path = "./public/images/works/001_t.png";

        //insert文を作成
        let insert_sql = "INSERT INTO work (created_by_user_id,base_category_id,name,work_tex_path,thumbnail_path,flag_public,unit_price,hashtag,introduction,num_of_images,create_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
        //insert文に値を格納
        let insert_values = [user_id, category_id, title, work_tex_path, thumbnail_path, is_public, amount, hash_tags, description_wo_tags, 0, new Date()];
        try {
                    //insert文を実行
        connection.query(insert_sql, insert_values, function (error: any, results: any, fields: any) {
            if (error) throw error;
            console.log("The solution is: ", results);
            response.redirect('/');
        });
        } catch (error) {
            //エラー文responseで返す
            response.send(error);
        }

        //response.render('index');
    });
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