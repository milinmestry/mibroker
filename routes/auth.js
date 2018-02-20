const authController = require('../controllers/authController');
const csrf = require('csurf'); // web secure

// setup route middlewares
const csrfProtection = csrf({ cookie: true });

module.exports = function(app, passport) {
  app.get('/register', csrfProtection, authController.register);
  app.get('/login', authController.login);
  app.get('/logout', authController.logout);
  app.get('/dashboard', isLoggedIn, authController.dashboard);
  app.post('/register', authController.save);
  app.post('/login', passport.authenticate(
    'local-login', { successRedirect: '/dashboard', failureRedirect: '/login'})
  );

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.redirect('/login');
  }
}