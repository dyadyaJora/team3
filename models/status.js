var mongoose = require('mongoose');
var patchPlugin = require('../lib/patch-plugin');
var paginationPlugin = require('../lib/pagination-plugin');
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

statusSchema.plugin(paginationPlugin);

statusSchema.set('toObject', { virtuals: true });

mongoose.model('Status', statusSchema);
