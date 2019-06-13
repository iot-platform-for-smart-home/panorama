var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var session = require('express-session');
var indexRouter = require('./routes/index');
var uploadRouter = require('./routes/upload');
var usersRouter = require('./routes/users');

var RedisStore = require('connect-redis')(session);
var bodyParse = require('body-parser');

// ('http://47.105.120.203:30080/api/v1/deviceaccess/websocket');
var app = express();

// view engine setup
app.set('views', './views');
app.engine('html',ejs.__express);
app.set('view engine', 'html');

app.use(session({
  secret:'kobe',
  cookie:{maxAge:60*1000*30},
  resve:true,
  saveUninitialized:false,
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//静态文件在根目录下的public文件夹中
//app.use('/upload',express.static('upload'));
app.use('/api/v1/sphere', indexRouter);
app.use('/api/v1/sphere/upload',uploadRouter);
app.use('/api/v1/sphere/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
