const express = require("express");
const router = express.Router();

const jobsController = require("../controllers/jobsController");

//any route in this file is pre-pended with /api/jobs

router.get("/", jobsController.getJobs); //fetches all jobs

router.get("/:id", jobsController.getJobById); //fetches a job by ID

router.post("/", jobsController.addJob); //adds new job

router.put("/:id", jobsController.updateJob); //updates a job

router.delete("/:id", jobsController.deleteJob); //deletes a job

module.exports = router;
