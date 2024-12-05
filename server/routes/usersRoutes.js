const express = require("express");
const router = express.Router();
require("dotenv").config();
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");

const {
  getAllUsers,
  registerUser,
  login,
  getProfile,
  deleteUser,
} = require("../controllers/usersController");

// add a route to get all users: GET /
router.get("/", getAllUsers);

// add a route to register a user: POST /
router.post("/", registerUser);

// add a route to register a user: POST /
router.post("/login", login);

// add a route to add profile from user: GET /
router.get("/profile", userShouldBeLoggedIn, getProfile);

//add a route to delete a user: DELETE /
router.delete("/:id", deleteUser);

module.exports = router;
