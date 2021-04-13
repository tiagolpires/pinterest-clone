const pool = require('../db')

module.exports = {
    getUser: async (parent, args, context) => {
        if(context.user == null) {
            return {name: 'error: user not logged in'}
        }

        const { name } = context.user

        return {name: name}
    }
}