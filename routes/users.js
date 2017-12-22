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

module.exports = router;
