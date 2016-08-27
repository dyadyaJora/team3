var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Status = mongoose.model('Status');

var statusFields = '_id text location owner createdAt updatedAt';
var userFields = '_id username name avatar';

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
        .select(statusFields)
        .populate({ path: 'owner', select: userFields })
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
