var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(request:any, response:any, next:any) {
    const set_picture = "./images/4.jpg"
    response.render('testuse/index', { set_picture: set_picture });
});

router.get('/train-canvas', function(request:any, response:any, next:any) {
    response.render('testuse/train-canvas');
});

module.exports = router;