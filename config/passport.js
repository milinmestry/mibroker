const bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  // console.error(passport);
  // console.error('passport user= ' + user);
  // https://github.com/jaredhanson/passport-local

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
      function(email, password, done) {
// console.log('#33 ' + email);
// console.log('#34 ' + password);

        const isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
// console.log('#42 ' + isValidPassword);
        // const generateHash = function(password) {
        //   return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        // };

        User.findOne({
            where: { email: email }
          })
          .then(function(err, user) {
            if (err) { return done(err); }
            // check email
            if (!user) {
              return done(null, false, {
                message: "Email or password does not exists."
              });
            }

            // check password
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Username/Password does not exists."
              });
            }

            return done(null, user);
          })
          .catch(function(err) {
            console.error('Catch :', err);
          // return done(err);
          });
      }
    )
  );
};