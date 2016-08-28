var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config');

var router = express.Router();
var Status = mongoose.model('Status');

router.get('/', function(req, res, next) {
  Status.find({ owner: req._user._id })
    .select(config.showFields.status)
    .populate({ path: 'owner', select: config.showFields.user })
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
