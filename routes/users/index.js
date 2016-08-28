var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config');

var router = express.Router();
var User = mongoose.model('User');

var showFields = config.showFields.user;

module.exports = function(passport) {

  router.get('/', function(req, res, next) {
    User.find({})
      .select(showFields)
      .paginate(req.query)
      .exec(function(err, users) {
        if (err) { return next(err); }

        res.json(users.map(function(user) {
          return user.toObject();
        }));
      });
  });

  router.get('/:username',
    findUser(showFields + ' description'),
    function(req, res) {
      res.json(req._user.toObject());
    });

  router.use('/:username/following', findUser('following'), require('./following'));

  router.use('/:username/followers', findUser('_id'), require('./followers'));

  router.use('/:username/follow',
    passport.authenticate('bearer', { session: false }),
    findUser('_id'), require('./follow'));

  router.use('/:username/statuses', findUser('_id'), require('./statuses'));

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
