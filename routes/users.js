const express = require('express');
// const csrf = require('csurf'); // web secure
const bodyParser = require('body-parser');
const isLoggedIn = require('../middlewares/user');

// setup route middlewares
// const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

const router = express.Router();

// Require controller modules
const userController = require('../controllers/userController');

// router.get('/', userController.index);
// router.post('/save', parseForm, csrfProtection, userController.save);

// User profile route
router.get('/dashboard', isLoggedIn, userController.dashboard);
router.get('/profile', isLoggedIn, userController.profile);
router.get('/activate/:activationKey', userController.activate);
router.get('/thank-you', userController.thankyou);

module.exports = router;
