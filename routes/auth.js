var express = require('express');
var satellizerAdapter = require('../middleware/satellizer-adapter');
var router = express.Router();

module.exports = function(passport) {

  router.get('/facebook', function(req, res) {
    res.end();
  });

  router.post('/facebook',
    satellizerAdapter(),
    passport.authenticate('facebook', { session: false }),
    function(req, res) {
      if (req.authInfo.isNew) {
        res.status(201);
      }
      res.json(req.user);
    });

  router.get('/vkontakte', function(req, res) {
    res.end();
  });

  router.post('/vkontakte',
    satellizerAdapter(),
    passport.authenticate('vkontakte', { session: false }),
    function(req, res) {
      if (req.authInfo.isNew) {
        res.status(201);
      }
      res.json(req.user);
    });

  return router;

};
