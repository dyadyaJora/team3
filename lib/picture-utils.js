var fs = require('fs');
var https = require('https');
var path = require('path');
var Promise = require('bluebird');
var config = require('../config');

module.exports = {

  cropPicture: cropPicture,

  downloadPicture: function(url, dest) {
    // TODO generate fileName
    var fileName = path.basename(url).split('?')[0];
    var file = fs.createWriteStream(dest + fileName);

    return new Promise(function(resolve) {
      // TODO handle errors
      https.get(url, function(response) {
        response.pipe(file);

        file.on('finish', function() {
          file.close();
          resolve({
            filename: fileName,
            path: file.path
          });
        });
      });
    });
  }

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