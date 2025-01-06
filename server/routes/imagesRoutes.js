const express = require("express");
const router = express.Router();
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "public/img/" });

const { addImage } = require("../controllers/imagesController");

router.post("/", upload.single("imageUrl"), addImage);

module.exports = router;
