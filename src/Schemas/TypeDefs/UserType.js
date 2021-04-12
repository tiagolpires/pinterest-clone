const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require('graphql')

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        name: {type: GraphQLNonNull(GraphQLString)}
    }
})

module.exports = UserType