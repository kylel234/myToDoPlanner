require('dotenv').config();
const Pool = require("pg").Pool; // gets pg library so we can use it to connect our db to our server

/*const pool = new Pool({
    user: "postgres",
    password: "#db@rC3r!",
    host: "localhost",
    database: "planner",
    port: 5432
});*/

// app will connect to db through this if in development
const developmentConfig = {
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT
}

// if in production use this to connect to db
const productionConfig = {
    connectionString: process.env.DATABASE_URL // DATABASE_URL comes from heroku addon so we can connect to postgres db cloud service, thus our app can use postgres db
}
//console.log(process.env.PG_PASSWORD);

// chooses the config based on if app is in production
const pool = new Pool(process.env.NODE_ENV === "production" ? productionConfig : developmentConfig);
//console.log(process.env.DB_PASSWORD);

module.exports = pool;
