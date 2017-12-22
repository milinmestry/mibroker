const express = require('express');
const csrf = require('csurf'); // web secure
const bodyParser = require('body-parser');

// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

const router = express.Router();

// Require controller modules
const indexController = require('../controllers/indexController');
const userController = require('../controllers/userController');

/* GET home page.
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', indexController.home);
router.get('/buy-domains', indexController.buy_domains);
router.get('/sell-domains', indexController.sell_domains);
router.get('/about-us', indexController.about_us);

router.get('/register', csrfProtection, userController.register);
router.get('/login', userController.login);
router.get('/logout', userController.login);

module.exports = router;
