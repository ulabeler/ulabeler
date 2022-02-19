import express from "express";
import { knex } from "../app";
// import bcrypt from 'bcrypt';
import { userTable, workTable, base_categoryTable, favorited_work_numberTable, favorited_workTable } from "tools/TypeAlias/tableType_alias";
// eslint-disable-next-line new-cap
const router = express.Router();
// import { checkLogin } from '../tools/user';
// import { side_menu } from '../TypeAlias/misc_alias';
import sideMenuList from "../tools/data/sidemenu.json";
import crypto from "crypto";
const maxViewOnPage = 3; // 1ページに表示する最大件数

const env = process.env.U_DB_ENVIRONMENT || "development";
const host =
    env === "development"
        ? "http://localhost:3001"
        : "https://ulabeler.na2na.website";


        
export default router;
