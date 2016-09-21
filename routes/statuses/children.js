var express = require('express');
var mongoose = require('mongoose');

var Status = mongoose.model('Status');
var router = express.Router();

router.get('/', function(req, res, next) {

  Status.pagination(req, { parent: req._status._id }, function(err, result) {
    if (err) { return next(err); }

    res.json(result);
  });

});

module.exports = router;