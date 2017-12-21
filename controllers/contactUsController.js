const menulinkData = require('../db/data/menulinkRepository');
// const categoryData = require('../db/data/categoryRepository');

// Contact Us
exports.contact_us = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('contact-us/index', { title: 'MiB Hire A Broker', menuLinks: listMenus,
        activeMenu: '/contact-us', csrfToken: req.csrfToken(), });
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
  req.checkBody('message', 'Message must be between 5 to 1000 characters.')
    .isLength({ min: 5, max: 1000 });

  let contactUs = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    contact_number: req.body.contact_number,
    subject: req.body.subject,
    message: req.body.message,
  };

  // Get the validation result whenever you want; see the Validation Result API for all options!
  // https://stackoverflow.com/questions/43828231/issues-with-error-messages-while-validating-the-form-field-in-express-js
  req.getValidationResult()
    .then(function (error) {
      // If errors display the form again, passing previously entered values and errors.
      if (!error.isEmpty()) {
        menulinkData.getTopMenus()
          .then(function (listMenus) {
            res.render('contact-us/index', { title: 'MiB Hire A Broker', menuLinks: listMenus,
              activeMenu: '/contact-us', csrfToken: req.csrfToken(),
              errors: error.array(), contactUsData: contactUs, });
          });

        return;
      } else {
        // Redirect to new thank_you page.
        res.redirect('thank-you');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

exports.thank_you = function (req, res, next) {
  menulinkData.getTopMenus()
    .then(function (listMenus) {
      res.render('contact-us/thank-you', { title: 'MiB Hire A Broker', menuLinks: listMenus,
        activeMenu: 'contact-us', });
    });
};
