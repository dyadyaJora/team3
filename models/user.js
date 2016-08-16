var mongoose = require('mongoose');
var patchPlugin = require('../lib/patch-plugin.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, trim: true, minlength: 4 },
  name: { type: String, required: true, maxlength: 20 },
  fbId: Number,
  vkId: Number,
  token: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.path('username').validate(function(value) {
  return /^[a-zA-Z0-9_]+$/.test(value);
}, 'Неверное имя пользователя.');

userSchema.path('username').validate(function(value, done) {
  if (this.username === value) {
    return done(true);
  }

  this.model('User').count({ username: value }, function(err, count) {
    if (err) { return done(err); }

    done(!count);
  });
}, 'Такой логин уже зарегистрирован.');

userSchema.plugin(patchPlugin, {
  permitParams: ['username', 'name']
});

mongoose.model('User', userSchema);
