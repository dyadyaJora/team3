var BearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config');

module.exports = function(passport) {

  passport.use(
    new BearerStrategy(function(token, done) {
      if (token == 'test_token') {
        return done(null, { username: 'test', name: 'Test user' });
      }

      return done(null, false);
    })
  );

  passport.use(
    new FacebookStrategy(
      config.passportOptions.facebook,
      function(accessToken, refreshToken, profile, done) {
        done(null, {
          token: 'test_token'
        });
      }
    )
  );

};