import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import { sendMail } from '../../tools/sendmail';
import { knex } from '../../app';
import { userTable } from '../tableType_alias';

router.post('/check_userID', function (request, response) {
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

router.post('/sign_up', function (request, response) {
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
router.post('/dev/force_delete_user', function (request, response) {
  //userIDが無ければ400を返す
  if (!request.body.userID) {
    response.status(400).send('Bad Request');
  } else {
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
    try{
      knex('user').where('id', user.id).del().then(function () {
        response.status(200).send('Delete Success');
      });
    }catch{
      response.status(500).send('Internal Server Error');
    }
  }
});

export default router;