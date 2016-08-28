var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config');

var router = express.Router();
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
  User.find({ following: req._user._id })
    .select(config.showFields.user)
    .paginate(req.query)
    .exec(function(err, users) {
      if (err) { return next(err); }

      res.json(users.map(function(user) {
        return user.toObject();
      }));
    });
});

module.exports = router;
