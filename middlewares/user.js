// const passport = require("passport");

module.exports = isLoggedIn;

/**
 * Check user is logged in
 * 
 * @param {function} req 
 * @param {function} res 
 * @param {function} next 
 */
function isLoggedIn(req, res, next) {
  console.log(req);
  
  // if the user is authenticated in the session, continue
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't redirect to the home page
  res.redirect('/');
}