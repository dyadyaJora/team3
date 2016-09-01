var express = require('express');
var mongoose = require('mongoose');
var config = require('../config');

var router = express.Router();
var Status = mongoose.model('Status');

module.exports = function(passport) {

  router.get('/',
    passport.authenticate('bearer', { session: false }),
    function(req, res, next) {

      Status.pagination(req, {
        $or: [
          { owner: req.user._id },
          { owner: { $in: req.user.following } }
        ]
      }, function(err, result) {
        if (err) { return next(err); }

        res.json(result);
      });

    });

  return router;

};
