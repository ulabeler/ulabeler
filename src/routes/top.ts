export { };
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (request: any, response: any) {
  response.render('top');
});

router.get('/sign_up', function (request: any, response: any) {
  response.render('sign_up');
});

export default router;