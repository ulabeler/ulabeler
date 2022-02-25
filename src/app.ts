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
import mailModRouter from "./routes/mailMod";
import paymentRouter from "./routes/payment/payment";
import PayPayRouter from "./routes/payment/paypay";
import workRouter from "./routes/work";
import settingsRouter from "./routes/settings";
import favoriteRouter from "./routes/favorite";
import searchRouter from "./routes/search";
import purchaseRouter from "./routes/purchase";
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
app.use("/settings", settingsRouter);
app.use("/favorite", favoriteRouter);
app.use("/search", searchRouter);
app.use("/purchase", purchaseRouter);
app.use("/mail_address_modification", mailModRouter);

// catch 404 and forward to error handler
app.use(function (request, response) {
  const userInfo = request.user ? request.user : null;
  response.status(404).render("./components/message", {
    side_menu: JSON.parse(JSON.stringify(sideMenuList))[
      `${Boolean(request.user)}`
    ],
    message:
      "404 Not Found.<br>この画面が出ている原因として、以下の理由が考えられます<center><ul><li>未実装</li><li>ファイルが見つからない</li><li>リクエストURIが間違っている</li></ul></center>",
    userInfo: userInfo,
  });
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
