var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var statusSchema = new Schema({
  text: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

mongoose.model('Status', statusSchema);