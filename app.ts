export{};
const createError = require('http-errors');
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');



import { send_discord } from './tools/discord_send_message'; //メッセ送信処理 できればこれで状態監視できるようにしたい

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
//fabiconの設定
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//ルーティング設定
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const createRouter = require('./routes/create');
const paymentRouter = require('./routes/payment/payment');
const PayPayRouter = require('./routes/payment/paypay');
const TestRouter = require('./routes/test');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create', createRouter);
app.use('/payment', paymentRouter);
app.use('/payment/paypay', PayPayRouter);
app.use('/test', TestRouter);

// catch 404 and forward to error handler
app.use(function(request:any, response:any, next:any) {
  next(createError(404));
});

// error handler
app.use(function(error:any, request:any, response:any, next:any) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

module.exports = app;
