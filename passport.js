var BearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var mongoose = require('mongoose');
var User = mongoose.model('User');

var config = require('./config');

module.exports = function(passport) {

  passport.use(
    new BearerStrategy(function(token, done) {
      User.findOne({ token: token }, function(err, user) {
        if (err) { return done(err); }

        if (!user) { return done(null, false); }

        done(null, user);
      });
    })
  );

  passport.use(
    new FacebookStrategy(
      config.passportOptions.facebook,
      function(accessToken, refreshToken, profile, done) {
        var id = parseInt(profile.id, 10);

        User.findOne({ fbId: id }, function(err, user) {
          if (err) { return done(err); }

          if (user) { return done(null, user); }

          user = new User({
            username: 'fb' + id,
            name: prepareName(profile.displayName),
            fbId: id
          });

          user.save(function(err, user) {
            if (err) { return done(err); }

            done(null, user);
          });
        });
      }
    )
  );

};

function prepareName(name) {
  return name.replace(/\s+/, ' ')
    .substring(0, 20);
}
