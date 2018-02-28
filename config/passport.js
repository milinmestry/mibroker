const bCrypt = require("bcrypt-nodejs");

// https://github.com/jaredhanson/passport-local
module.exports = function(passport, user) {

  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  // Serialize user data for session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // De-serialize user data for session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      if (user) {
        done(null, user);
      } else {
        done(err);
      }
    });
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
          // console.log('bCrypt dbp=' + userpass);
          // console.log('bCrypt urp=' + password);
          // console.log('bCrypt res=' + bCrypt.compareSync(password, userpass));

          return bCrypt.compareSync(password, userpass);
        };

        User.findByEmail(email, (err, user) => {
          if (err) { return done(err); }

          // No user exists
          if (!user) {
            return done(null, false, {
              message: "Username/Password does not exists."
            });
          }

          // check password
          if (!isValidPassword(user.passcode, password)) {
            // console.log('dbpass=' + user.passcode);
            // console.log('userpass=' + password);

            return done(null, false, {
              message: "Username/Password does not matched."
            });
          }

          // Success
          return done(null, user);
        })
          // .then(function(err, user) {
          //   if (err) { return done(err); }
          //   // check email
          //   if (!user) {
          //     return done(null, false, {
          //       message: "Email or password does not exists."
          //     });
          //   }

          //   // check password
          //   if (!isValidPassword(user.password, password)) {
          //     return done(null, false, {
          //       message: "Username/Password does not exists."
          //     });
          //   }

          //   return done(null, user);
          // })
          // .catch(function(err) {
          //   console.error('Catch :', err);
          // // return done(err);
          // });
      }
    )
  );
};