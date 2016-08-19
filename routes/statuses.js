var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Status = mongoose.model('Status');

var statusFields = '_id text owner';
var userFields = '_id username name';

router.get('/', function(req, res, next) {

  Status.find({})
    .populate({ path: 'owner', select: userFields })
    .select(statusFields)
    .exec(function(err, statuses) {
      if (err) { return next(err); }

      res.json(statuses);
    });

});

router.get('/:id',
  findStatus(statusFields),
  function(req, res) {
    res.json(req._status);
  });

module.exports = router;

function findStatus(fields) {

  return function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      var err = new Error('Неверный id пепа.');
      err.status = 404;
      return next(err);
    }

    Status.findOne({ _id: req.params.id })
      .populate({ path: 'owner', select: userFields })
      .select(fields)
      .exec(function(err, status) {
        if (err) { return next(err); }

        if (!status) {
          var error = new Error('Пеп не найден.');
          error.status = 404;
          next(error);
        }

        req._status = status;
        next();
      });
  }

}