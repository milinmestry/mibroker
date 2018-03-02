const menulinkData = require('../db/data/menulinkRepository');
const models = require('../models'); // All models
const UserModel = models.user; // User model
const async = require('async');

// Render the user profile page and flash any message if exists
exports.profile = function (req, res, next) {
  // res.render('user/profile', { message: req.flash('profileMessage'),
  //   user: req.user, // Get the user from the session
  // });
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      // console.log('=>>>>>>>>>>>>'+JSON.stringify(req.user));
      
      res.render('user/profile', {
        title: 'Thank you for registering with us.',
        menuLinks: listMenus,
        activeMenu: '',
        message: req.flash('profileMessage'),
        user: req.user, // Get the user from the session
      });
    });
};

// Render the user profile page and flash any message if exists
exports.thankyou = function (req, res, next) {
  // res.render('user/thank-you', { message: req.flash('profileMessage')});
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('user/thank-you', {
        title: 'Thank you for registering with us.',
        menuLinks: listMenus,
        activeMenu: '',
        message: req.flash('thankYouMessage'),
      });
    });
};

// Render the user activation page and flash any message if exists
exports.activate = function (req, res, next) {
  async.parallel({
    user: function(callback) {
      UserModel.verifyActivationKey(req.params.activationKey,
        () => {})
        .then(userData => {
          // Activate User Account
          if (userData) {
            userData.activateAccount();
          }
          callback(null, userData);
        });
    },
    listMenus: function(callback) {
      menulinkData.getTopMenus()
        .then(menus => {
          callback(null, menus);
        });
    },
  }, (err, results) => {
    if (err) {
      return next(err);
    }

    res.render('user/activate', { title: 'MiB About MiB',
      menuLinks: results.listMenus,
      activeMenu: '',
      user: results.user,
      userFullName: (results.user) ? results.user.fullName() : '',
      message: req.flash('thankYouMessage'),
    });
  });
};

// Render the dashboard page and flash any message if exists
exports.dashboard = function (req, res, next) {
  res.render('user/dashboard', { message: req.flash('dashboardMessage') });
  // res.render('buy-domains', { title: 'Please login', activeMenu: 'login', });
};
