var express = require('express');
var mongoose = require('mongoose');
var config = require('../config');

var router = express.Router();
var Status = mongoose.model('Status');

module.exports = function(passport) {

  router.get('/',
    passport.authenticate('bearer', { session: false }),
    function(req, res, next) {

      Status
        .find({
          $or: [
            { owner: req.user._id },
            { owner: { $in: req.user.following } }
          ]
        })
        .select(config.showFields.status)
        .populate({ path: 'owner', select: config.showFields.user })
        .sort('-createdAt')
        .paginate(req.query)
        .exec(function(err, statuses) {
          if (err) { return next(err); }

          res.json(statuses.map(function(status) {
            return status.toObject();
          }));
        });

    });

  return router;

};
