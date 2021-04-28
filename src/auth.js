const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const pool = require('./db')
require('dotenv').config()

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
    (accessToken, refreshToken, profile, cb) => {
    pool.query(
        "INSERT INTO pinterest_user (id, name, profile_picture, email) VALUES($1, $2, $3, $4) ON CONFLICT (id) DO NOTHING",
        [profile.id, profile.displayName, profile._json.picture, profile._json.email], 
        (err, res) => {
            if(err) {
                console.log(err)
            }
            return cb(null, profile.id)
        }
    )
  }
))

passport.serializeUser(function(userId, cb) {
    cb(null, userId)
})
  
passport.deserializeUser(async(userId, cb) => {
    const user = await pool.query(
        "SELECT * FROM pinterest_user WHERE id = $1", 
        [userId]
    )
    cb(null, user.rows[0])
})