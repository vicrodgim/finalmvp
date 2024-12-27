const express = require("express");
const router = express.Router();
require("dotenv").config();
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");

const resourcesController = require("../controllers/resourcesController");

//any route in this file is pre-pended with /api/resources

router.get("/", userShouldBeLoggedIn, resourcesController.getResources); //fetches all resources for a user

module.exports = router;
