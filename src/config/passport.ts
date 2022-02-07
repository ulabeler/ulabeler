/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const passport = require("passport");
const LocalStrategy = require("passport-local");
import bcrypt from "bcrypt";
import { knex } from "../app";
import { userTable } from "../tools/TypeAlias/tableType_alias";
import { findById } from "../tools/user";
import cookieSession from "cookie-session";
import { mailCheck } from "../tools/mail_validate";
const secret: string = process.env.SECRET || "secret";

module.exports = function (app: any) {
  passport.serializeUser(function (user: userTable, done: any) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id: string, done: any) {
    try {
      const user = await findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "username", // inputのname属性
        passwordField: "password",
      },
      function (username: string, password: string, done: any) {
        if (mailCheck(username)) {
          knex("user")
            .where("mailaddress", username)
            .whereNull("deleted_at")
            .then((result: userTable[]) => {
              if (result.length === 0) {
                return done(null, false, { message: "ユーザーが存在しません" });
              } else {
                bcrypt.compare(
                  password,
                  result[0].password,
                  function (err: any, res: boolean) {
                    if (res) {
                      return done(null, result[0]);
                    } else {
                      return done(null, false, {
                        message: "パスワードが違います",
                      });
                    }
                  }
                );
              }
            });
        } else {
          knex("user")
            .where("id", username)
            .whereNull("deleted_at")
            .then((result: userTable[]) => {
              if (result.length === 0) {
                return done(null, false, { message: "ユーザーが存在しません" });
              } else {
                bcrypt.compare(
                  password,
                  result[0].password,
                  function (err: any, res: boolean) {
                    if (res) {
                      return done(null, result[0]);
                    } else {
                      return done(null, false, {
                        message: "パスワードが違います",
                      });
                    }
                  }
                );
              }
            });
        }
      }
    )
  );

  app.use(
    cookieSession({
      name: "session",
      keys: [secret],

      // Cookie Options
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })
  );

  app.use(passport.session());
};
