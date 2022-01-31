export { };
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
//ここまで共通部分
const mysql = require('mysql2');
let connection: any;
// let result: any;
import { sendMail } from '../../tools/sendmail';
import { knex } from '../../app';
import { userTable } from '../../tools/data/table_types';
connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

router.post('/check_userID', function (request: { body: { userID: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; send: (arg0: boolean) => void; }) {
  //キーが足りていなければ400を返す
  if (!request.body.userID) {
    response.status(400).send('Bad Request');
    return;
  } else {
    //POSTで受け取ったデータをuserIDをキーにして取得
    let userID = request.body.userID;
    //SQL文を実行
    //該当するものがあればtrueを返す
    connection.query(`SELECT * FROM user WHERE id = ?`, [userID], function (err: any, results: string | any[]) {
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
  }
});

router.post('/v2/check_userID', function (request: { body: { userID: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; send: (arg0: boolean) => void; }) {
  //キーが足りていなければ400を返す
  if (!request.body.userID) {
    response.status(400).send('Bad Request');
    return;
  } else {
    //POSTで受け取ったデータをuserIDをキーにして取得
    const user: userTable = {
      id: request.body.userID,
      name: '',
      password: '',
      mailaddress: '',
      icon_path: null,
      self_introduction: null,
      cardnumber: null,
      name_card: null,
      expiration: null,
      created_at: new Date(),
      deleted_at: null
    }
    //SQL文を実行
    //該当するものがあればtrueを返す
    //一致件数を取得
    knex('user').where('id', user.id).count('id as count').then((results: any) => {
      if (results[0].count > 0) {
        response.send(true);
      } else {
        response.send(false);
      }
    }).catch(function (err: any) {
      console.log(err);
      response.status(500).send('Internal Server Error');
    }
    );
  }
});

router.post('/sign_up', function (request: { body: { username: string; userID: string; password: string; email: string; }; }, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; send: (arg0: boolean) => void; }) {
  //キーが足りていなければ400を返す
  if (!request.body.username || !request.body.userID || !request.body.password || !request.body.email) {
    response.status(400).send('Bad Request');
  } else {
    const username = request.body.username;
    const userID = request.body.userID;
    const raw_password = request.body.password;
    const hashed_password = bcrypt.hashSync(raw_password, 10);
    const email = request.body.email;
    const created_at = new Date();

    connection.query(`INSERT INTO user (id, name, password, mailaddress, created_at) VALUES (?, ?, ?, ?, ?)`, [userID, username, hashed_password, email, created_at], function (err: any) {
      if (err) {
        console.log(err);
        response.send(false);
      } else {
        sendMail("sign_up_complete", email);
        response.send(true);
      }
    });
  }
});

router.post('/v2/sign_up', function (request: { body: { username: string; userID: string; password: string; email: string; }; }, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string | boolean): void; new(): any; }; }; }) {
  //キーが足りていなければ400を返す
  if (!request.body.username || !request.body.userID || !request.body.password || !request.body.email) {
    response.status(400).send('Bad Request');
  } else {
    const userdata: userTable = {
      id: request.body.userID,
      name: request.body.username,
      password: bcrypt.hashSync(request.body.password, 10),
      mailaddress: request.body.email,
      created_at: new Date(),
      icon_path: null,
      self_introduction: null,
      cardnumber: null,
      name_card: null,
      expiration: null,
      deleted_at: null
    };
    knex('user').insert({
      id: userdata.id,
      name: userdata.name,
      password: userdata.password,
      mailaddress: userdata.mailaddress,
      created_at: userdata.created_at
    }).then(function () {
      sendMail("sign_up_complete", userdata.mailaddress);
      response.status(201).send(true);
    }
    ).catch(function (err: any) {
      console.log(err);
      response.status(500).send('Internal Server Error');
    }
    );
  }
});

//CLI専用
//該当idのユーザーを物理削除
router.post('/dev/force_delete_user', function (request: { body: { userID: any; }; }, response: { status: (arg0: number) => { (): any; new(): any; send: { (arg0: string): void; new(): any; }; }; send: (arg0: string) => void; }) {
  //userIDが無ければ400を返す
  if (!request.body.userID) {
    response.status(400).send('Bad Request');
  } else {
    const user:userTable = {
      id: request.body.userID,
      name: '',
      password: '',
      mailaddress: '',
      icon_path: null,
      self_introduction: null,
      cardnumber: null,
      name_card: null,
      expiration: null,
      created_at: new Date(),
      deleted_at: null
    }
    connection.query(`DELETE FROM user WHERE id = ?`, [user.id], function (err: any) {
      if (err) {
        console.log(err);
        response.send("failed");
      } else {
        response.send("done");
      }
    });
  }
});

module.exports = router;