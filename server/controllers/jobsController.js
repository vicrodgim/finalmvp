// import the DB pool from your config folder
const pool = require("../config/db");

const getJobs = async (req, res) => {
  res.send({ message: "get all jobs" });
};

const getJobById = async (req, res) => {
  res.send({ message: "get one job" });
};

const addJob = async (req, res) => {
  res.send({ message: "added a job" });
};

const updateJob = async (req, res) => {
  res.send({ message: "updated a job" });
};

const deleteJob = async (req, res) => {
  res.send({ message: "deleted a job" });
};

module.exports = {
  getJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob,
};
