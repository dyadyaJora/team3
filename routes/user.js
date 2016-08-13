var express = require('express');
var router = express.Router();

module.exports = function(passport) {

  router.get('/',
    passport.authenticate('bearer', { session: false }),
    function(req, res) {
      res.json(req.user);
    }
  );

  return router;

};