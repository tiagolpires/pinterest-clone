const express = require('express')
const passport = require('passport')

const routes = express.Router()


routes.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
routes.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function(req, res) {

        res.send('Sucessuful logged in!')
    }
)
routes.get('/logout', (req, res) => {
    req.session = null
    req.logout()
    res.redirect('/')
})

module.exports = routes