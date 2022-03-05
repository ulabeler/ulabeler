/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
// eslint-disable-next-line new-cap
const router = express.Router();
// import bcrypt from "bcrypt";
// import { sendMail } from "../../tools/sendmail";
import { knex } from "../../app";
// eslint-disable-next-line camelcase
import {
  favorited_work_numberTable,
  favorited_workTable,
  favorited_user_numberTable,
  favorited_userTable,
} from "../../tools/TypeAlias/tableType_alias";
// import sideMenuList from "../../tools/data/sidemenu.json";
// import { v4 as uuidv4 } from "uuid"; //uuidv4()
// eslint-disable-next-line new-cap
// import passport from "passport";
// import crypto from "crypto";
// import multer from 'multer';
// import path from "path";
// import fse from 'fs-extra';

// import { UpImgDirBase } from "../../app"

type responseResultGetFavNum = {
  isFavorite: boolean;
  number: number;
};

router.post("/old/favorite/:workId", (request, response) => {
  if (!request.user) {
    response.status(403).send("unAuthorized");
  } else {
    const userId = request.user.id;
    const workId = request.params.workId;
    // const favorited_at = new Date();
    // const targetFavoriteItem: favorited_workTable = {
    //     favorite_from: userId,
    //     favorite_to: workId,
    //     favorited_at: favorited_at
    // }
    if (request.body.isFavorited != undefined && request.body.isFavorited) {
      // 登録済み→登録解除用
      knex("favorited_work")
        .where({
          favorite_from: userId,
          favorite_to: workId,
        })
        .del()
        .then(() => {
          knex("favorited_work_number")
            .where({
              favorited_to_id: workId,
            })
            .decrement("number", 1)
            .then(() => {
              response.status(201).send("Removed");
            })
            .catch((err: any) => {
              console.log(err);
              response.status(500).send("error");
            });
        });
    } else if (request.body.isFavorited == false) {
      // 未登録→登録用
      const userId = request.user.id;
      const workId = request.params.workId;
      const favorited_at = new Date();
      knex("favorited_work")
        .insert({
          favorite_from: userId,
          favorite_to: workId,
          favorited_at: favorited_at,
        })
        .then(() => {
          knex("favorited_work_number")
            .where({
              favorited_to_id: workId,
            })
            .increment("number", 1)
            .then(() => {
              response.status(201).send("Added");
            })
            .catch((err: any) => {
              console.log(err);
              response.status(500).send("error");
            });
        });
    } else {
      response.status(400).send("Bad Request");
    }
  }
});

router.post("/favorite/:workId", (request, response) => {
  if (!request.user) {
    response.status(401).send("unAuthorized");
  } else {
    const favorited_at = new Date();
    const targetFavoriteItem: favorited_workTable = {
      favorite_from: request.user.id,
      favorite_to: request.params.workId,
      favorited_at: favorited_at,
    };
    // favorited_workに該当idがあるか確認
    knex("favorited_work")
      .where({
        favorite_from: request.user.id,
        favorite_to: request.params.workId,
      })
      .then((rows: favorited_workTable[]) => {
        // rowsが空だったらinsert
        if (rows.length == 0) {
          knex("favorited_work")
            .insert(targetFavoriteItem)
            .then(() => {
              knex("favorited_work_number")
                .where({
                  favorited_to_id: targetFavoriteItem.favorite_to,
                })
                .increment("number", 1)
                .then(() => {
                  response.status(201).send("Added");
                })
                .catch((err: any) => {
                  console.log(err);
                  response.status(500).send("error");
                });
            })
            .catch((err: any) => {
              console.log(err);
              response.status(500).send("error");
            });
        } else {
          // rowsが空でなかったら削除
          knex("favorited_work")
            .where({
              favorite_from: targetFavoriteItem.favorite_from,
              favorite_to: targetFavoriteItem.favorite_to,
            })
            .del()
            .then(() => {
              knex("favorited_work_number")
                .where({
                  favorited_to_id: request.params.workId,
                })
                .decrement("number", 1)
                .then(() => {
                  response.status(201).send("Removed");
                })
                .catch((err: any) => {
                  console.log(err);
                  response.status(500).send("error");
                });
            })
            .catch((err: any) => {
              console.log(err);
              response.status(500).send("error");
            });
        }
      });
  }
});

router.post("/getworkfavnum", (request, response) => {
  console.log(request.body);
  if (!request.body.id) {
    response.status(400).send("Bad Request");
  } else {
    const workId = request.body.id;
    // 現在のお気に入り数を返す
    knex("favorited_work_number")
      .select("number")
      .where({
        favorited_to_id: workId,
      })
      .then((result: favorited_work_numberTable[]) => {
        console.log(result);
        if (result.length == 0) {
          response.status(404).send("Not Found");
        } else {
          const responseResult: responseResultGetFavNum = {
            number: result[0].number,
            isFavorite: false,
          };
          response.status(200).send(responseResult);
        }
      })
      .catch((err: any) => {
        console.log(err);
        response.status(500).send("error");
      });
  }
});

router.post("/getuserfavnum", (request, response) => {
  if (!request.body.id) {
    response.status(400).send("Bad Request");
  } else {
    const targetUserId = request.body.id;
    // 現在のお気に入り数を返す
    knex("favorited_user_number")
      .select("number")
      .where({
        favorited_to_id: targetUserId,
      })
      .then((result: favorited_user_numberTable[]) => {
        console.log(result);
        if (result.length == 0) {
          response.status(404).send("Not Found");
        } else {
          if (request.user) {
            const fromUserId = request.user.id;
            knex("favorited_user")
              .where({
                favorite_from: fromUserId,
                favorite_to: targetUserId,
              })
              .then((rows: favorited_userTable[]) => {
                if (rows.length == 0) {
                  const responseResult: responseResultGetFavNum = {
                    number: result[0].number,
                    isFavorite: false,
                  };
                  response.status(200).send(responseResult);
                } else {
                  const responseResult: responseResultGetFavNum = {
                    number: result[0].number,
                    isFavorite: true,
                  };
                  response.status(200).send(responseResult);
                }
              });
          } else {
            const responseResult: responseResultGetFavNum = {
              number: result[0].number,
              isFavorite: false,
            };
            response.status(200).send(responseResult); // number型のまま渡すとレスポンスコードと取り違えられてエラー吐くので文字列型に
          }
        }
      })
      .catch((err: any) => {
        console.log(err);
        response.status(500).send("error");
      });
  }
});

router.post("/delete", (request, response) => {
  if (!request.user) {
    response.status(401).send("unAuthorized");
  } else if (!request.body.workId) {
    response.status(400).send("Bad Request");
  } else {
    const targetWorkId = request.body.workId;
    const deletedAt = new Date();
    knex("work")
      .update({
        deleted_at: deletedAt,
      })
      .where({
        id: targetWorkId,
      })
      .then(() => {
        response.status(200).send("Deleted");
      })
      .catch((err: Error) => {
        console.log(err);
        response.status(500).send("error");
      });
  }
});

export default router;
