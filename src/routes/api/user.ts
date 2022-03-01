/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import bcrypt from "bcrypt";
import { sendMail } from "../../tools/sendmail";
import { knex } from "../../app";
// eslint-disable-next-line camelcase
import {
  userTable,
  password_resetTable,
  mail_confirmationTable,
  reportTable,
  favorited_userTable,
  tempDeliverySettingsTable,
  // favorited_user_numberTable,
} from "../../tools/TypeAlias/tableType_alias";
import sideMenuList from "../../tools/data/sidemenu.json";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line new-cap
const router = express.Router();
import passport from "passport";
import crypto from "crypto";
// import multer from 'multer';
// import path from "path";
// import fse from 'fs-extra';

// システムエラー/Code:PW-EX1 → L500付近で吐く設定ではあるけどこの条件引くことはまずないと思います。。。

const env = process.env.U_DB_ENVIRONMENT || "development";

const host =
  env === "development"
    ? "http://localhost:3001"
    : "https://ulabeler.na2na.website";

router.post("/check_userID", function (request, response) {
  // キーが足りていなければ400を返す
  if (!request.body.userID) {
    response.status(400).send("Bad Request");
    return;
  } else {
    // POSTで受け取ったデータをuserIDをキーにして取得
    const user: userTable = {
      id: request.body.userID,
      name: "",
      password: "",
      mailaddress: "",
      icon_path: null,
      self_introduction: null,
      cardnumber: null,
      name_card: null,
      expiration: null,
      created_at: new Date(),
      deleted_at: null,
    };
    // SQL文を実行
    // 該当するものがあればtrueを返す
    // 一致件数を取得
    knex("user")
      .where("id", user.id)
      .count("id as count")
      .then((results: any) => {
        if (results[0].count > 0) {
          response.send(true);
        } else {
          response.send(false);
        }
      })
      .catch(function (err: any) {
        console.error(err);
        response.status(500).send("Internal Server Error");
      });
  }
});

router.post("/sign_up", function (request, response) {
  // キーが足りていなければ400を返す
  if (
    !request.body.username ||
    !request.body.userID ||
    !request.body.password ||
    !request.body.email
  ) {
    response.status(400).send("Bad Request");
  } else {
    const userdata: userTable = {
      id: request.body.userID,
      name: request.body.username,
      password: bcrypt.hashSync(request.body.password, 10),
      mailaddress: request.body.email,
      created_at: new Date(),
      icon_path:
        "https://mediaulabeler.na2na.website/media/icon/9d5c5ebe-17b0-4a9c-b2d2-79df2d0b2a43.png",
    };
    knex("user")
      .insert({
        id: userdata.id,
        name: userdata.name,
        password: userdata.password,
        mailaddress: userdata.mailaddress,
        created_at: userdata.created_at,
        icon_path: userdata.icon_path,
      })
      .then(function () {
        // favorited_user_numberテーブルにデータを追加
        knex("favorited_user_number")
          .insert({
            favorited_to_id: userdata.id,
            number: 0,
          })
          .then(function () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            sendMail("sign_up_complete", userdata.mailaddress);
            response.status(201).send(true);
          });
      })
      .catch(function (err: any) {
        console.error(err);
        response.status(500).send("Internal Server Error");
      });
  }
});

router.post(
  // ログインはこれだけ
  "/sign_in",
  passport.authenticate("local"),
  function (request, response) {
    response.status(200);
  }
);

router.post("/v2_sign_in", function (request, response) {
  // キーが足りていなければ400を返す
  if (!request.body.username || !request.body.password) {
    response.status(400).send("Bad Request");
    return;
  }
  // passport.authenticate('local')で認証を行う
  // 認証に失敗した場合、falseを返す
  // 認証に成功した場合、"/"へリダイレクトする
  passport.authenticate("local", function (err: any, user: Express.User) {
    if (err) {
      console.error(err);
      response.status(500).send("Internal Server Error");
    } else if (!user) {
      response.status(200).send(false);
    } else {
      request.logIn(user, function (err) {
        if (err) {
          console.error(err);
          response.status(500).send("Internal Server Error");
        } else {
          response.status(200).send(true);
        }
      });
    }
  })(request, response);
});

