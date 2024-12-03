// import the DB pool from your config folder
const pool = require("../config/db");

// example controller function
const getExample = async (req, res) => {
  res.status(200).send({ message: "Welcome to Express" });
};

module.exports = getExample;
