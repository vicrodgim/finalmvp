const express = require("express");
const router = express.Router();
require("dotenv").config();
const userShouldBeLoggedIn = require("../guard/userShouldBeLoggedIn");

const jobsController = require("../controllers/jobsController");

//any route in this file is pre-pended with /api/jobs

router.get("/skills", userShouldBeLoggedIn, jobsController.getJobsSkills); //get all skills for saved jobs

router.get("/", userShouldBeLoggedIn, jobsController.getJobs); //fetches all jobs for a user

router.get("/:id", userShouldBeLoggedIn, jobsController.getJobById); //fetches a job by ID

router.post("/", userShouldBeLoggedIn, jobsController.addJob); //adds a new job

router.put("/:id/has_applied", userShouldBeLoggedIn, jobsController.updateJob); //updates has_aplied column

router.delete("/:id", userShouldBeLoggedIn, jobsController.deleteJob); //deletes a job

module.exports = router;
