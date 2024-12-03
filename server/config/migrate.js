require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");

// get access info from .env
const DB_HOST = process.env.DB_HOST;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

// connect to SQL database
const con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
});

// try to connect: tell us when it worked, or if there's an error
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  // getting the sql code from my init_db file
  let sql = fs.readFileSync(__dirname + "/../data/init_db.sql").toString();
  // querying the database: run my sql code in the database
  con.query(sql, function (err, result) {
    // tell me if it worked, or if there's an error
    if (err) throw err;
    console.log("Table creation was successful!");

    console.log("Closing...");
  });

  // end the connection
  con.end();
});
