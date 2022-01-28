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

/* GET home page. */
router.post('/check_userID',function(request: { body: { userID: any; }; }, response: { send: (arg0: boolean) => void; }, next: any) {
  //POSTで受け取ったデータをuserIDをキーにして取得
  let userID = request.body.userID;
  //SQL文を実行
  //該当するものがあればtrueを返す
  connection.query(`SELECT * FROM user WHERE id = ?`, [userID], function(err: any, results: string | any[], fields: any) {
    if (err) {
      console.log(err);
      response.send(false);
    } else {
      if (results.length > 0) {
        response.send(true);
      } else {
        response.send(false);
      }
    }
  });
});

module.exports = router;
