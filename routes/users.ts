var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request:any, response:any, next:any) {
  response.send('respond with a resource');
});

module.exports = router;
