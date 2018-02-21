const menulinkData = require('../db/data/menulinkRepository');
const models = require('../models'); // All models
const UserModel = models.user; // User model

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
  // console.log('#12 pass=' + req.body.password);
  // console.log('#13 Rpass=' + req.body.password_repeat);

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
    passcode: req.body.password,// encrypt it
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
            res.render('/register', { title: 'MiB Hire A Broker', menuLinks: listMenus,
              activeMenu: '/register', csrfToken: req.csrfToken(),
              errors: error.array(), registerData: registerUser, });
          });

        return;
      } else {
        console.log(registerUser);
        // const userInstance = UserModel.build(registerUser);
        const userInstance = UserModel.build(registerUser);
        userInstance.activation_key = 'randommstrignrequired';
        userInstance.user_status = 'registered';
        
        userInstance.save()
          .then(function(newUser, created) {
            if (newUser) {
              // Redirect to new thank you page.
              res.redirect('/users/thank-you');
            } else {
              res.redirect('/register');
            }
          }).catch(error => {
            console.error(error);
          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};


// Render the login page and flash any message if exists
exports.login = function (req, res, next) {
  res.render('user/login', { message: req.flash('loginMessage') });
  // res.render('buy-domains', { title: 'Please login', activeMenu: 'login', });
};

exports.logout = function (req, res, next) {
  req.logout();
  res.redirect('/');
  // res.render('buy-domains', { title: 'logout', activeMenu: 'login', });
};

// Render the dashboard page and flash any message if exists
exports.dashboard = function (req, res, next) {
  res.render('/dashboard', { message: req.flash('dashboardMessage') });
  // res.render('buy-domains', { title: 'Please login', activeMenu: 'login', });
};
