var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = mongoose.model('User');

router.get('/', function(req, res) {
  res.json(req.user);
});

router.patch('/', function(req, res, next) {
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

module.exports = router;
