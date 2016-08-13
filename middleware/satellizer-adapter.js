module.exports = function() {

  return function(req, res, next) {
    req.query.code = req.body.code;
    next();
  }

};