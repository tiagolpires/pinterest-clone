const pool = require('../db')

module.exports = {
    getUser: async () => {
        // await client.connect()
        await pool.query("CREATE TABLE EMPLOYEES (id serial primary key, name text)")
        // await pool.query("DROP TABLE EMPLOYEES")
        // await client.end()
  
        return {name: 'Tiago'}
    }
}