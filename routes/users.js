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

  router.post('/:username/follow',
    passport.authenticate('bearer', { session: false }),
    findUser('_id'),
    function(req, res, next) {
      console.log(req.user._id, req._user._id, req.user._id.equals(req._user._id));
      if (req.user._id.equals(req._user._id)) {
        var err = new Error('Невозможно подписаться на данного пользователя.');
        err.status = 403;
        return next(err);
      }

      req.user.follow(req._user, function(err) {
        if (err) { return next(err); }

        res.status(204);
        res.end();
      });

    });

  router.delete('/:username/follow',
    passport.authenticate('bearer', { session: false }),
    findUser('_id'),
    function(req, res, next) {
      req.user.unFollow(req._user, function(err) {
        if (err) { return next(err); }

        res.status(204);
        res.end();
      });

    });

  router.use('/:username/statuses',
    findUser('_id'), require('./user-statuses'));

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
