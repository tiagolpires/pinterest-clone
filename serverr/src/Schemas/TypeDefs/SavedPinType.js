const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require('graphql')

const SavedPinType = new GraphQLObjectType({
    name: 'SavedPin',
    fields: {
        user_id: { type: new GraphQLNonNull(GraphQLID) },
        pin_id: { type: new GraphQLNonNull(GraphQLID) }
    }
})

module.exports = SavedPinType