var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var config = require('../config');
var patchPlugin = require('../lib/patch-plugin');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
  text: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: [Number], index: '2dsphere'},
  parent: { type: Schema.Types.ObjectId, ref: 'Status' }
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

mongoose.model('Status', statusSchema);
