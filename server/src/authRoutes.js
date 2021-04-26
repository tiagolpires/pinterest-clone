const express = require('express')
const passport = require('passport')
require('dotenv').config()

const routes = express.Router()


routes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
routes.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: process.env.CLIENT_URL,
        failureRedirect: '/error' 
    })
)
routes.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})

module.exports = routes