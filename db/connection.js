const sql = require(`mysql2/promise`);

const pool = sql.createPool({
    host: `localhost`,
    user: `root`,
    password: `09843Ale`,
    database: `todolist_app`
})

module.exports = pool