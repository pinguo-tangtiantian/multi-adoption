var express = require('express');
var session = require('express-session');
var path = require('path');
var cors = require('cors');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var port = 2333;
var app = express();

var passport = require('passport');
var flash = require('connect-flash');

// var passport = require('./util/passport')(pspt);
require('./util/passport')(passport);

// var pages = require('./routes/pages');
// var users = require('./routes/users');
// var api = require('./routes/api');

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);

// 设置图标
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //输出请求日志到控制台
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));

//设置跨域请求
app.use(cors());


//使服务器支持session
app.use(session({
  secret: 'Tang.Tritty@tritty.top',
  resave: false,
  saveUninitialized: false
}));

//初始化调用passport
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());

//不能放在最后
require('./routes/pages')(app, passport);


// app.use('/', pages);
// app.use('/users', users);
// app.use('/api', api);

// 捕获404错误并处理错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 处理错误
app.use(function(err, req, res, next) {
  // 本地设置，只在开发时提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error.tmpl.html', {message: err});
});




app.listen(port);
// module.exports = app;
