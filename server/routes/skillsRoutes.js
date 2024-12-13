const express = require("express");
const router = express.Router();
require("dotenv").config();
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");
const skillsController = require("../controllers/skillsController"); // Import the controller

//fetches all skills
router.get("/", userShouldBeLoggedIn, skillsController.getSkills);

//fetches all skills by category
router.get(
  "/categories/:category",
  userShouldBeLoggedIn,
  skillsController.getSkillsByCategory
);

module.exports = router;
