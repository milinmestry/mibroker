const menulinkData = require('../db/data/menulinkRepository');
const models = require('../models'); // All models
const UserModel = models.user; // User model
const async = require('async');

// Render the user profile page and flash any message if exists
exports.profile = function (req, res, next) {
  async.parallel({
    user: function(callback) {
      UserModel.findById(req.user.id, callback)
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

    res.render('user/profile', {
      title: 'My profile',
      menuLinks: results.listMenus,
      activeMenu: '',
      message: req.flash('profileMessage'),
      user: results.user, // Get the user from the session
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
  res.render('user/dashboard', {
    message: req.flash('dashboardMessage'),
    title: 'My Dashboard'
  });
  // res.render('buy-domains', { title: 'Please login', activeMenu: 'login', });
};

// Render the dashboard page and flash any message if exists
exports.edit = function (req, res, next) {
  // TODO: Validation to check input is numeric
  // TODO: Incase no record exists in database; redirect to profile page with message.
  async.parallel({
    user: function(callback) {
      UserModel.findById(req.params.userId, callback)
    },
    listMenus: function(callback) {
      menulinkData.getTopMenus()
        .then(menus => {
          callback(null, menus);
        });
    }
  }, (err, results) => {
    if (err) {
      return next(err);
    }
    res.render('user/edit', {
      title: 'My Profile Edit',
      menuLinks: results.listMenus,
      activeMenu: '',
      user: results.user,
    });
  });

};
