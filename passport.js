var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');

module.exports = function(passport) {

  passport.use(
    new FacebookStrategy(
      config.passportOptions.facebook,
      function(accessToken, refreshToken, profile, done) {
        done(null, false);
      }
    )
  );

};