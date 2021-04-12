const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')
const UserType = require('./TypeDefs/UserType')
const resolver = require('./resolver')

const RootQueryType = new GraphQLObjectType ({
    name: 'Query',
    fields: {
        user: {
            type: UserType,
            resolve: resolver.getUser
        }
    }
})

module.exports = new GraphQLSchema({query: RootQueryType})

