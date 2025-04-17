const mysql = require("mysql2/promise");
require("dotenv").config();

// Make sure you create a .env file so that these values pass correctly
const dbOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  dateStrings: ["DATE"],
};

const pool = mysql.createPool(dbOptions);

module.exports = pool;
