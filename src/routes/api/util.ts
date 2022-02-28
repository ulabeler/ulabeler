import express from "express";
import { cartTable } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
import { knex } from "../../app";

router.post("/cartCount", async (request, response) => {
  if (!request.user) {
    response.status(200).send("0");
  } else {
    const userId = request.user.id;
    const currentCart: cartTable[] = await knex("cart").where("userId", userId);
    if (currentCart.length === 0) {
      response.status(200).send("0");
    } else {
      // currentCart[i].quantityの合計を返す
      let sum = 0;
      for (let i = 0; i < currentCart.length; i++) {
        sum += currentCart[i].quantity;
      }
      response.status(200).send(sum.toString());
    }
  }
});

export default router;
