/* eslint-disable @typescript-eslint/no-explicit-any */
const environment = process.env.U_DB_ENVIRONMENT || "development";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knexConfig = require("./config/knexfile")[environment];
// eslint-disable-next-line @typescript-eslint/no-var-requires
const knex = require("knex")(knexConfig);
export { knex };

import sideMenuList from "./tools/data/sidemenu.json";

// const createError = require('http-errors');
import express from "express";
const app = express();
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import favicon from "serve-favicon";
import flash from "connect-flash";

import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(bodyParser.raw({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
// できるだけlimitを大きくしておく

export const UpImgDirBase = path.join(__dirname, "public/images/");

import {
  sendDiscord,
  sendDiscordV2,
  setDiscordPayload,
} from "./tools/discord_send_message"; // メッセ送信処理 できればこれで状態監視できるようにしたい

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
import utilAPIROuter from "./routes/api/util";
import indexRouter from "./routes/top";
import mailModRouter from "./routes/mailMod";
import paymentRouter from "./routes/payment/payment";
import PayPayRouter from "./routes/payment/paypay";
import workRouter from "./routes/work";
import settingsRouter from "./routes/settings";
import favoriteRouter from "./routes/favorite";
import searchRouter from "./routes/search";
import purchaseRouter from "./routes/purchase";
import customizeRouter from "./routes/customize";
import workSetRouter from "./routes/workSet";
import passport from "passport";
import { discordMessageDetail } from "tools/TypeAlias/miscAlias";

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
app.use("/api/util", utilAPIROuter);
app.use("/work", workRouter);
app.use("/settings", settingsRouter);
app.use("/favorite", favoriteRouter);
app.use("/search", searchRouter);
app.use("/purchase", purchaseRouter);
app.use("/mail_address_modification", mailModRouter);
app.use("/workSet", workSetRouter);
app.use("/customize", customizeRouter);

// catch 404 and forward to error handler
// これは動いてる
app.use(function (request, response) {
  const detail: discordMessageDetail = {
    requestURI: request.originalUrl,
    statusCode: 404,
  };
  const payload = setDiscordPayload(environment, true, detail);
  sendDiscordV2(payload);
  response.status(404).render("./404_error", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (error: any, request: any, response: any, next: any) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  console.log(error);
  response.locals.status = error.status;
  // requestURIを取得
  const requestURI = request.originalUrl;
  response.locals.error = request.app.get("env") === "development" ? error : {};
  const detail: discordMessageDetail = {
    requestURI: requestURI,
    statusCode: 500,
    message: error.message,
  };
  const payload = setDiscordPayload(environment, true, detail);
  sendDiscordV2(payload);

  // render the error page
  response.status(error.status || 500).render("./500_error", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    status: error.status || 500,
  });
  return;
});

// Errorが発生したらsendDiscordで文字列を送信する
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (error: any, request: any, response: any, next: any) {
  sendDiscord(error.message);
});

export default app;
