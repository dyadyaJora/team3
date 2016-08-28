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

  req.user.follow(req._user, function(err) {
    if (err) { return next(err); }

    res.status(204);
    res.end();
  });
});

router.delete('/', function(req, res, next) {
  req.user.unFollow(req._user, function(err) {
    if (err) { return next(err); }

    res.status(204);
    res.end();
  });
});

module.exports = router;
