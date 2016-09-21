var multer = require('multer');
var crypto = require('crypto');

module.exports = function(dest) {

  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, dest);
    },
    filename: function (req, file, cb) {
      var extension = file.originalname.split('.').pop();
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(err, err ? undefined : raw.toString('hex') + '.' + extension);
      });
    }
  });

};
