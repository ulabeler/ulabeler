import express from 'express';
import { knex } from '../app';
// import bcrypt from 'bcrypt';
import { userTable } from 'TypeAlias/tableType_alias';
const router = express.Router();
// import { checkLogin } from '../tools/user';
// import { side_menu } from '../TypeAlias/misc_alias';
import side_menu_list from '../tools/data/sidemenu.json';

/* GET home page. */
router.get('/', function (request, response) {
  response.render('top', { side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`] });
});

router.get('/sign_up', function (request, response) {
  response.render('./user/sign_up', { side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`] });
});

router.get('/password_forgot', function (request, response) {
  response.render('./user/mail_address_input', { side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`] });
})

router.get('/password_forgot/sent', function (request, response) {
  response.render('./user/outgoing_mail_completion', { side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`] });
})

router.get('/reset_password', function (request:any, response) {
  //getパラメータにtokenが無ければ400エラー
  if (!request.query.token) {
    response.status(400).send('Bad Request');
    return;
  }
  //tokenが一致するものを取得
  knex('password_reset').where('token', request.query.token).then((results: any) => {
    //一致するものがなければ400エラー
    if (results.length === 0) {
      response.status(400).send('Forbidden');
      return;
    }
    //一致するものがあれば、そのidを取得
    const id: userTable['id'] = results[0].id;
    //sessionにidを保存
    request.session.id = id;
    response.render('./user/non_member_password_modification', { side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`] });
  })
})
export default router;