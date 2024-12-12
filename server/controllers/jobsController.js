// import the DB pool from your config folder
const pool = require("../config/db");

//data needs to be treated before sending it back
const getJobs = async (req, res) => {
  try {
    //get user id from request object
    const userId = req.user_id;

    //select all columns in jobs and the title and id from the skill, connect it with junction table on jobs.id, left join skills table on skill.id.

    const [result] = await pool.query(
      "SELECT jobs.id AS jobs_id, jobs.title AS jobs_title, jobs.company_name, jobs.location, jobs.location_type, jobs.description, jobs.type, jobs.date_range,jobs.min_salary,jobs.max_salary,jobs.has_applied,jobs.created_at,jobs.url, skills.title AS skills_title, skills.id AS skills_id FROM jobs LEFT JOIN jobs_skills ON jobs.id = jobs_skills.job_id LEFT JOIN skills ON jobs_skills.skills_id = skills.id WHERE jobs.user_id = ?",
      [userId]
    );

    console.log("results", result);
    res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get all jobs" });
  }
};

//helper function to process jobs data
const treatJobsData = (data) => {
  const result = {
    jobs_id: data[0].jobs_id,
    jobs_title: data[0].jobs_title,
    company_name: data[0].company_name,
    location: data[0].location,
    location_type: data[0].location_type,
    description: data[0].description,
    type: data[0].type,
    date_range: data[0].date_range,
    min_salary: data[0].min_salary,
    max_salary: data[0].max_salary,
    has_applied: data[0].has_applied,
    created_at: data[0].created_at,
    url: data[0].url,
    skills: [],
  };

  data.forEach((info) => {
    result.skills.push({
      skills_id: info.skills_id,
      title: info.skills_title,
    });
  });

  return result;
};

const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user_id;

    const [data] = await pool.query(
      "SELECT jobs.id AS jobs_id, jobs.title AS jobs_title, jobs.company_name, jobs.location, jobs.location_type, jobs.description, jobs.type, jobs.date_range,jobs.min_salary,jobs.max_salary,jobs.has_applied,jobs.created_at,jobs.url, skills.title AS skills_title, skills.id AS skills_id FROM jobs LEFT JOIN jobs_skills ON jobs.id = jobs_skills.job_id LEFT JOIN skills ON jobs_skills.skills_id = skills.id WHERE jobs.id=? AND jobs.user_id=?",
      [id, userId]
    );

    if (data.length === 0) {
      return res.status(404).json({
        error: "This job was not found",
      });
    }

    //apply function
    const job = treatJobsData(data);

    //send it to the client
    res.status(200).send(job);
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
      skills,
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

    //Insert job into jobs table

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

    console.log("query result:", result);

    const jobId = result.insertId;

    console.log("Resulted Id:", jobId);

    //insert into jobs_skills
    //check if skills exist/non-empty
    //loop through each skill, insert the id
    if (skills && skills.length > 0) {
      for (let skillId of skills) {
        await pool.query(
          "INSERT into jobs_skills (job_id, skills_id) VALUES (?,?)",
          [jobId, skillId]
        );
      }
    }
    res.status(201).json({
      message: "Job was added successfully",
      jobId,
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
