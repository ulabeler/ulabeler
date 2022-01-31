import express from 'express';
const router = express.Router();


router.get('/', (request, response) => {
    response.render('train/payment/payment_test');
});

router.get('/checkout', (request, response) => {
    response.render('train/payment/checkout');
});

export default router;