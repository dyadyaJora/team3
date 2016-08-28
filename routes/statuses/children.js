var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config');

var Status = mongoose.model('Status');
var router = express.Router();

router.get('/', function(req, res, next) {
  Status.find({ parent: req._status._id })
    .populate({ path: 'owner', select: config.showFields.user })
    .select(config.showFields.status)
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