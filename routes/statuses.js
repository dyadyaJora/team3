var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();
var Status = mongoose.model('Status');

var statusFields = '_id text owner location createdAt updatedAt';
var userFields = '_id username name avatar';

var permitParams = ['text', 'location', 'parent'];

module.exports = function(passport) {

  router.get('/', function(req, res, next) {
    Status.find({})
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
        res.json(status.toObject());
      });
    });

  router.get('/:id',
    findStatus(statusFields + ' parent'),
    function(req, res) {
      req._status.populate('parent', function(err, status) {
        res.json(status.toObject());
      });
    });

  router.patch('/:id',
    passport.authenticate('bearer', { session: false }),
    findStatus(), checkOwner,
    function(req, res, next) {
      console.log(req.body);
      req._status.patch(req.body, function(err, status) {
        if (err) { return next(err); }

        res.json(status.toObject());
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
