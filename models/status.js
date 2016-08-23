var mongoose = require('mongoose');
var patchPlugin = require('../lib/patch-plugin');
var paginationPlugin = require('../lib/pagination-plugin');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
  text: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

statusSchema.plugin(patchPlugin, {
  permitParams: ['text']
});

statusSchema.plugin(paginationPlugin);

statusSchema.set('toObject', { virtuals: true });

mongoose.model('Status', statusSchema);
