var fs = require('fs');
var https = require('https');
var path = require('path');
var crypto = require('crypto');
var Promise = require('bluebird');
var gm = require('gm').subClass({ imageMagick: true })
var config = require('../config');

module.exports = {

  cropPicture: cropPicture,

  downloadPicture: function(url, dest) {
    return generateFileName(url).then(function(fileName) {
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
    });
  }

};

function generateFileName(fullPath) {
  var extension = path.extname(fullPath).split('?')[0].slice(1);

  return new Promise(function(resolve, reject) {
    if (!extension) {
      return reject('Wrong extension');
    }

    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) { return reject(err); }

      resolve(raw.toString('hex') + '.' + extension);
    });
  });
}

function cropPicture(file, uploadPath, cropParams) {
  if (!config.sharpEnabled) {
    return Promise.reject('Sharp disabled');
  }

  if (!file) {
    return Promise.reject('No file');
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
