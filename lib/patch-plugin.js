module.exports = function(schema, options) {

  if (!Array.isArray(options.permitParams)) {
    options.permitParams = [];
  }

  var isPermitted = function(param) {
    return options.permitParams.indexOf(param) != -1;
  };

  schema.methods.patch = function(params, cb) {

    for (var param in params) {
      if (params.hasOwnProperty(param) && isPermitted(param)) {
        this[param] = params[param];
      }
    }

    return this.save(cb);

  };

};
