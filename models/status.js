var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var metascraper = require('metascraper');
var config = require('../config');
var patchPlugin = require('../lib/patch-plugin');
var Schema = mongoose.Schema;

var urlPattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;

var statusSchema = new Schema({
  text: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: [Number], index: '2dsphere'},
  parent: { type: Schema.Types.ObjectId, ref: 'Status' },
  image: String,
  link: {
    url: String,
    title: String,
    image: String,
    description: String
  }
}, {
  timestamps: true
});

statusSchema.plugin(patchPlugin, {
  permitParams: ['text', 'location']
});

statusSchema.plugin(mongoosePaginate);

statusSchema.set('toObject', { virtuals: true });

// TODO Добавить offset и limit в config
statusSchema.statics.pagination = function(req, find, cb) {
  this.paginate(find, {
    select: config.showFields.status,
    populate: {
      path: 'owner',
      select: config.showFields.user
    },
    sort: '-createdAt',
    offset: +req.query.offset || 0,
    limit: +req.query.count || 5
  }, function(err, result) {
    if (err) { return cb(err, null); }

    cb(null, {
      totalCount: result.total,
      statuses: result.docs.map(function(status) {
        return status.toObject();
      })
    });
  });
};

statusSchema.pre('save', function(next) {
  if (!this.text) {
    return next();
  }

  var match = this.text.match(urlPattern);
  if (!match) {
    return next();
  }

  var self = this;
  metascraper.scrapeUrl(match[0])
    .then(function(metadata) {
      self.link = metadata;
      next();
    })
    .catch(function() {
      next();
    });
});

statusSchema.virtual('imageUrl').get(function() {
  return this.image && '/uploads/status/preview_' + this.image;
});

mongoose.model('Status', statusSchema);
