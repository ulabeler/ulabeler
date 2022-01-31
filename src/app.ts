const environment:any = process.env.U_DB_ENVIRONMENT;
const knex_config = require('./config/knexfile')[environment];
const knex = require('knex')(knex_config);
export { knex };

//const createError = require('http-errors');
import express from 'express';
const app = express();
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cookieSession from "cookie-session";
import favicon from 'serve-favicon';

//secretをstring型で定義
const secret:string = process.env.SECRET || 'secret';

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
import userAPIRouter from './routes/api/user';
import indexRouter from './routes/top';
import paymentRouter from './routes/payment/payment';
import PayPayRouter from './routes/payment/paypay';
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
app.use(function (request, response) {
  //"./public/index.html"を返す
  //response.sendFile(path.join(__dirname, 'public', 'index.html'));
  //404エラーと表示する
  response.status(404).send("404 Not Found");
});

// error handler
app.use(function (error: { message: any; status: any; }, request: { app: { get: (arg0: string) => string; }; }, response: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }, next: any) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

export default app;
