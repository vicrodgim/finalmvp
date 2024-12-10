// import the DB pool from your config folder
const pool = require("../config/db");

const getJobs = async (req, res) => {
  try {
    //get user id from request object
    const userId = req.user_id;

    const [result] = await pool.query("SELECT * FROM jobs WHERE user_id = ?", [
      userId,
    ]);

    console.log("results", result);
    res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get all jobs" });
  }
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user_id;

    const [job] = await pool.query(
      "SELECT * FROM jobs WHERE id=? AND user_id=?",
      [id, userId]
    );

    if (job.length === 0) {
      return res.status(404).json({
        error: "This job was not found",
      });
    }

    res.status(200).send({ job: job[0] });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Failed to get job" });
  }
};

const addJob = async (req, res) => {
  try {
    const userId = req.user_id;

    const {
      title,
      company_name,
      location,
      location_type,
      description,
      type,
      date_range,
      min_salary,
      max_salary,
      has_applied,
      created_at,
      url,
    } = req.body;

    // title, company name, description, location, type, has_applied, and url are required
    if (
      !title ||
      !company_name ||
      !description ||
      !location ||
      !type ||
      has_applied === undefined ||
      !url
    ) {
      return res.status(400).json({
        error:
          "title, company name, description, location, type, has_applied, and url are required.",
      });
    }

    const [result] = await pool.query(
      "INSERT INTO jobs (user_id, title, company_name, location, location_type, description, type, date_range, min_salary, max_salary, has_applied, created_at, url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        title,
        company_name,
        location,
        location_type || null,
        description,
        type,
        date_range || null,
        min_salary || null,
        max_salary || null,
        has_applied || false,
        created_at || null,
        url,
      ]
    );

    res.status(201).json({
      message: "Job was added successfully",
      jobId: result.insertId,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to add the job" });
  }
};

const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user_id;
    const { has_applied } = req.body;

    //check if it is provided
    if (has_applied === undefined) {
      return res.status(400).json({
        error: "The has_applied field is required",
      });
    }

    const [result] = await pool.query(
      "UPDATE jobs SET has_applied=? WHERE id=? AND user_id=?",
      [has_applied, id, userId]
    );

    //check if rows have been affected
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "This job was not found" });
    }

    res.status(200).send({ message: "has_applied status has been updated" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Failed to update has_applied status",
    });
  }
};

const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user_id;

    const [result] = await pool.query(
      "DELETE FROM jobs WHERE id=? AND user_id=?",
      [id, userId]
    );

    //check if the job was deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "This job was not found." });
    }

    res.status(200).send({ message: "Job has been deleted." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      error: "Failed to delete job.",
    });
  }
};

module.exports = {
  getJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob,
};
