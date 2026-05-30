const { Pool } = require("pg");
require("dotenv").config();


const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "pipeline_user",
    password: process.env.PASSWORD,
    database: "pipeline_runs"
});

module.exports = pool