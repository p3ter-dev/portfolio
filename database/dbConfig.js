require('dotenv').config();
const pg = require('pg');
const { Pool } = pg;

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});
console.log(process.env.DATABASE_URL);
module.exports = pool;