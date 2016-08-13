var express = require('express');
var satellizerAdapter = require('../middleware/satellizer-adapter');
var router = express.Router();

module.exports = function(passport) {

  router.post('/facebook',
    satellizerAdapter(),
    passport.authenticate('facebook', { session: false }),
    function(req, res) {
      console.log(req.query);
      res.json(req.user);
    });

  return router;

};