router.post("/create/temp_password", function (request, response) {
  // キーが足りていなければ400を返す
  if (!request.body.mail) {
    response.status(400).send("Bad Request");
  } else {
    const mailaddress: userTable["mailaddress"] = request.body.mail as string;
    // 該当するメールアドレスがあるかを確認し、あればそのidを取得
    knex("user")
      .where("mailaddress", mailaddress)
      .select("id")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((results: any) => {
        if (results.length > 0) {
          // eslint-disable-next-line camelcase
          const temp: password_resetTable = {
            id: results[0].id,
            datetime_issue: new Date(),
            temp_password: uuidv4().replace(/-/g, ""),
            token: uuidv4().replace(/-/g, ""),
          };
          // password_resetTableへ登録
          knex("password_reset")
            .insert({
              id: temp.id,
              temp_password: bcrypt.hashSync(temp.temp_password, 10),
              datetime_issue: temp.datetime_issue,
              token: temp.token,
            })
            .then(function () {
              // パスワードを変更したので、メールを送る
              const message = `<p>パスワード再設定のお知らせです。<br>仮のパスワードは以下を使用してください。<br>${temp.temp_password}<br><a href='${host}/reset_password?token=${temp.token}&id=${temp.id}'>こちら</a>からパスワードを再設定してください。<br>有効期限は、1時間です。</p>`;
              sendMail("reset_password", mailaddress, message);
              response.status(201).send(true);
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .catch(function (err: any) {
              console.error(err);
              response.status(500).send("Internal Server Error");
            });
        } else {
          response.status(200).send(false);
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch(function (err: any) {
        console.error(err);
        response.status(500).send("Internal Server Error");
      });
  }
});

router.post("/reset_password_attempt", function (request, response) {
  // パラメーターが足りなければ400
  if (
    !request.body.token ||
    !request.body.new_password ||
    !request.body.temp_password ||
    !request.body.id
  ) {
    response.status(400).send("Bad Request");
  } else {
    // パラメーターからidを取得
    const id: userTable["id"] = request.body.id;
    // パラメーターからtokenを取得
    // eslint-disable-next-line camelcase
    const token: password_resetTable["token"] = request.body.token;
    // パラメーターからパスワードを取得
    const password: userTable["password"] = request.body.new_password as string;
    // パラメーターから仮のパスワードを取得
    // eslint-disable-next-line camelcase
    const temp_password: password_resetTable["temp_password"] =
      request.body.temp_password;

    // password_resetでtokenとidが一致するものを取得
    knex("password_reset")
      .where("token", token)
      .andWhere("id", id)
      .select("*")
      .then((results: any) => {
        if (results.length > 0) {
          bcrypt.compare(
            temp_password,
            results[0].temp_password,
            function (err: any, result: boolean) {
              if (result) {
                // パスワードを変更
                knex("user")
                  .where("id", id)
                  .update({
                    password: bcrypt.hashSync(password, 10),
                  })
                  .then(function () {
                    // password_resetを削除
                    knex("password_reset")
                      .where("id", id)
                      .del()
                      .then(function () {
                        response.status(201).send(true);
                      })
                      .catch(function (err: any) {
                        console.error(err);
                        response.status(500).send("Internal Server Error");
                      });
                  })
                  .catch(function (err: any) {
                    console.error(err);
                    response.status(500).send("Internal Server Error");
                  });
              } else {
                response.status(200).send("Temp Password is wrong");
              }
            }
          );
        } else {
          const message = "存在しないトークンです。";
          response.render("./components/message", {
            side_menu: JSON.parse(JSON.stringify(sideMenuList))[
              `${Boolean(request.user)}`
            ],
            message: message,
          });
        }
      })
      .catch(function (err: any) {
        console.error(err);
        response.status(500).send("Internal Server Error");
      });
  }
});

router.post("/check_email", function (request, response) {
  if (!request.body.email) {
    response.status(400).send("Bad Request");
  } else {
    // userテーブルに、該当するメールアドレスがあるかを確認
    knex("user")
      .where("mailaddress", request.body.email)
      .select("mailaddress")
      .then((results: any) => {
        if (results.length > 0) {
          response.status(200).send(true);
        } else {
          response.status(200).send(false);
        }
      })
      .catch(function (err: any) {
        console.error(err);
        response.status(500).send("Internal Server Error");
      });
  }
});

router.post(
  "/create/modification_mailaddress/confirmationCode",
  function (request, response) {
    if (!request.body.mailaddress) {
      response.status(400).send("Bad Request");
      return;
    } else if (!request.user) {
      response.status(401).send("Unauthorized");
      return;
    }
    // 4桁のランダムな数字の列を作成
    // 先頭0も許容する
    const S = "0123456789";
    const randomCode = Array.from(crypto.randomFillSync(new Uint8Array(4)))
      .map((n) => S[n % S.length])
      .join("");
    // eslint-disable-next-line camelcase
    const newMailAddress: mail_confirmationTable = {
      user_id: request.user.id,
      datetime_issue: new Date(),
      mailaddress_new: request.body.mailaddress,
      token_confirmation: randomCode,
    };
    // mail_confirmationにすでに同じidが登録されていた場合、削除する
    knex("mail_confirmation")
      .where("user_id", request.user.id)
      .del()
      .then(function () {
        knex("mail_confirmation")
          .insert(newMailAddress)
          .then(function () {
            // メール送信
            const message =
              "メールアドレスの変更手続きを行います。<br>" +
              "確認コードは以下のとおりです。<br>" +
              "確認コード：" +
              randomCode +
              `<br><a href=\"${host}/mail_address_modification/confirmationCode?id=${crypto
                .createHash("sha256")
                .update(newMailAddress.user_id, "utf8")
                .digest(
                  "hex"
                )}">こちら</a>メールアドレスの変更を完了してください。<br>なお、確認コードの有効期限は1時間です。`;

            sendMail(
              "modification_mailaddress",
              newMailAddress.mailaddress_new,
              message
            );
            response.status(201).send(true);
            return;
          })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch(function (err: any) {
            console.error(err);
            response.status(500).send("Internal Server Error");
            return;
          });
      })
      .catch(function (err: any) {
        console.error(err);
        response.status(500).send("Internal Server Error");
        return;
      });
  }
);

router.post("/modification_mailaddress_attempt", function (request, response) {
  if (!request.body.confirmationAttemptCode) {
    response.status(400).send("Bad Request");
    return;
  } else if (!request.user) {
    response.status(401).send("Unauthorized");
    return;
  } else {
    // eslint-disable-next-line camelcase
    const id: userTable["id"] = request.user.id;
    // eslint-disable-next-line camelcase
    const confirmationAttemptCode: mail_confirmationTable["token_confirmation"] =
      request.body.confirmationAttemptCode;
    // mail_confirmationテーブルに、該当するidがあるかを確認
    knex("mail_confirmation")
      .where("user_id", id)
      .select("*")
      .then(
        (results: any) => {
          if (results.length > 0) {
            // もし、datetime_issueが1時間以内なら
            if (
              new Date(results[0].datetime_issue).getTime() + 1000 * 60 * 60 >
              new Date().getTime()
            ) {
              // eslint-disable-next-line camelcase
              const tokenConfirmation: mail_confirmationTable["token_confirmation"] =
                results[0].token_confirmation;
              if (tokenConfirmation === confirmationAttemptCode) {
                // メールアドレスを変更
                knex("user")
                  .where("id", id)
                  .update({
                    mailaddress: results[0].mailaddress_new,
                  })
                  .then(function () {
                    // mail_confirmationを削除
                    knex("mail_confirmation")
                      .where("user_id", id)
                      .del()
                      .then(function () {
                        response.status(201).send(true);
                      })
                      .catch(function (err: Error) {
                        console.error(err);
                        response.status(500).send("Internal Server Error");
                      });
                  })
                  .catch(function (err: Error) {
                    console.error(err);
                    response.status(500).send("Internal Server Error");
                  });
              } else {
                response
                  .status(200)
                  .send("入力された認証コードは間違っています。");
              }
            } else {
              response
                .status(200)
                .send(
                  "認証コードの有効期限が切れています。<br>お手数ですが、もう一度最初からお試しください。"
                );
            }
          } else {
            response
              .status(200)
              .send(
                "メールアドレスを変更したいアカウントでログインしてください。"
              );
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )
      .catch(function (err: any) {
        console.error(err);
        response.status(500).send("Internal Server Error");
      });
  }
});

router.post("/password/changeAttempt", function (request, response) {
  if (!request.body.CurrentPassword && !request.body.NewPassword) {
    response.status(400).send("Bad Request");
    return;
  } else if (!request.user) {
    response.render("./components/message", {
      side_menu: JSON.parse(JSON.stringify(sideMenuList))[
        `${Boolean(request.user)}`
      ],
      message: "不正な画面遷移です。",
    });
  } else {
    const CurrentPassword: userTable["password"] = request.body
      .CurrentPassword as string;
    const NewPassword: userTable["password"] = bcrypt.hashSync(
      request.body.NewPassword,
      10
    );
    const id: userTable["id"] = request.user.id;
    // bycript.compareを用いて、CurrentPasswordを評価する
    knex("user")
      .where("id", id)
      .select("*")
      .then(
        (results: any) => {
          if (results.length > 0) {
            if (bcrypt.compareSync(CurrentPassword, results[0].password)) {
              knex("user")
                .where("id", id)
                .update({
                  password: NewPassword,
                })
                .then(function () {
                  response.status(201).send(true);
                })
                .catch(function (err: any) {
                  console.error(err);
                  response.status(500).send("Internal Server Error");
                });
            } else {
              response.status(200).send("現在のパスワードが間違っています。");
            }
          } else {
            response.status(200).send("システムエラー/Code:PW-EX1"); // ログインユーザーidで引いてるのにユーザーが存在しないってことある？？
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )
      .catch(function (err: any) {
        console.error(err);
        response.status(500).send("Internal Server Error");
      });
  }
});

router.post("/modification_userinfo_attempt", function (request, response) {
  if (request.user) {
    if (!request.body.name && !request.body.self_introduction) {
      response.status(400).send("Bad Request");
      return;
    } else {
      const id: userTable["id"] = request.user.id;
      const newName: userTable["name"] = request.body.name;
      const newSelfIntroduction: userTable["self_introduction"] =
        request.body.self_introduction;
      knex("user")
        .where("id", id)
        .update({
          name: newName,
          self_introduction: newSelfIntroduction,
        })
        .then(function () {
          response.status(201).send(true);
        })
        .catch(function (err: any) {
          console.error(err);
          response.status(500).send("Internal Server Error");
        });
    }
  } else {
    response.status(200).send("ログインしていません。"); // まあまず出ないはず
  }
});

router.post("/report/create", function (request, response) {
  if (request.user) {
    if (
      !request.body.reportId &&
      !request.body.reportDescription &&
      !request.body.reportToWorkId
    ) {
      response.status(400).send("Bad Request");
    } else {
      const userId = request.user.id;
      // request.body.reportToWorkIdに該当するworkを取得
      knex("work")
        .where("id", request.body.reportToWorkId)
        .select("*")
        .then((results: any) => {
          if (results.length > 0) {
            // reportを作成
            const report: reportTable = {
              id: null,
              reported_to_user_id: results[0].created_by_user_id,
              reported_from_user_id: userId,
              category_id: request.body.reportId,
              reported_description: request.body.reportDescription,
              reported_at: new Date(),
            };
            knex("report")
              .insert(report)
              .then(function () {
                response.status(201).send(true);
              })
              .catch(function (err: any) {
                console.error(err);
                response.status(500).send("Internal Server Error");
              });
          } else {
            response.status(200).send("指定されたworkは存在しません。");
          }
        })
        .catch(function (err: any) {
          console.error(err);
          response.status(500).send("Internal Server Error");
        });
    }
  } else {
    response.status(401).send("UnAuthorized");
  }
});

router.post("/favorite/:userId", (request, response) => {
  if (!request.user) {
    response.status(401).send("Forbidden");
  } else {
    const targetFavorite: favorited_userTable = {
      favorite_from: request.user.id,
      favorite_to: request.params.userId,
      favorited_at: new Date(),
    };
    // すでにお気に入りしているか確認
    knex("favorited_user")
      .where({
        favorite_from: targetFavorite.favorite_from,
        favorite_to: targetFavorite.favorite_to,
      })
      .then((row: favorited_userTable[]) => {
        if (row.length == 0) {
          knex("favorited_user")
            .insert(targetFavorite)
            .then(() => {
              // favorited_user_numberTableを更新
              knex("favorited_user_number")
                .where("favorited_to_id", request.params.userId)
                .increment("number", 1)
                .then(() => {
                  response.status(201).send("Added");
                })
                .catch((err: any) => {
                  console.error(err);
                  response.status(500).send("Internal Server Error");
                });
            })
            .catch((err: any) => {
              console.error(err);
              response.status(500).send("Internal Server Error");
            });
        } else {
          // 削除
          knex("favorited_user")
            .where({
              favorite_from: targetFavorite.favorite_from,
              favorite_to: targetFavorite.favorite_to,
            })
            .del()
            .then(() => {
              // favorited_user_numberTableを更新
              knex("favorited_user_number")
                .where("favorited_to_id", request.params.userId)
                .decrement("number", 1)
                .then(() => {
                  response.status(201).send("Removed");
                })
                .catch((err: any) => {
                  console.error(err);
                  response.status(500).send("Internal Server Error");
                });
            })
            .catch((err: any) => {
              console.error(err);
              response.status(500).send("Internal Server Error");
            });
        }
      });
  }
});

router.post("/isLogin", (request, response) => {
  if (request.user) {
    response.status(200).send(true);
  } else {
    response.status(200).send(false);
  }
});

router.post("/updateTempDeliveryInfo", async (request, response) => {
  if (!request.user) {
    response.status(401).send("Forbidden");
  } else {
    const currentTempData: tempDeliverySettingsTable[] = await knex(
      "tempDeliverySettings"
    ).where({
      userId: request.user.id,
    });
    if (currentTempData.length === 0) {
      // 日付設定
      let estimatedDeliveryDate: Date;
      if (request.body.deliverySpeedType == "custom") {
        estimatedDeliveryDate = new Date(request.body.customDate);
      } else if (request.body.deliverySpeedType == "none") {
        // estimatedDeliveryDateは3日後
        estimatedDeliveryDate = new Date(
          new Date().setDate(new Date().getDate() + 3)
        );
      } else {
        estimatedDeliveryDate = new Date(
          new Date().setDate(new Date().getDate() + 1)
        );
      }

      const tempDeliveryInfo: tempDeliverySettingsTable = {
        userId: request.user.id,
        estimatedDeliveryDate: estimatedDeliveryDate,
        estimatedDeliveryTimeCategory: request.body.customTime,
        effectiveDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      };
      await knex("tempDeliverySettings")
        .insert(tempDeliveryInfo)
        .then(() => {
          console.log(tempDeliveryInfo);
          response.status(201).send(true);
        })
        .catch((err: Error) => {
          console.error(err);
          response.status(500).send("Internal Server Error");
        });
    } else {
      // 日付設定
      let estimatedDeliveryDate: Date;
      if (request.body.deliverySpeedType == "custom") {
        estimatedDeliveryDate = new Date(request.body.customDate);
      } else if (request.body.deliverySpeedType == "none") {
        // estimatedDeliveryDateは3日後
        estimatedDeliveryDate = new Date(
          new Date().setDate(new Date().getDate() + 3)
        );
      } else {
        estimatedDeliveryDate = new Date(
          new Date().setDate(new Date().getDate() + 1)
        );
      }

      const tempDeliveryInfo: tempDeliverySettingsTable = {
        userId: request.user.id,
        estimatedDeliveryDate: estimatedDeliveryDate,
        estimatedDeliveryTimeCategory: request.body.customTime,
        effectiveDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      };
      console.log(tempDeliveryInfo);
      await knex("tempDeliverySettings")
        .where({
          userId: request.user.id,
        })
        .update(tempDeliveryInfo)
        .then(() => {
          console.log(tempDeliveryInfo);
          response.status(201).send(true);
        })
        .catch((err: Error) => {
          console.error(err);
          response.status(500).send("Internal Server Error");
        });
    }
  }
});

// CLI専用
// 該当idのユーザーを物理削除
router.post("/dev/force_delete_user", function (request, response) {
  // userIDが無ければ400を返す
  if (!request.body.userID) {
    response.status(400).send("Bad Request");
  } else {
    const user: userTable = {
      id: request.body.userID,
      name: "",
      password: "",
      mailaddress: "",
      icon_path: null,
      self_introduction: null,
      cardnumber: null,
      name_card: null,
      expiration: null,
      created_at: new Date(),
      deleted_at: null,
    };
    try {
      knex("user")
        .where("id", user.id)
        .del()
        .then(function () {
          response.status(200).send("Delete Success");
        });
    } catch {
      response.status(500).send("Internal Server Error");
    }
  }
});

export default router;
