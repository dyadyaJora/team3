var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config');

var router = express.Router();
var User = mongoose.model('User');

router.get('/', function(req, res, next) {

  User.paginate({ following: req._user._id }, {
    select: config.showFields.user,
    offset: req.query.skip || 0,
    limit: req.query.count || 5
  }, function(err, result) {
    if (err) {
      return next(err);
    }

    res.json({
      totalCount: result.total,
      users: result.docs.map(function(user) {
        return user.toObject();
      })
    });
  });

});

module.exports = router;
