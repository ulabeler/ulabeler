/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
// import bcrypt from "bcrypt";
// import { sendMail } from "../../tools/sendmail";
// import { knex } from "../../app";
// eslint-disable-next-line camelcase
// import {
//   userTable,
//   favorited_workTable,
//   favorited_work_numberTable,
//   favorited_userTable
// } from "../../tools/TypeAlias/tableType_alias";
// import sideMenuList from "../../tools/data/sidemenu.json";
// import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line new-cap
const router = express.Router();
// import passport from "passport";
// import crypto from "crypto";

router.post(
    "/work/favorite",
    function (request, response) {
        response.status(200).send("unchi");
    }
);

export default router;
