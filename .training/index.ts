const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const port = 8080;

//.envから設定を読み込む
const dotenv = require('dotenv');
dotenv.config();

import { send_discord } from './discord_sendmessage'; //メッセ送信処理 できればこれで状態監視できるようにしたい

app.use(bodyParser.urlencoded({ extended: true })); //リクエストbody取得のため
// テンプレートエンジンの指定
/**setメソッドで"view engine"というconfigに対し、テンプレートエンジンを指定
 *renderメソッドでレンダリングを行う
 *デフォルトだとviewsディレクトリからの相対パスになることに注意 */
app.set("view engine", "ejs");

const sess = {
    secret: 'secretsecretsecret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
}

app.use(session(sess));

//MySQL
//Prepared ステートメントを使えるらしい
//参考記事1
//https://www.irohabook.com/node-mysql

const mysql = require('mysql2');
const sql_settings = require("./config/sql.json"); //設定は別ファイルに乗っけました。
    let connection:any;
    let result:any;
    connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            multipleStatements: true
        });




const indexRouter = require('./routes/index');
const databaseRouter = require("./routes/database");
const sessionRouter = require("./routes/session/session");
const fileRouter = require("./routes/file/file");
const db_apiRouter = require("./routes/api/db");
const file_apiRouter = require("./routes/api/file");



//ルーティング設定を行う。
app.use('/', indexRouter);
app.use('/database', databaseRouter);
app.use('/session', sessionRouter);
app.use('/file', fileRouter);
app.use('/api_db', db_apiRouter);
app.use('/api_file', file_apiRouter);


/*
app.use(function(request:any, response:any, next:any){
    response.status(404);
    response.end('my notfound! : ' + request.path);
});
*/

    app.listen(port ,()=>{
        send_discord(`Server started, Running at Port ${port}`);
    });

//expressサーバーでエラーが発生したときに、Discordに通知する
app.use(function(err:any, request:any, response:any, next:any){
    send_discord(`\`\`\`${err.message}\`\`\``);
    response.status(500);
    response.end(err.message);
});

//Expressで発生したエラーをすべてDiscordへ送信する
process.on('uncaughtException', function(err:any){
    send_discord(` \`\`\`${err}\`\`\``);
});

//モジュールが見つけられなかった場合にエラーメッセージをDiscordへ送信する
process.on('unhandledRejection', function(err:any){
    send_discord(`\`\`\`${err}\`\`\``);
});

module.exports = app;