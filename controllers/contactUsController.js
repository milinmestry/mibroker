const menulinkData = require('../db/data/menulinkRepository');
// const categoryData = require('../db/data/categoryRepository');

// Contact Us
exports.contact_us = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('contact-us/index', { title: 'MiB Hire A Broker', menuLinks: listMenus,
        activeMenu: 'contact-us', csrfToken: req.csrfToken(), });
    });
};

exports.save = function (req, res, next) {
  // Validate fields
  req.checkBody('first_name', 'First name is required.').notEmpty();
  req.checkBody('last_name', 'Last name is required.').notEmpty();
  req.checkBody('email', 'Email address is required.').notEmpty();
  req.checkBody('email', 'Valid Email address is required.').isEmail();
  req.checkBody('subject', 'Subject name is required.').notEmpty();
  req.checkBody('message', 'Message name is required.').notEmpty();
  req.checkBody('contact_number', 'contact_number max 4 is required.').isLength({max:4});

  // Run the validator
  const errors = req.validationErrors();
  // Get the validation result whenever you want; see the Validation Result API for all options!
  // const errors = req.getValidationResult();
console.log(errors);
  // If errors display the form again, passing previously entered values and errors.
  if (errors) {
    // res.render('contact-us/index', { title: 'MiB Hire A Broker', menuLinks: listMenus,
    //   activeMenu: 'contact-us', csrfToken: req.csrfToken(), errors: errors, });
    menulinkData.getTopMenus()
      .then(function (listMenus) {
        res.render('contact-us/index', { title: 'MiB Hire A Broker', menuLinks: listMenus,
          activeMenu: 'contact-us', csrfToken: req.csrfToken(), errors: errors, });
      });

    return;
  } else {
    res.redirect('thank-you');
  }

};

exports.thank_you = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('contact-us/thank-you', { title: 'MiB Hire A Broker', menuLinks: listMenus,
        activeMenu: 'contact-us', });
    });
};
