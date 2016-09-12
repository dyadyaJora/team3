var express = require('express');
var mongoose = require('mongoose');
var debounce = require('lodash.debounce');
var multer = require('multer');
var config = require('../../config');

var router = express.Router();
var Status = mongoose.model('Status');
var User = mongoose.model('User');

var statusFields = config.showFields.status;
var userFields = config.showFields.user;

var permitParams = ['text', 'location', 'parent'];

var userIds = [];
var sendMsg;

module.exports = function(passport, io) {

  router.get('/', function(req, res, next) {
    Status.pagination(req, {}, function(err, result) {
      if (err) { return next(err); }

      res.json(result);
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

      status.save()
        .then(function(status) {
          return status.populate('parent', statusFields)
            .execPopulate();
        })
        .then(function(status) {
          return updateCount(status, req.user);
        })
        .then(function(status) {
          userIds.push(req.user._id);
          sendMsg(io);

          res.status(201);

          status.owner = req.user;
          res.json(status.toObject());
        })
        .catch(function(err) {
          next(err);
        });
    });

  router.get('/:id',
    findStatus(statusFields + ' parent', true),
    function(req, res) {
      Status.find({ parent: req._status._id })
        .populate({ path: 'owner', select: userFields })
        .select(statusFields)
        .sort('-createdAt')
        .exec(function(err, statuses) {
          if (err) { return next(err); }

          var status = req._status.toObject();

          status.children = statuses.map(function(status) {
            return status.toObject();
          });

          res.json(status);
        });
    });

  router.patch('/:id',
    passport.authenticate('bearer', { session: false }),
    findStatus(null, true), checkOwner,
    function(req, res, next) {
      req._status.patch(req.body, function(err, status) {
        if (err) { return next(err); }

        res.json(status.toObject());
      });
    });

  router.delete('/:id',
    passport.authenticate('bearer', { session: false }),
    findStatus('_id, owner'), checkOwner,
    function(req, res, next) {
      req._status.remove()
        .then(function() {
          return updateCount(null, req.user);
        })
        .then(function() {
          res.status(204);
          res.end();
        })
        .catch(function(err) {
          next(err);
        });
    }
  );

  router.use('/:id/image',
    passport.authenticate('bearer', { session: false }),
    findStatus(null, true), checkOwner, require('./image'));

  router.use('/:id/children', findStatus('_id, owner'), require('./children'));

  return router;

};

function findStatus(fields, populateParent) {

  return function(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      var err = new Error('Неверный id пепа.');
      err.status = 404;
      return next(err);
    }

    var query = Status.findOne({ _id: req.params.id })
      .populate({ path: 'owner', select: userFields });

    if (populateParent) {
      query = query.populate({ path: 'parent', select: statusFields });
    }

    query.select(fields).exec()
      .then(function(status) {
        if (!status) {
          var error = new Error('Пеп не найден.');
          error.status = 404;
          throw error;
        }

        if (populateParent && status.parent) {
          return status.parent.populate('owner', userFields).execPopulate()
            .then(function() {
              return status;
            });
        } else {
          return status;
        }
      })
      .then(function(status) {
        req._status = status;
        next();
      })
      .catch(function(err) {
        next(err);
      });
  }

}

function updateCount(status, user) {
  return Status.find({ owner: user._id }).count()
    .then(function(count) {
      user.statusesCount = count;
      return user.save();
    })
    .then(function() {
      return status;
    })
    .catch(function() {
      return status;
    });
}

sendMsg = debounce(function(io) {
  io.sockets.emit('feed', userIds);
  userIds = [];
}, config.socketDebounce);

function checkOwner(req, res, next) {
  if (!req.user._id.equals(req._status.owner._id)) {
    var err = new Error('Пеп принадлежит другому пользователю.');
    err.status = 403;
    return next(err);
  }

  next();
}
