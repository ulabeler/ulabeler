//ここからts共通部分
export { };
const express = require('express');
const router = express.Router();


router.get('/', (request:any, response: any) => {
    response.render('train/payment/payment_test');
});

router.get('/checkout', (request:any, response: any) => {
    response.render('train/payment/checkout');
});

module.exports = router;