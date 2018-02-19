const express = require('express');
const csrf = require('csurf'); // web secure
const bodyParser = require('body-parser');

// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

const router = express.Router();

// Require controller modules
const userController = require('../controllers/userController');

// router.get('/', userController.index);
router.post('/save', parseForm, csrfProtection, userController.save);

// User profile route
router.get('/profile', userController.profile);

// function isLoggedIn(req, res, next) {
//   // if the user is authenticated in the session, continue
//   if (req.isAuthenticated()) {
//     return next();
//   }

//   // if they aren't redirect to the home page
//   res.redirect('/');
// }

module.exports = router;
