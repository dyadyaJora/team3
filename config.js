module.exports = {

  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/pepo-dev',

  passportOptions: {

    facebook: {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/api/auth/facebook'
    }

  }

};