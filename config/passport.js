const bCrypt = require("bcrypt-nodejs");

// https://github.com/jaredhanson/passport-local
module.exports = function(passport, user) {

  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  // Serialize user data for session
  passport.serializeUser(function(user, done) {
    userData = { id: user.id, fname: user.first_name, 
      lname: user.last_name, email: user.email
    };
    done(null, userData);
  });

  // De-serialize user data for session
  passport.deserializeUser(function(userData, done) {
    done(null, userData);
    // User.findById(id, function(err, user) {
    //   if (user) {
    //     done(null, user);
    //   } else {
    //     done(err);
    //   }
    // });
  });

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        const isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        User.findByEmail(email, (err, user) => {
          if (err) { return done(err); }

          // No user exists
          if (!user) {
            return done(null, false,
              req.flash('loginMessage', 'Username/Password does not exists.')
            );
          }

          // check password
          if (!isValidPassword(user.passcode, password)) {
            return done(null, false,
              req.flash('loginMessage', 'Username/Password does not matched.')
            );
          }

          // Success
          return done(null, user);
        });
      }
    )
  );
};