const { Postgres } = require("pg");
require("dotenv").config();


const posgresConnection = Postgres({
    host: "localhost",
    port: 5432,
    username: "pipeline_user",
    password: process.env.PASSWORD
});

module.exports = postgresConnection