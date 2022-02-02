import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();

router.get("/", (request, response) => {
  response.render("train/payment/payment_test");
});

router.get("/checkout", (request, response) => {
  response.render("train/payment/checkout");
});

export default router;
