const express = require("express");
const router = express.Router();
const getExample = require("../controllers/exampleController");

/* GET example */
router.get("/", getExample);

module.exports = router;
