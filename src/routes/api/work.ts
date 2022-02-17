/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
const router = express.Router();
// import bcrypt from "bcrypt";
// import { sendMail } from "../../tools/sendmail";
import { knex } from "../../app";
// eslint-disable-next-line camelcase
import {} from "../../tools/TypeAlias/tableType_alias";
// import sideMenuList from "../../tools/data/sidemenu.json";
// import { v4 as uuidv4 } from "uuid"; //uuidv4()
// eslint-disable-next-line new-cap
// import passport from "passport";
// import crypto from "crypto";
// import multer from 'multer';
// import path from "path";
// import fse from 'fs-extra';

// import { UpImgDirBase } from "../../app"

router.post('/favorite/:workId', (request,response) => {
    if (!request.user){
        response.status(403).send("unAuthorized");
    }else{
        const userId = request.user.id;
        const workId = request.params.workId;
        // const favorited_at = new Date();
        // const targetFavoriteItem: favorited_workTable = {
        //     favorite_from: userId,
        //     favorite_to: workId,
        //     favorited_at: favorited_at
        // }
        if (request.body.isFavorited != undefined && request.body.isFavorited) { //登録済み→登録解除用
            knex("favorited_work")
            .where({
                favorite_from: userId,
                favorite_to: workId
            })
            .del()
            .then(() => {
                knex("favorited_work_number")
                .where({
                    favorited_to_id: workId
                })
                .decrement("number", 1)
                .then(() => {
                    response.status(201).send("Removed");
                })
                .catch((err:any) => {
                    console.log(err);
                    response.status(500).send("error");
                })
            })
        }else if (request.body.isFavorited == false){ // 未登録→登録用
            const userId = request.user.id;
            const workId = request.params.workId;
            const favorited_at = new Date();
            knex("favorited_work")
            .insert({
                favorite_from: userId,
                favorite_to: workId,
                favorited_at: favorited_at
            })
            .then(() => {
                knex("favorited_work_number")
                .where({
                    favorited_to_id: workId
                })
                .increment("number", 1)
                .then(() => {
                    response.status(201).send("Added");
                })
                .catch((err:any) => {
                    console.log(err);
                    response.status(500).send("error");
                })
            })
        }else{
            response.status(400).send("Bad Request");
        }
    }
})

export default router;