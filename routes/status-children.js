var express = require('express');
var mongoose = require('mongoose');

var Status = mongoose.model('Status');
var router = express.Router();

var statusFields = '_id text owner location createdAt updatedAt';
var userFields = '_id username name avatar';

router.get('/', function(req, res, next) {
  Status.find({ parent: req._status._id })
    .populate({ path: 'owner', select: userFields })
    .select(statusFields)
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