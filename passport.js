var Promise = require('bluebird');
var BearerStrategy = require('passport-http-bearer').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var VKontakteStrategy = require('passport-vkontakte').Strategy;

var downloadPicture = require('./lib/picture-utils').downloadPicture;
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

          downloadAvatar(profile.photos)
            .then(function(file) {
              user = new User({
                username: 'fb' + profile.id,
                name: prepareName(profile.displayName),
                fbId: profile.id
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

  passport.use(
    new VKontakteStrategy(
      config.passportOptions.vkontakte,
      function(accessToken, refreshToken, profile, done) {
        User.findOne({ vkId: profile.id }, function(err, user) {
          if (err) { return done(err); }

          if (user) { return done(null, user); }

          // TODO image quality
          downloadAvatar(profile.photos)
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

function downloadAvatar(photos) {
  if (!photos || !Array.isArray(photos) || photos.length === 0) {
    return Promise.resolve();
  }

  return downloadPicture(photos[0].value, 'uploads/avatar/')
    .then(function(file) {
      return cropPicture(file, 'uploads/avatar/', config.cropParams.userAvatar.slice());
    }).catch(function() {
      return null;
    });
}

function prepareName(name) {
  return name.replace(/\s+/, ' ')
    .substring(0, 20);
}
