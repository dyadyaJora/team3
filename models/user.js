var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  fbId: Number,
  vkId: Number,
  token: { type: String, required: true }
}, {
  timestamps: true
});

userSchema.path('username').validate(function(value, done) {
  this.model('User').count({ username: value }, function(err, count) {
    if (err) { return done(err); }

    done(!count);
  });
}, 'такой логин уже зарегистрирован');

mongoose.model('User', userSchema);