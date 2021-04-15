const pool = require('../db')

module.exports = {
    getUser: async (parent, args, context) => {
        if(context.user == null) {
            return {name: 'error: user not logged in'}
        }

        const { name } = context.user

        return {name: name}
    },
    getAllUsers: () => {
        return [
            {
                id: 123,
                name: 'Tiago',
                profile_picture: 'tiaog.jpg',
                email: 'tiasdsadas@hotmail.com'
            },
            {
                id: 1234,
                name: 'Test',
                profile_picture: 'test.jpg',
                email: 'test@hotmail.com'
            }
        ]
    },
    getAllPins: async() => {
        const pins = await pool.query(
            "SELECT * FROM pin"
        )
        return pins.rows
    }
}