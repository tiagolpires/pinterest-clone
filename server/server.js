const express = require('express')
const cors = require('cors')
const cookieSession = require('cookie-session')
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

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', authRoutes)

app.use('/graphql', graphqlHTTP(req => ({
    schema: schema,
    context: { user: req.user },
    graphiql: true
})))


app.listen(PORT, () => console.log(`Server Running at ${PORT}`))