var baseUrl = process.env.BASE_URL || 'http://localhost:3000';

module.exports = {

  baseUrl: baseUrl,

  cropParams: {

    userAvatar: [
      { name: 'avatar', w: 175, h: 175 },
      { name: 'thumb', w: 50, h: 50 }
    ]

  },

  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/pepo-dev',

  sharpEnabled: process.env.SHARP_DISABLED !== 'yes',

  passportOptions: {

    facebook: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: baseUrl + '/api/auth/facebook'
    },

    vkontakte: {
      clientID: process.env.VKONTAKTE_APP_ID,
      clientSecret: process.env.VKONTAKTE_APP_SECRET,
      callbackURL: baseUrl + '/api/auth/vkontakte'
    }

  }

};
