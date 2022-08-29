const Pool = require("pg").Pool; // gets pg library so we can use it to connect our db to our server

const pool = new Pool({
    user: "postgres",
    password: "#db@rC3r!",
    host: "localhost",
    database: "planner",
    port: 5432
});

module.exports = pool;
