module.exports = {

  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/pepo-dev',

  sharpEnabled: process.env.SHARP_DISABLED !== 'yes',

  passportOptions: {

    facebook: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/facebook'
    },

    vkontakte: {
      clientID: process.env.VKONTAKTE_APP_ID,
      clientSecret: process.env.VKONTAKTE_APP_SECRET,
      callbackURL: "http://localhost:3000/api/auth/vkontakte"
    }

  }

};
