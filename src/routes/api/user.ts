import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import { sendMail } from '../../tools/sendmail';
import { knex } from '../../app';
import { userTable, password_resetTable } from '../tableType_alias';
//import { get_isAuth } from '../tools/user';
const passport = require('passport');
//uuid
import { v4 as uuidv4 } from 'uuid';

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

router.post('/sign_in', passport.authenticate('local'), function (request, response) {
  response.status(200);
});

router.post('/v2_sign_in', function (request, response) {
  //キーが足りていなければ400を返す
  if (!request.body.username || !request.body.password) {
    response.status(400).send('Bad Request');
  }
  //passport.authenticate('local')で認証を行う
  //認証に失敗した場合、falseを返す
  //認証に成功した場合、"/"へリダイレクトする
  passport.authenticate('local', function (err: any, user: Express.User, info: any) {
    if (err) {
      console.log(err);
      response.status(500).send('Internal Server Error');
    } else if (!user) {
      response.status(200).send(false);
    } else {
      request.logIn(user, function (err) {
        if (err) {
          console.log(err);
          response.status(500).send('Internal Server Error');
        } else {
          response.status(200).send(true);
        }
      });
    }
  })(request, response);
});

router.post('/reset_password', function (request, response) {
  //キーが足りていなければ400を返す
  if (!request.body.mail) {
    response.status(400).send('Bad Request');
  } else {
    const mailaddress: userTable['mailaddress'] = request.body.mail;
    //該当するメールアドレスがあるかを確認し、あればそのidを取得
    knex('user').where('mailaddress', mailaddress).select('id').then((results: any) => {
      if (results.length > 0) {
        const temp: password_resetTable = {
          id: results[0].id,
          datetime_issue: new Date(),
          temp_password: uuidv4().replace(/-/g, ''),
          token: uuidv4().replace(/-/g, '')
        }
        //password_resetTableへ登録
        knex('password_reset').insert({
          id: temp.id,
          temp_password:  bcrypt.hashSync(temp.temp_password, 10),
          datetime_issue: temp.datetime_issue,
          token: temp.token
        }).then(function () {
          //パスワードを変更したので、メールを送る
          const env = process.env.U_DB_ENVIRONMENT || 'development';

          const host = env === 'development' ? 'http://localhost:3001' : 'https://ulabeler.na2na.website';

          const message = `<p>パスワード再設定のお知らせです。<br>仮のパスワードは以下を使用してください。<br>${temp.temp_password}<br><a href='${host}/reset_password?token=${temp.token}&id=${temp.id}'>こちら</a>からパスワードを再設定してください。</p>`
          sendMail("reset_password", mailaddress, message);
          response.status(201).send(true);
        }).catch(function (err: any) {
          console.log(err);
          response.status(500).send('Internal Server Error');
        });
      } else {
        response.status(200).send(false);
      }
    }).catch(function (err: any) {
      console.log(err);
      response.status(500).send('Internal Server Error');
    });
  }
});

router.post('/reset_password_attempt', function (request, response) {
  //パラメーターが足りなければ400
  if (!request.body.token || !request.body.new_password || !request.body.temp_password || !request.body.id) {
    response.status(400).send('Bad Request');
  } else {
    //パラメーターからidを取得
    const id: userTable['id'] = request.body.id;
    //パラメーターからtokenを取得
    const token: password_resetTable['token'] = request.body.token;
    //パラメーターからパスワードを取得
    const password: userTable['password'] = request.body.new_password;
    //パラメーターから仮のパスワードを取得
    const temp_password: password_resetTable['temp_password'] = request.body.temp_password;

    console.log(id);
    console.log(token);
    console.log(password);
    console.log(temp_password);


      //password_resetでtokenとidが一致するものを取得
      knex('password_reset').where('token', token).andWhere('id', id).select('*').then((results: any) => {
        if (results.length > 0) {
          bcrypt.compare(temp_password, results[0].temp_password, function (err: any, result: boolean) {
            if (result) {
              //パスワードを変更
              knex('user').where('id', id).update({
                password: bcrypt.hashSync(password, 10)
              }).then(function () {
                //password_resetを削除
                knex('password_reset').where('id', id).del().then(function () {
                  response.status(201).send(true);
                }).catch(function (err: any) {
                  console.log(err);
                  response.status(500).send('Internal Server Error');
                });
              }).catch(function (err: any) {
                console.log(err);
                response.status(500).send('Internal Server Error');
              });
            } else {
              response.status(200).send("Temp Password is wrong");
            }
          });
        } else {
          response.status(401).send("Token is wrong");
        }
      }).catch(function (err: any) {
        console.log(err);
        response.status(500).send('Internal Server Error');
      });
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
    try {
      knex('user').where('id', user.id).del().then(function () {
        response.status(200).send('Delete Success');
      });
    } catch {
      response.status(500).send('Internal Server Error');
    }
  }
});

export default router;