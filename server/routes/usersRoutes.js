const express = require("express");
const router = express.Router();
require("dotenv").config();
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");

const {
  getAllUsers,
  getSkillsByUserId,
  addSkillToUser,
  registerUser,
  login,
  getProfile,
  deleteUser,
} = require("../controllers/usersController");

// add a route to get all users: GET /
router.get("/", getAllUsers);

// add a route to get all skills by user id: GET /
/* router.get("/:id/skills", userShouldBeLoggedIn, getSkillsByUserId); */

router.get("/skills", userShouldBeLoggedIn, getSkillsByUserId);

// add a route to post skills by user: POST /
router.post("/addSkill", userShouldBeLoggedIn, addSkillToUser);

// add a route to register a user: POST /
router.post("/", registerUser);

// add a route to register a user: POST /
router.post("/login", login);

// add a route to add profile from user: GET /
router.get("/profile", userShouldBeLoggedIn, getProfile);

//add a route to delete a user: DELETE /
router.delete("/:id", deleteUser);

module.exports = router;
