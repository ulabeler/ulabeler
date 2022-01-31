const environment:any = process.env.U_DB_ENVIRONMENT;
const knex_config = require('./config/knexfile')[environment];
const knex = require('knex')(knex_config);
export { knex };

//const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cookieSession = require("cookie-session");
const favicon = require('serve-favicon');
const secret = process.env.U_COOKIESESSION_SECRET;

app.use(
  cookieSession({
    name: "session",
    keys: [secret],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

//import { send_discord } from './tools/discord_send_message'; //メッセ送信処理 できればこれで状態監視できるようにしたい

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
//faviconの設定
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//ルーティング設定
const userAPIRouter = require('./routes/api/user');
const indexRouter = require('./routes/top');
const paymentRouter = require('./routes/payment/payment');
const PayPayRouter = require('./routes/payment/paypay');
// const usersRouter = require('./routes/alpha/users');
// const createRouter = require('./routes/alpha/create');
// const TestRouter = require('./routes/alpha/test');

// authorization
//require("./config/passport_config")(app); //まだ

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/create', createRouter);
// app.use('/test', TestRouter);
app.use('/payment', paymentRouter);
app.use('/payment/paypay', PayPayRouter);
app.use('/api/user', userAPIRouter);


// catch 404 and forward to error handler
app.use(function (request:any, response: any) {
  //"./public/index.html"を返す
  //response.sendFile(path.join(__dirname, 'public', 'index.html'));
  //404エラーと表示する
  response.status(404).send("404 Not Found");
});

// error handler
app.use(function (error: any, request: any, response: any) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
