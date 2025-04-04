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

//any route in this file is pre-pended with /api/users

//route to get all users: GET /
router.get("/", getAllUsers);

//route to get all skills by user id: GET /
/* router.get("/:id/skills", userShouldBeLoggedIn, getSkillsByUserId); */

router.get("/skills", userShouldBeLoggedIn, getSkillsByUserId);

//route to post skills by user: POST /
router.post("/addSkill", userShouldBeLoggedIn, addSkillToUser);

//route to register a user: POST /
router.post("/", registerUser);

//route to register a user: POST /
router.post("/login", login);

//route to add profile from user: GET /
router.get("/profile", userShouldBeLoggedIn, getProfile);

//route to delete a user: DELETE /
router.delete("/:id", deleteUser);

module.exports = router;
