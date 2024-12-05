var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var jobsRoutes = require("./routes/jobsRoutes");
var externalJobsRoutes = require("./routes/externalJobsRoutes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// app._router.app.use(express.static(path.join(__dirname, "public")));

//manages jobs saved in the database (CRUD)
app.use("/api/jobs", jobsRoutes);

//interacts external API
app.use("/api/external-jobs", externalJobsRoutes);

module.exports = app;
