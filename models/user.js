var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var crypto = require('crypto');
var Promise = require('bluebird');
var patchPlugin = require('../lib/patch-plugin.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, trim: true, minlength: 4, unique: true },
  name: { type: String, required: true, maxlength: 20 },
  avatar: String,
  description: String,
  fbId: Number,
  vkId: Number,
  token: { type: String },
  following: [{ type: Schema.ObjectId, ref: 'User' }],
  statusesCount: { type: Number, default: 0 },
  followingCount: { type: Number, default: 0 },
  followersCount: { type: Number, default: 0 }
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
  permitParams: ['username', 'name', 'description']
});

userSchema.plugin(mongoosePaginate);

userSchema.methods.isFollowing = function(user) {
  return this.following.indexOf(user._id) != -1;
};

userSchema.methods.follow = function(user) {
  if (this.isFollowing(user)) {
    return Promise.resolve();
  }

  return this.model('User').update({
    _id: this._id
  }, {
    $push: {
      following: user._id
    }
  });
};

userSchema.methods.unFollow = function(user) {
  return this.model('User').update({
    _id: this._id
  }, {
    $pull: {
      following: user._id
    }
  });
};

userSchema.virtual('avatarUrl').get(function() {
  return this.avatar && '/uploads/avatar/avatar_' + this.avatar;
});

userSchema.virtual('thumbUrl').get(function() {
  return this.avatar && '/uploads/avatar/thumb_' + this.avatar;
});

userSchema.pre('save', function(next) {
  if (this.token) { return next(); }

  generateToken(this, next);
});

userSchema.set('toObject', { virtuals: true });

mongoose.model('User', userSchema);

function generateToken(user, done) {
  var token = crypto.randomBytes(64).toString('hex');

  user.model('User').count({ token: token }, function(err, count) {
    if (err) { return done(err); }

    if (!count) {
      user.token = token;
      return done();
    }

    generateToken(user, done);
  });
}
