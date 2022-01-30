export { };
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
//ここまで共通部分
const mysql = require('mysql2');
let connection: any;
let result: any;
import { sendMail } from '../../tools/sendmail';
connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

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

router.post('/sign_up',function(request: { body: { username: string; userID: string; password: string; email: string; }; }, response: { send: (arg0: boolean) => void; }, next: any) {
  const username = request.body.username;
  const userID = request.body.userID;
  const raw_password = request.body.password;
  const hashed_password = bcrypt.hashSync(raw_password, 10);
  const email = request.body.email;
  const created_at = new Date();

  connection.query(`INSERT INTO user (id, name, password, mailaddress, created_at) VALUES (?, ?, ?, ?, ?)`, [userID, username, hashed_password, email, created_at], function(err: any, results: string | any[], fields: any) {
    if (err) {
      console.log(err);
      response.send(false);
    } else {
      sendMail("sign_up_complete", email);
      response.send(true);
    }
  });
});

//API専用
//該当idのユーザーを物理削除
router.post('/dev/delete_user', function(request: { body: { userID: any; }; }, response: { send: (arg0: boolean) => void; }, next: any) {
  let userID = request.body.userID;
  connection.query(`DELETE FROM user WHERE id = ?`, [userID], function(err: any, results: string | any[], fields: any) {
    if (err) {
      console.log(err);
      response.send(false);
    } else {
      response.send(true);
    }
  });
});

module.exports = router;
