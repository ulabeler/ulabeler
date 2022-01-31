const passport = require("passport");
const LocalStrategy = require("passport-local");
import bcrypt from 'bcrypt';
import { knex } from '../app';
import { userTable } from '../tableType_alias';

module.exports = function (app: any) {
    passport.serializeUser(function (user: userTable, done: any) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id: string, done: any) {
        knex('user').where({ id: id }).first().then((user: userTable) => {
            done(null, user);
        });
    });
    passport.use(new LocalStrategy({
        usernameField: "username", //inputのname属性
        passwordField: "password",
    }, function (username: string, password: string, done: any) {
        knex('user').where('id', username).then((result: userTable[]) => {
            if (result.length === 0) {
                return done(null, false, { message: 'ユーザーが存在しません' });
            } else {
                bcrypt.compare(password, result[0].password, function (err: any, res: boolean) {
                    if (res) {
                        return done(null, result[0]);
                    } else {
                        return done(null, false, { message: 'パスワードが違います' });
                    }
                });
            }
        });
    }
    ));
};