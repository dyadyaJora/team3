var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  name: String,
  fbId: Number,
  vkId: Number,
  token: String
}, {
  timestamps: true
});

mongoose.model('User', userSchema);