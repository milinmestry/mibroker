const express = require('express');
// const csrf = require('csurf'); // web secure
const bodyParser = require('body-parser');
// const middlewareUser = require('../middlewares/user.js');

// setup route middlewares
// const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });
// const isLoggedIn = middlewareUser();

const router = express.Router();

// Require controller modules
const indexController = require('../controllers/indexController');
// const userController = require('../controllers/userController');

/* GET home page.
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', indexController.home);
router.get('/buy-furnitures', indexController.buy_domains);
router.get('/sell-furnitures', indexController.sell_domains);
router.get('/about-us', indexController.about_us);

// router.get('/register', csrfProtection, userController.register);
// router.get('/login', userController.login);
// router.get('/logout', userController.logout);

module.exports = router;
