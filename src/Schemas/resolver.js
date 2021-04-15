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
    },
    getPin: async(parent, args) => {
        const pin = await pool.query(
            "SELECT * FROM pin WHERE id = $1", [args.id]
        )
        return pin.rows[0]
    },
    getPinUser: async(pin) => {
        const user = await pool.query(
            "SELECT * FROM pinterest_user WHERE id = $1", [pin.user_id]
        )
        return(user.rows[0])
    }
}