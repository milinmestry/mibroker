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

module.exports = router;
