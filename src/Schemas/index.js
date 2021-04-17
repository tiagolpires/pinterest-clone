const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } = require('graphql')
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
        loggedUser: {
            type: UserType,
            resolve: resolver.getLoggedUser
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

const RootMutationType = new GraphQLObjectType ({
    name: 'Mutation',
    fields: {
        addPin: {
            type: PinType,
            args: {
                image_url: { type: GraphQLNonNull(GraphQLString) },
                title: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: (parent, args, context) => resolver.addPin(parent, args, context)
        }
    }
})

module.exports = new GraphQLSchema({query: RootQueryType, mutation: RootMutationType})

