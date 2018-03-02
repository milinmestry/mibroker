// const passport = require("passport");

module.exports = isLoggedIn;

/**
 * Check user is logged in
 * 
 * req.session.passport.user
 *
 * @param {function} req
 * @param {function} res
 * @param {function} next
 */
function isLoggedIn(req, res, next) {
  console.log('req.isAuthenticated() =>>>>>>>> ' + req.isAuthenticated());
  // https://stackoverflow.com/questions/17756848/only-allow-passportjs-authenticated-users-to-visit-protected-page
  // if the user is authenticated in the session, continue
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect to the home page
  res.redirect('/');
}