var express = require('express');
var router = express.Router();

module.exports = function(passport) {

  router.get('/facebook',
    passport.authenticate('facebook', { session: false, failureRedirect: '/' }),
    function(req, res) {
      res.json('authorized');
    });

  return router;

};