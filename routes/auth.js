const authController = require('../controllers/authController');
const csrf = require('csurf'); // web secure

// setup route middlewares
const csrfProtection = csrf({ cookie: true });

module.exports = function(app, passport) {
  app.get('/register', csrfProtection, authController.register);
  app.get('/login', csrfProtection, authController.login);
  app.get('/logout', authController.logout);
  app.get('/dashboard', isLoggedIn, authController.dashboard);
  app.post('/register', csrfProtection, authController.processRegister);
  app.post('/login/username', csrfProtection, authController.loginUsername);
  app.post('/login/password',
    passport.authenticate(
      'local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true}
    ),
    function(req, res, next) {
      res.redirect('/');
    }
  );

  function isLoggedIn(req, res, next) {
    console.log('isAuthenticated=' + req.isAuthenticated());

    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  }
}