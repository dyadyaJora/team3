var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Status = mongoose.model('Status');

var statusFields = '_id text owner';
var userFields = '_id username name';

var permitParams = ['text'];

module.exports = function(passport) {

  router.get('/', function(req, res, next) {
    Status.find({})
      .populate({ path: 'owner', select: userFields })
      .select(statusFields)
      .exec(function(err, statuses) {
        if (err) { return next(err); }

        res.json(statuses);
      });
  });

  router.post('/',
    passport.authenticate('bearer', { session: false }),
    function(req, res, next) {
      var params = req.body;
      var status = new Status();

      for (var param in params) {
        if (params.hasOwnProperty(param) && permitParams.indexOf(param) != -1) {
          status[param] = params[param];
        }
      }

      status.owner = req.user._id;

      status.save(function(err, status) {
        if (err) { return next(err); }

        res.status(201);
        res.json(status);
      });
    });

  router.get('/:id',
    findStatus(statusFields),
    function(req, res) {
      res.json(req._status);
    });

  router.patch('/:id',
    passport.authenticate('bearer', { session: false }),
    findStatus(), checkOwner,
    function(req, res, next) {
      req._status.patch(req.body, function(err, status) {
        if (err) { return next(err); }

        res.json(status);
      });
    });

  router.delete('/:id',
    passport.authenticate('bearer', { session: false }),
    findStatus('_id, owner'), checkOwner,
    function(req, res, next) {
      req._status.remove(function(err) {
        if (err) { return next(err); }

        res.status(204);
        res.end();
      });
    }
  );

  return router;

};

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

function checkOwner(req, res, next) {
  if (!req.user._id.equals(req._status.owner._id)) {
    var err = new Error('Пеп принадлежит другому пользователю.');
    err.status = 403;
    return next(err);
  }

  next();
}
