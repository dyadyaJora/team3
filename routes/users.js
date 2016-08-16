var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = mongoose.model('User');

var showFields = '_id username name';

module.exports = function(passport) {

  router.get('/', function(req, res, next) {
    User.find({})
      .select(showFields)
      .exec(function(err, users) {
        if (err) { return next(err); }

        res.json(users);
      });
  });

  router.get('/:username',
    findUser(showFields),
    function(req, res) {
      res.json(req._user);
    });

  router.get('/:username/following',
    findUser('following'),
    function(req, res, next) {

      req._user.populate('following', showFields,
        function(err, user) {
          if (err) { return next(err); }

          res.json(user.following);
        });

    });

  router.get('/:username/followers',
    findUser('_id'),
    function(req, res, next) {

      User.find({ following: req._user._id })
        .select(showFields)
        .exec(function(err, users) {
          if (err) { return next(err); }

          res.json(users);
        });

    });

  return router;
};

function findUser(fields) {

  return function(req, res, next) {
    User.findOne({ username: req.params.username })
      .select(fields)
      .exec(function(err, user) {
        if (err) { return next(err); }

        if (!user) {
          var error = new Error('Пользователь не найден');
          error.status = 404;
          return next(error);
        }

        req._user = user;
        next();
      });
  };

}
