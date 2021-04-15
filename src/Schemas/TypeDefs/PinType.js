const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')
const UserType = require('./UserType')

const PinType = new GraphQLObjectType({
    name: 'Pin',
    fields: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        image_url: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
    }
})

module.exports = PinType