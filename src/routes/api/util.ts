import express from "express";
import { cartTable, workTable } from "tools/TypeAlias/tableType_alias";
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

router.post("/cartUpdate", async (request, response) => {
  if (!request.user) {
    response.status(403).send("UnAuthorized");
  } else if (!request.body.workId || !request.body.quantity) {
    response.status(400).send("Bad Request");
  } else {
    await knex("cart")
      .where("userId", request.user.id)
      .andWhere("workId", request.body.workId)
      .update({ quantity: request.body.quantity })
      .catch((error: Error) => {
        console.log(error);
        response.status(500).send("Internal Server Error");
      });
    const unitPrice: workTable["unit_price"] = await knex("work")
      .select("unit_price")
      .where("id", request.body.workId);
    const newQuantityStr: string = request.body.quantity;
    const newQuantity: number = parseInt(newQuantityStr);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const totalPrice: number = unitPrice[0].unit_price * newQuantity;
    response.status(200).send(totalPrice.toString());
  }
});

router.post("/cartAdd", async (request, response) => {
  if (!request.user) {
    response.status(403).send("UnAuthorized");
  } else if (!request.body.workId) {
    response.status(400).send("Bad Request");
  } else {
    const isAlreadyExist = await knex("cart")
      .where("userId", request.user.id)
      .andWhere("workId", request.body.workId)
      .catch((error: Error) => {
        console.log(error);
        response.status(500).send("Internal Server Error");
      });
    if (isAlreadyExist.length === 0) {
      await knex("cart")
        .insert({
          userId: request.user.id,
          workId: request.body.workId,
          quantity: 1,
        })
        .catch((error: Error) => {
          console.log(error);
          response.status(500).send("Internal Server Error");
        });
    } else {
      await knex("cart")
        .where("userId", request.user.id)
        .andWhere("workId", request.body.workId)
        .increment("quantity", 1)
        .catch((error: Error) => {
          console.log(error);
          response.status(500).send("Internal Server Error");
        });
    }
    response.status(200).send("OK");
  }
});

router.post("/cartRemove", async (request, response) => {
  if (!request.user) {
    response.status(403).send("UnAuthorized");
  } else if (!request.body.workId) {
    response.status(400).send("Bad Request");
  } else {
    await knex("cart")
      .where("userId", request.user.id)
      .andWhere("workId", request.body.workId)
      .del()
      .catch((error: Error) => {
        console.log(error);
        response.status(500).send("Internal Server Error");
      });
    response.status(200).send(true);
  }
});

export default router;
