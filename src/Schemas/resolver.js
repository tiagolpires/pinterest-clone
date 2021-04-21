const pool = require('../db')

module.exports = {
    getLoggedUser: async (parent, args, { user }) => {
        if(!user) throw new Error('User not connected')
        return user
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
    },
    addPin: async(parent, { image_url: imageUrl, title, description }, { user }) => {
        if(!user) throw new Error('User not connected')

        const newPin = await pool.query(
            "INSERT INTO pin (user_id, image_url, title, description) VALUES($1, $2, $3, $4) RETURNING *",
            [user.id, imageUrl, title, description]   
        )
        return newPin.rows[0]
    },
    getUserPins: async(parent, args, { user }) => {
        if(!user) throw new Error('User not connected')
        const userPins = await pool.query(
            "SELECT * FROM pin WHERE user_id = $1", [user.id]
        )
        return userPins.rows
    },
    getUserSavedPins: async(parent, args, { user }) => {
        if(!user) throw new Error('User not connected')
        const savedUserPins = await pool.query(
            "SELECT * FROM pin INNER JOIN saved_pin ON pin.id = saved_pin.pin_id WHERE saved_pin.user_id = $1",
            [user.id]
        )
        return savedUserPins.rows
    },
    savePin: async(parent, { id: pinId }, { user }) => {
        if(!user) throw new Error('User not connected')
        const savePin = await pool.query(
            "INSERT INTO saved_pin (user_id, pin_id) VALUES($1, $2) RETURNING *", [user.id, pinId]
        )
        return savePin.rows[0]
    }
}