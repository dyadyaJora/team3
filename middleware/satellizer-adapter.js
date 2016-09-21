module.exports = function() {

  return function(req, res, next) {
    if (!req.query.code) {
      req.query.code = req.body.code;
    }

    next();
  };

};
