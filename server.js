const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const authRoutes = require('./src/authRoutes')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/Schemas')
require('./auth')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(
    cors({
        origin: process.env.CLIENT_URL, 
        methods: "POST",    
        credentials: true
    })
)

app.use(session({
    store: new (require('connect-pg-simple')(session))(),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000} // 30 days
}))

app.use((req, res, next) => {
    console.log('Cookies: ', req.cookies)
    console.log(req.headers)
    next()
})

app.use(passport.initialize())
app.use(passport.session())
app.use('/', authRoutes)

app.use('/graphql', graphqlHTTP(req => ({
    schema: schema,
    context: { user: req.user },
    graphiql: true
})))


app.listen(PORT, () => console.log(`Server Running at ${PORT}`))