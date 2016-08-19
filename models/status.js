var mongoose = require('mongoose');
var patchPlugin = require('../lib/patch-plugin');
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

mongoose.model('Status', statusSchema);
