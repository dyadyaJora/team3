var express = require('express');
var mongoose = require('mongoose');
var multer = require('multer');
var fileStorage = require('../lib/file-storage');

var router = express.Router();
var User = mongoose.model('User');
var upload = multer({ storage: fileStorage('uploads/avatar/') });

module.exports = function(passport) {

  router.use(passport.authenticate('bearer', { session: false }));

  router.get('/', function(req, res) {
    res.json(req.user.toObject({ virtuals: true }));
  });

  router.patch('/',
    upload.single('avatar'),
    function(req, res, next) {
      if (req.file) {
        req.user.avatar = req.file.filename;
      }

      req.user.patch(req.body, function(err, user) {
        if (err) {
          if (err.name == 'ValidationError') {
            err.status = 422;
          }
          return next(err);
        }

        res.json(user);
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
