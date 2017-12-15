const express = require('express');
const csrf = require('csurf'); // web secure
const bodyParser = require('body-parser');

// setup route middlewares
const csrfProtection = csrf({ cookie: true });
const parseForm = bodyParser.urlencoded({ extended: false });

const router = express.Router();

// Require controller modules
const contactUsController = require('../controllers/contactUsController');

router.get('/', csrfProtection, contactUsController.contact_us);
router.get('/thank-you', contactUsController.thank_you);
router.post('/save', parseForm, csrfProtection, contactUsController.save);

module.exports = router;
