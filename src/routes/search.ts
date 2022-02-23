import express from "express";
// import { knex } from "../app";
// import bcrypt from 'bcrypt';
// eslint-disable-next-line new-cap
const router = express.Router();
// import sideMenuList from "../tools/data/sidemenu.json";
import { searchWordParse } from "../tools/parser";

router.get("/", (request, response) => {
  console.log(request.query.q);
  const searchQuery = searchWordParse(request.query.q as string);
  console.table(searchQuery);
  response.status(200).send("OK");
});

export default router;
