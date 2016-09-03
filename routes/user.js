var config = require('../config');
var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var fileStorage = require('../lib/file-storage');
var cropPicture = require('../lib/picture-utils').cropPicture;

var router = express.Router();
var User = mongoose.model('User');
var upload = multer({ storage: fileStorage('uploads/avatar/') });

module.exports = function(passport) {

  router.use(passport.authenticate('bearer', { session: false }));

  router.get('/', function(req, res) {
    res.json(req.user.toObject());
  });

  router.patch('/',
    upload.single('avatar'),
    function(req, res, next) {
      cropPicture(req.file, 'uploads/avatar/', config.cropParams.userAvatar.slice())
        // TODO handle errors
        .catch(function() {
          return null;
        })
        .then(function(file) {
          if (file) {
            req.user.avatar = file.filename;
          }

          return req.user.patch(req.body);
        })
        .then(function(user) {
          res.json(user.toObject());
        })
        .catch(function(err) {
          if (err.name == 'ValidationError' || err.code == 11000) {
            err.status = 422;
          }
          return next(err);
        });
    });

  router.delete('/', function(req, res, next) {
    req.user.remove(function(err) {
      if (err) { return next(err); }

      res.status(204);
      res.end();
    });
  });

  return router;

};
