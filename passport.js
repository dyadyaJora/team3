var BearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var VKontakteStrategy = require('passport-vkontakte').Strategy;

var downloadAvatar = require('./lib/picture-utils').downloadUserAvatar;
var cropPicture = require('./lib/picture-utils').cropPicture;

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
        User.findOne({ fbId: profile.id }, function(err, user) {
          if (err) { return done(err); }

          if (user) { return done(null, user); }

          user = new User({
            username: 'fb' + profile.id,
            name: prepareName(profile.displayName),
            fbId: profile.id
          });

          user.save(function(err, user) {
            if (err) { return done(err); }

            done(null, user, { isNew: true });
          });
        });
      }
    )
  );

  passport.use(
    new VKontakteStrategy(
      config.passportOptions.vkontakte,
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ vkId: profile.id }, function(err, user) {
          if (err) { return done(err); }

          if (user) { return done(null, user); }


          downloadAvatar(profile.photos)
            .then(function(file) {
              return cropPicture(file, 'uploads/avatar/', config.cropParams.userAvatar);
            })
            .then(function(file) {
              user = new User({
                username: 'vk' + profile.id,
                name: prepareName(profile.displayName),
                vkId: profile.id
              });

              if (file) {
                user.avatar = file.filename;
              }

              return user.save();
            })
            .then(function(user) {
              done(null, user, { isNew: true });
            })
            .catch(function(err) {
              done(err);
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
