var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var sharp = require('sharp');
var Promise = require('bluebird');
var fileStorage = require('../lib/file-storage');

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
      createAvatar(req.file)
        .then(function(fileName) {
          if (fileName) {
            req.user.avatar = fileName;
          }

          return req.user.patch(req.body);
        })
        .then(function(user) {
          res.json(user.toObject());
        })
        .catch(function(err) {
          if (err.name == 'ValidationError') {
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

function createAvatar(file) {
  if (file) {
    return sharp(file.path)
      .resize(175, 175)
      .toFile('uploads/avatar/175_' + file.filename)
      .then(function() {
        return sharp('uploads/avatar/175_' + file.filename)
          .resize(50, 50)
          .toFile('uploads/avatar/50_' + file.filename);
      }).then(function() {
        return file.filename;
      });

  } else {
    return Promise.resolve();
  }
}
