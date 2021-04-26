const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        profile_picture: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
    }
})

module.exports = UserType