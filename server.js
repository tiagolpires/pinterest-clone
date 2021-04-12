const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/Schemas')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors()) 
app.use(express.json()) 

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(PORT, () => console.log(`Server Running at ${PORT}`))