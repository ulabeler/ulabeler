import express from 'express';
const router = express.Router();
// import { checkLogin } from '../tools/user';
// import { side_menu } from '../TypeAlias/misc_alias';
import side_menu_list from '../tools/data/sidemenu.json';

/* GET home page. */
router.get('/', function (request: any, response: any) {
  const isAuth = Boolean(request.user);
  const side_menu = JSON.parse(JSON.stringify(side_menu_list));
  console.log(side_menu[`${isAuth}`].length);
  console.log(side_menu[`${isAuth}`]);
  //side_menuの件数を取得
  response.render('top', {side_menu: side_menu[`${isAuth}`]});
});

router.get('/sign_up', function (request: any, response: any) {
  response.render('sign_up');
});

export default router;