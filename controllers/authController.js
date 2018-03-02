const APP_CONST = require("../common/constant-vars");
const menulinkData = require('../db/data/menulinkRepository');
const models = require('../models'); // All models
const UserModel = models.user; // User model
const Chance = require('chance').Chance(); // Utility to get Random data

exports.register = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('user/register', {
        title: 'Register yourself with us', menuLinks: listMenus,
        activeMenu: 'register', csrfToken: req.csrfToken(),
        message: req.flash('signupMessage') });
    });
};


/**
 * Save register/signup form
 *
 * @param {function} req
 * @param {function} res
 * @param {function} next
 */
exports.processRegister = function (req, res, next) {
  // Validate fields
  req.checkBody('first_name', 'First name is required.').notEmpty();
  req.checkBody('first_name', 'First name must be between 2 to 20 characters.')
    .isLength({ min: 2, max: 20 });
  req.checkBody('last_name', 'Last name is required.').notEmpty();
  req.checkBody('last_name', 'Last name must be between 1 to 20 characters.')
  .isLength({ min: 1, max: 20 });
  req.checkBody('email', 'Email address is required.').notEmpty();
  req.checkBody('email', 'Valid Email address is required.').isEmail();
  req.checkBody('password', 'Password is required.').notEmpty();
  req.checkBody('password_repeat', 'Repeat password is required.').notEmpty();
  req.checkBody('password_repeat', 'Repeat password do not match.').equals(req.body.password);
  req.checkBody('address', 'Address is required.').notEmpty();
  req.checkBody('zipcode', 'Provide valid zipcode.').isPostalCode('any');

  let registerUser = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    passcode: req.body.password,// encrypted in model before save
    contact_number: req.body.contact_number,
    address: req.body.address,
    zipcode: req.body.zipcode,
    country: req.body.country,
    source_to_us: req.body.source_to_us,
  };

  req.getValidationResult()
    .then(function (error) {
      // If errors display the form again, passing previously entered values and errors.
      if (!error.isEmpty()) {
        menulinkData.getTopMenus()
          .then(function (listMenus) {
            res.render('user/register', { title: 'MiB Hire A Broker', menuLinks: listMenus,
              activeMenu: '/register', csrfToken: req.csrfToken(),
              errors: error.array(), registerData: registerUser, });
          });

        return;
      } else {
        // const userInstance = UserModel.build(registerUser);
        registerUser.activation_key = Chance.iban()+Chance.hammertime();
        registerUser.user_status = APP_CONST.USER_STATUS.REGISTERED;
        // To match with mysql unixtimestamp format, milliseconds are removed from JS Date object
        // @ts-check Make a global function/method
        registerUser.registered_on = Math.floor(new Date() / 1000);
        registerUser.added_by = APP_CONST.SITE_INFO.USERNAME; // added by system

        UserModel.create(registerUser)
          .then(function(newUser, created) {
            if (newUser) {
              // Redirect to new thank you page.
              res.redirect('/user/thank-you');
            } else {
              res.redirect('/register');
            }
          }).catch(models.Sequelize.ValidationError, function (msg) {
            console.error(msg);
            res.render('user/register', { title: 'MiB Hire A Broker',
              // menuLinks: listMenus,
              activeMenu: '/register', csrfToken: req.csrfToken(),
              errors: [{msg: 'Something went wrong!'}], registerData: registerUser, });
            // return res.status(422).send(msg);
          }).catch(error => {
            console.error(error);
            // return res.status(422).send(error);
          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};


// Render the login page and flash any message if exists
exports.login = function (req, res, next) {
  res.render('user/login', {
    csrfToken: req.csrfToken(),
    message: req.flash('loginMessage'), // from passport JS validation
    user: null,
  });
};

// Render the login page and flash any message if exists
exports.loginUsername = function (req, res, next) {
  UserModel.verifyLoginUsername(req.body.username,
    () => {})
    .then(userData => {
      res.render('user/login', {
        csrfToken: req.csrfToken(),
        message: (!userData) ? 'Invalid Username' : '',
        'user': userData,
      });
    });
};

exports.logout = function (req, res, next) {
  req.logout();
  res.redirect('/');
  // res.render('buy-domains', { title: 'logout', activeMenu: 'login', });
};