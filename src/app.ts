/* eslint-disable @typescript-eslint/no-explicit-any */
const environment = process.env.U_DB_ENVIRONMENT || "development";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require("./config/knexfile")[environment];
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require("knex")(knexConfig);
export { knex };


// const createError = require('http-errors');
import express from "express";
const app = express();
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import favicon from "serve-favicon";
import flash from "connect-flash";

import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended:true, limit: '10mb'}));
app.use(bodyParser.raw({limit: '10mb'}));
app.use(bodyParser.json({limit: '10mb'}));
// できるだけlimitを大きくしておく

export const UpImgDirBase = path.join(__dirname, 'public/images/');

// import { send_discord } from './tools/discord_send_message'; //メッセ送信処理 できればこれで状態監視できるようにしたい

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());
// faviconの設定
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// ルーティング設定
import userAPIRouter from "./routes/api/user";
import mediaAPIRouter from "./routes/api/media";
import workAPIRouter from "./routes/api/work";
import indexRouter from "./routes/top";
import paymentRouter from "./routes/payment/payment";
import PayPayRouter from "./routes/payment/paypay";
import workRouter from "./routes/work";
import passport from "passport";



// const usersRouter = require('./routes/alpha/users');
// const createRouter = require('./routes/alpha/create');
// const TestRouter = require('./routes/alpha/test');



// authorization
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("./config/passport")(app); // まだ
passport.initialize();
app.use(passport.session());

app.use("/", indexRouter);
// app.use('/users', usersRouter);
// app.use('/create', createRouter);
// app.use('/test', TestRouter);
app.use("/payment", paymentRouter);
app.use("/payment/paypay", PayPayRouter);
app.use("/api/user", userAPIRouter);
app.use("/api/media", mediaAPIRouter);
app.use("/api/work", workAPIRouter);
app.use("/work", workRouter);

// catch 404 and forward to error handler
app.use(function (request, response) {
  // "./public/index.html"を返す
  // response.sendFile(path.join(__dirname, 'public', 'index.html'));
  // 404エラーと表示する
  response.redirect("/notAvailable");
});

// error handler
app.use(function (
  error: { message: any; status: any },
  request: { app: { get: (arg0: string) => string } },
  response: {
    locals: { message: any; error: any };
    status: (arg0: any) => void;
    render: (arg0: string) => void;
  }
) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get("env") === "development" ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render("error");
});

export default app;
