if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');

var app = express();

var config = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodbUri);
require('./models/user');
require('./models/status');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/build', express.static(path.join(__dirname, 'build')));

app.use(passport.initialize());

var initPassport = require('./passport');
initPassport(passport);

app.use('/', require('./routes/index'));
app.use('/api/auth', require('./routes/auth')(passport));
app.use('/api/user', require('./routes/user')(passport));
app.use('/api/users', require('./routes/users')(passport));
app.use('/api/statuses', require('./routes/statuses')(passport));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
