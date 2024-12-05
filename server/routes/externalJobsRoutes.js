const express = require("express");
const router = express.Router();

const externalJobsController = require("../controllers/externalJobsController");

//any route in this file is pre-pended with /api/external-jobs

router.get("/search", externalJobsController.searchJobs);
router.get("/:externalId", externalJobsController.getExternalJobById);

module.exports = router;
