var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config');

var router = express.Router();
var User = mongoose.model('User');

// TODO pagination
router.get('/', function(req, res, next) {
  req._user.populate('following', config.showFields.user,
    function(err, user) {
      if (err) { return next(err); }

      res.json(user.following.map(function(user) {
        return user.toObject();
      }));
    });
});

module.exports = router;
