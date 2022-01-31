var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request:any, response:any, next:any) {
  response.render('index', { title: 'Express' });
});

module.exports = router;
