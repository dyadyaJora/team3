var express = require('express');
var mongoose = require('mongoose');
var config = require('../../config');

var router = express.Router();
var Status = mongoose.model('Status');

router.get('/', function(req, res, next) {
  Status.pagination(req, { owner: req._user._id }, function(err, result) {
    if (err) { return next(err); }

    res.json(result);
  });
});

module.exports = router;
