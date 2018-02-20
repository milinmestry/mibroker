const bCrypt = require("bcrypt-nodejs");

module.exports = function(passport, user) {
  const User = user;
  const LocalStrategy = require("passport-local").Strategy;

  // Serialize user data for session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // De-serialize user data for session
  passport.deserializeUser(function(id, done) {
    User.findById(id).then(function(user) {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        const User = user;

        const isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        // const generateHash = function(password) {
        //   return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        // };

        User.findOne({
          where: { email: email }
        }).then(function(user) {
          // check email
          if (!user) {
            return done(null, false, {
              message: "Email or password does not exists."
            });
          }

          // check password
          if (!isValidPassword(user.password, password)) {
            return done(null, false, {
              message: "Email or password does not exists."
            });
          }

          return done(null, user.get());
        }).catch(function(err) {
          console.error('Error:', err);
          return done(null, false, { 
            message: 'Something were wrong in login process.'})
        });
      }
    )
  );
};

// else {
//   const userPassword = generateHash(password);

//   let data = {
//     email: email,
//     password: userPassword,
//     firstname: req.body.firstname,
//     lastname: req.body.lastname
//   };

//   User.create(data).then(function(newUser, created) {
//     if (newUser) {
//       return done(null, newUser);
//     }
//     return done(null, false);
//   });
// }