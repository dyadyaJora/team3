var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Status = mongoose.model('Status');

var statusFields = '_id text owner';
var userFields = '_id username name avatar';

router.get('/', function(req, res, next) {
  Status.find({ owner: req._user._id })
    .select(statusFields)
    .populate({ path: 'owner', select: userFields })
    .paginate(req.query)
    .sort('-createdAt')
    .exec(function(err, statuses) {
      if (err) { return next(err); }

      res.json(statuses.map(function(status) {
        return status.toObject();
      }));
    });
});

module.exports = router;
