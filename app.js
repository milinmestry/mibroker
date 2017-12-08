var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// const sequelize = require('./common/dbconnection'); // Database
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

const Models = require('./models/');

Models.sequelize.sync()
  .then(() => {
    console.log('LOG::DB Database models are sync.');
  })
  .catch(() => {
    console.log('LOG::DB Database models sync failed.');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

/**
 * Application level static variables
 */
app.locals.__sitename = 'MiBSite.com';
app.locals.__title = 'MiB Express-Tachyons';
app.locals.__description = 'A boilerplate for a simple web application with a \
  Node.JS and Express backend, with an Pug template with using Tachyons.';
app.locals.__authorName = 'Mestry Milin';
app.locals.__authorEmail = 'milinmestry@gmail.com';

module.exports = app;
