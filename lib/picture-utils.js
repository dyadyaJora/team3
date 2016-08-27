var Promise = require('bluebird');
var config = require('../config');

module.exports = {
  cropPicture: cropPicture
};

function cropPicture(file, uploadPath, cropParams) {
  if (!config.sharpEnabled || !file || !Array.isArray(cropParams)) {
    return Promise.resolve();
  }

  if (cropParams.length === 0) {
    return Promise.resolve(file);
  }

  var params = cropParams.shift();

  return require('sharp')(file.path)
    .resize(params.w, params.h)
    .toFile(uploadPath + params.name + '_' + file.filename)
    .then(function() {
      return cropPicture(file, uploadPath, cropParams);
    });
}