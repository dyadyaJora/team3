var express = require('express');
var multer = require('multer');

var cropPicture = require('../../lib/picture-utils').cropPicture;
var fileStorage = require('../../lib/file-storage');
var config = require('../../config');

var router = express.Router();
var upload = multer({ storage: fileStorage('uploads/status/') });

router.post('/',
  upload.single('file'),
  function(req, res, next) {
    cropPicture(req.file, 'uploads/status/', config.cropParams.statusImage.slice())
      .then(function(file) {
        if (!file) {
          throw new Error('Ошибка загрузки изображения');
        }

        req._status.image = file.filename;
        return req._status.save();
      })
      .then(function(status) {
        res.json(status.toObject());
      })
      .catch(function(err) {
        err.status = 422;
        next(err);
      });
  });

module.exports = router;
