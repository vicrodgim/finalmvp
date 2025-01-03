// import the DB pool from your config folder
const pool = require("../config/db");

const getJobs = async (req, res) => {
  try {
    const userId = req.user_id;

    const { key, value } = req.query;

    let sqlQuery = `SELECT jobs.id AS jobs_id, jobs.title AS jobs_title, jobs.company_name, jobs.location, jobs.location_type, jobs.description, jobs.type, jobs.date_range,jobs.min_salary,jobs.max_salary,jobs.has_applied,jobs.created_at,jobs.url, skills.title AS skills_title, skills.id AS skills_id FROM jobs LEFT JOIN jobs_skills ON jobs.id = jobs_skills.job_id LEFT JOIN skills ON jobs_skills.skills_id = skills.id WHERE jobs.user_id = ?`;

    if (key && value) {
      sqlQuery = `${sqlQuery} AND jobs.${key}=?`;
    }

    const params = key && value ? [userId, value] : [userId];

    const [jobs] = await pool.query(sqlQuery, params);

    //temporary object to track jobs by ID
    const jobsMap = {};

    for (const item of jobs) {
      const { jobs_id, skills_id, skills_title, ...jobDetails } = item;

      // Check if this job is already in the groupedArray
      if (!jobsMap[jobs_id]) {
        jobsMap[jobs_id] = {
          jobs_id,
          ...jobDetails,
          skills: [],
        };
      }

      // Add the skill to the corresponding job's skills array
      jobsMap[jobs_id].skills.push({ skills_id, skills_title });
    }
    const result = Object.values(jobsMap);
    console.log(result);

    res.status(200).send(result);
  } catch (error) {
    return res.status(500).json({ error: "Failed to get all jobs" });
  }
};

//Helper function to process get jobs by id
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

    const job = treatJobsData(data);

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

    console.log("query result:", result);

    const jobId = result.insertId;

    console.log("Resulted Id:", jobId);

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
      jobs_id: jobId,
      job: { ...req.body },
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

    if (has_applied === undefined) {
      return res.status(400).json({
        error: "The has_applied field is required",
      });
    }

    const [result] = await pool.query(
      "UPDATE jobs SET has_applied=? WHERE id=? AND user_id=?",
      [has_applied, id, userId]
    );

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
