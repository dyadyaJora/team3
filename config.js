var baseUrl = process.env.BASE_URL || 'http://localhost:3000';

module.exports = {

  baseUrl: baseUrl,

  cropParams: {

    userAvatar: [
      { name: 'avatar', w: 175, h: 175 },
      { name: 'thumb', w: 50, h: 50 }
    ],

    statusImage: [
      { name: 'preview', w: 800, h: 600 }
    ]

  },

  showFields: {

    user: '_id username name avatar statusesCount followingCount followersCount',
    status: '_id text location owner link image createdAt updatedAt'

  },

  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/pepo-dev',

  sharpEnabled: process.env.SHARP_DISABLED !== 'yes',

  socketDebounce: 3000,

  passportOptions: {

    facebook: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: baseUrl + '/api/auth/facebook',
      profileFields: ['id', 'displayName', 'picture.type(large)']
    },

    vkontakte: {
      clientID: process.env.VKONTAKTE_APP_ID,
      clientSecret: process.env.VKONTAKTE_APP_SECRET,
      callbackURL: baseUrl + '/api/auth/vkontakte'
    }

  }

};
