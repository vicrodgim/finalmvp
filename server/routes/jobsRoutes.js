const express = require("express");
const router = express.Router();
require("dotenv").config();
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");

const jobsController = require("../controllers/jobsController");

//any route in this file is pre-pended with /api/jobs

router.get("/", userShouldBeLoggedIn, jobsController.getJobs); //fetches all jobs for a user

router.get("/:id", userShouldBeLoggedIn, jobsController.getJobById); //fetches a job by ID

router.post("/", userShouldBeLoggedIn, jobsController.addJob); //adds a new job

router.put("/:id", userShouldBeLoggedIn, jobsController.updateJob); //updates all job columns

router.delete("/:id", userShouldBeLoggedIn, jobsController.deleteJob); //deletes a job

module.exports = router;
