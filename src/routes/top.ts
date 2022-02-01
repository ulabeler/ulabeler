import express from 'express';
const router = express.Router();
// import { checkLogin } from '../tools/user';
// import { side_menu } from '../TypeAlias/misc_alias';
import side_menu_list from '../tools/data/sidemenu.json';

/* GET home page. */
router.get('/', function (request, response) {
  response.render('top', {side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`]});
});

router.get('/sign_up', function (request, response) {
  response.render('./user/sign_up', {side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`]});
});

router.get('/password_forgot', function(request, response){
  response.render('./user/mail_address_input', {side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`]});
})

router.get('/password_forgot/sent', function(request, response){
  response.render('./user/outgoing_mail_completion', {side_menu: JSON.parse(JSON.stringify(side_menu_list))[`${Boolean(request.user)}`]});
})

export default router;