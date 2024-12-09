const pool = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

const getAllUsers = async (req, res) => {
  try {
    // use pool to get data from DB
    const [rows] = await pool.query("SELECT * FROM users");
    console.log(rows);
    // send the fetched data back to the client as a JSON response
    return res.status(200).send({
      data: rows,
    });
  } catch (error) {
    console.log(error.message);
    // Send a 500 status code if there's an error
    return res.status(500).json({
      error: "Failed to get all users",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      username,
      first_name,
      last_name,
      description,
      location,
      email,
      password,
      imageUrl,
    } = req.body;

    const hash = await bcrypt.hash(password, saltRounds);

    if (
      !username ||
      !first_name ||
      !last_name ||
      !description ||
      !location ||
      !email ||
      !password ||
      !imageUrl
    ) {
      return res.status(400).json({
        error: "Failed to create user",
      });
    }
    const [result] = await pool.query(
      `INSERT INTO users (username,
              first_name,
              last_name,
              description,
              location,
              email,
              password,
              imageUrl) VALUES ('${username}', '${first_name}', '${last_name}', '${description}', '${location}', '${email}', '${hash}', '${imageUrl}');`
    );
    res.status(201).send({ message: "Register successful" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Failed to register user",
    });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await pool.query(
      `SELECT * FROM users WHERE username = "${username}"`
    );

    const user = results[0];
    if (user) {
      const user_id = user.id;

      const correctPassword = await bcrypt.compare(password, user.password);

      if (!correctPassword) throw new Error("Incorrect password");

      // { user_id } is the same as { user_id: user_id }
      let token = jwt.sign({ user_id }, supersecret);

      res.send({ message: "Login successful, here is your token", token });
    } else {
      throw new Error("User does not exist");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  const [results] = await pool.query(
    `SELECT username, first_name, last_name, description, location, email, imageUrl FROM users WHERE id = ${req.user_id}`
  );
  res.send(results[0]);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    //if affectedRows is 0, no user was deleted, so a 404 error is sent
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    //otherwise, it sends a 200 status with a deletion success message.
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Failed to delete User" });
  }
};

module.exports = {
  getAllUsers,
  registerUser,
  login,
  getProfile,
  deleteUser,
};
