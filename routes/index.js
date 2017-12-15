var express = require('express');
var router = express.Router();

// Require controller modules
var indexController = require('../controllers/indexController');

/* GET home page.
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

router.get('/', indexController.home);
router.get('/buy-domains', indexController.buy_domains);
router.get('/sell-domains', indexController.sell_domains);
router.get('/about-us', indexController.about_us);

module.exports = router;
