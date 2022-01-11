import { request } from "http";

//ここからts共通部分
export {};
const express = require('express');
const uuid = require('node-uuid');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const up_directory_static:string = path.resolve(__dirname, '..', '..').replace(/\\/g, "/") + "/public";  // アプリケーションフォルダのサブディレクトリ "./tmp" をアップロード先にしている。
console.log(up_directory_static);
const upload_static = multer({dest:up_directory_static});
//ここまで共通部分

import { send_discord } from '../../discord_sendmessage';



router.post('/single_upload_static', upload_static.single('single_image'), (request:any, response:any) => {
    const path = request.file.path.replace(/\\/g, "/");
    if (path) {
        //ファイルの拡張子を取得
        const ext = request.file.originalname.split('.').pop();
        const dest = up_directory_static + "/" + uuid.v4() + "." + ext;
        fs.renameSync(path, dest);  // 長い一時ファイル名を元のファイル名にリネームする。
        //response.render('upload', {message: `${dest} にアップロードされました。`});
    }
    else {
        //response.render('upload', {message: "エラー：アップロードできませんでした。"});
        console.log("エラー：アップロードできませんでした。");
    }
});


router.post('/single_upload', (request:any, response:any) => {
    let upload_uid_temp = path.resolve(__dirname, '..', '..').replace(/\\/g, "/") + "/public/users" + "/" + request.session.uid + "/images/temp"
    let upload = multer({
        dest: upload_uid_temp,
        onError: function (error:any, next:any) {
            send_discord(`\`\`\`${error}\`\`\``);
        }
    });
    upload.single('single_image')(request, response, (error:any) => {
        const path = request.file.path.replace(/\\/g, "/");
        console.log(request.file);
        //リダイレクト処理
        if (error) {
            console.log(error);
            response.redirect('/');
        }
        else {
            console.log(request.file);
            const ext = request.file.originalname.split('.').pop();
            const dest = upload_uid_temp + "/" + uuid.v4() + "." + ext;
            fs.renameSync(path, dest);  // 長い一時ファイル名を元のファイル名にリネームする。
            //ファイル名をセッションに保存
            request.session.temp_img_name = dest.replace(/\\/g, "/")
            send_discord(`\`\`\`${request.file}\`\`\``);
            response.redirect('/');
        }
    });
});


module.exports = router;