export{};
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const app = express();

import { send_discord } from './tools/discord_send_message'; //メッセ送信処理 できればこれで状態監視できるようにしたい

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//ルーティング設定
const createRouter = require('./routes/create');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create', createRouter);

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
