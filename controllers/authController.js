const menulinkData = require('../db/data/menulinkRepository');

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
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.save = function (req, res, next) {
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
        // Redirect to new thank_you page.
        res.redirect('/login');
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
