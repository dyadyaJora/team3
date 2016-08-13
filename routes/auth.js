var express = require('express');
var satellizerAdapter = require('../middleware/satellizer-adapter');
var router = express.Router();

module.exports = function(passport) {

  router.post('/facebook',
    satellizerAdapter(),
    passport.authenticate('facebook', { session: false }),
    function(req, res) {
      res.json(req.user);
    });

  return router;

};