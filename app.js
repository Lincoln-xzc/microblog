var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs =require('ejs');
var connect = require('connect');
var settings = require('./setting');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);



var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var logout = require('./routes/logout');
var reg = require('./routes/reg');
var post = require('./routes/post');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: settings.cookieSecret,
  key: settings.db,
  cookie: {maxAge: 1000* 60 * 60 * 24 *30},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    url: 'mongodb://localhost/microblog'
  })
}));

app.use('/', routes);
app.use('/api/u/:user', post);
app.use('/api', login);
app.use('/api', logout);
app.use('/api', post);
app.use('/api', reg);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*app.dynamicMixins({
  user: function(req, res){
    return req.session.user;
  },
  error: function(req, res){
    var err = req.flash('error');
    if(err.length)
      return err;
    else
      return null;
  },
  success: function(req, res){
    var succ = req.flash('success');
    if(succ.length)
      return succ;
    else
      return null;
  },
});*/


module.exports = app;
