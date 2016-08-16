var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = mongoose.model('User');

module.exports = function(passport) {

  router.get('/', function(req, res, next) {
    User.find({})
      .select('_id username name')
      .exec(function(err, users) {
        if (err) { return next(err); }

        res.json(users);
      });
  });

  router.get('/:username', function(req, res, next) {
    User.findOne({ username: req.params.username })
      .select('_id username name')
      .exec(function(err, user) {
        if (err) { return next(err); }

        if (!user) return next();

        res.json(user);
      });
  });

  return router;
};
