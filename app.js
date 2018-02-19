var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const helmet = require('helmet'); // web secure
const session = require('express-session'); // web secure
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');
// Middlewares
// const middlewareUser = require('./middlewares/user.js');

// const sequelize = require('./common/dbconnection'); // Database
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const contactUsRouter = require('./routes/contact-us');

// Express app
var app = express();

app.use(helmet({
  frameguard: { action: 'deny' }, // For iframe
}));

// https://nodewebapps.com/2017/01/03/13-security-best-practices-for-your-web-application/
app.use(session({
  secret: '@OmbhurBhavas$waha#tatsav!turvarenyam!',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true,  secure: true },
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for showing messages stored in session
// app.use(middlewareUser); // User authenticate middleware

const Models = require('./models/'); // All models

Models.sequelize.sync()
  .then(() => {
    console.log('LOG::DB Database models are sync.');
  })
  .catch(() => {
    console.error('LOG::DB Database models sync failed.');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // we need this because "cookie" is true in csrfProtection
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contact-us', contactUsRouter);

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
