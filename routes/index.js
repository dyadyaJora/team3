var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var config = require('../config');

var options = config.passportOptions;
var configJson = JSON.stringify({
  facebook: { clientID: options.facebook.clientID },
  vkontakte: { clientID: options.vkontakte.clientID }
});

router.get('/', function(req, res, next) {
  fs.readFile(path.resolve('index.html'), 'utf-8', function(err, str) {
    if (err) { return next(err); }

    res.end(str.replace('/%config%/', configJson));
  });
});

module.exports = router;
