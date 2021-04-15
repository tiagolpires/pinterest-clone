const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLID } = require('graphql')
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
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent, args) => resolver.getUser(parent, args)
        },
        pins: {
            type: new GraphQLList(PinType),
            resolve: resolver.getAllPins
        },
        pin: {
            type: PinType,
            args: {
                id: {type: GraphQLID}
            },
            resolve: (parent, args) => resolver.getPin(parent, args)
        }
    }
})

module.exports = new GraphQLSchema({query: RootQueryType})

