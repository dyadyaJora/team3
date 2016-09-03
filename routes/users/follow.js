var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var User = mongoose.model('User');

router.post('/', function(req, res, next) {
  if (req.user._id.equals(req._user._id)) {
    var err = new Error('Невозможно подписаться на данного пользователя.');
    err.status = 403;
    return next(err);
  }

  req.user.follow(req._user)
    .then(function() {
      return updateCounters(req.user, req._user);
    })
    .then(function() {
      res.status(204);
      res.end();
    })
    .catch(function(err) {
      next(err);
    });
});

router.delete('/', function(req, res, next) {
  req.user.unFollow(req._user)
    .then(function() {
      return updateCounters(req.user, req._user);
    })
    .then(function() {
      res.status(204);
      res.end();
    })
    .catch(function(err) {
      next(err);
    });
});

module.exports = router;

function updateCounters(me, another) {
  return User.find({ following: another._id }).count()
    .then(function(count) {
      another.followersCount = count;
      return another.save();
    })
    .then(function() {
      return User.findOne({ _id: me._id })
        .then(function(user) {
          user.followingCount = user.following.length;
          return user.save();
        });
    });
}
