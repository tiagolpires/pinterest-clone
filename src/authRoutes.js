const express = require('express')
const passport = require('passport')

const routes = express.Router()


routes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
routes.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:5500/client/index.html',
        failureRedirect: '/error' 
    })
)
routes.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})

module.exports = routes