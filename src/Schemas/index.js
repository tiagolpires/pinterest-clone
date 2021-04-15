const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require('graphql')
const UserType = require('./TypeDefs/UserType')
const PinType = require('./TypeDefs/PinType')
const resolver = require('./resolver')

const RootQueryType = new GraphQLObjectType ({
    name: 'Query',
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve: resolver.getAllUsers
        },
        user: {
            type: UserType,
            resolve: resolver.getUser
        },
        pins: {
            type: new GraphQLList(PinType),
            resolve: resolver.getAllPins
        }
    }
})

module.exports = new GraphQLSchema({query: RootQueryType})

