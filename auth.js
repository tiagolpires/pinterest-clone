const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user)   
    // })
    console.log(profile)
    return cb(null, profile)
  }
))

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(user, cb) {
    cb(null, user);
});