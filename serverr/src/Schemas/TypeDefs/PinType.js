const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')
const resolver = require('../resolver')
const UserType = require('./UserType')

const PinType = new GraphQLObjectType({
    name: 'Pin',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        image_url: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString)},
        author: {
            type: new GraphQLNonNull(UserType),
            resolve: (pin) => resolver.getPinUser(pin)
        }
    }
})

module.exports = PinType