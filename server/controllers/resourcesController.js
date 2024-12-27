const pool = require("../config/db");

const getResources = async (req, res) => {
  try {
    const { key, value } = req.query;

    let sqlQuery = `SELECT resources.id AS resource_id, resources.title AS resource_title, resources.url, resources.type, resources.discipline, skills.title AS skills_title, skills.id AS skills_id, skills.category AS skills_category FROM resources LEFT JOIN resources_skills ON resources.id = resources_skills.resource_id LEFT JOIN skills ON resources_skills.skill_id = skills.id`;

    const params = [];

    //it can be filtered by type, discipline, and skills_title

    if (key && value) {
      if (key === "type" || key === "discipline") {
        sqlQuery += ` WHERE resources.${key}=?`;
      } else if (key === "skills_title") {
        sqlQuery += ` WHERE skills.title= ?`;
      } else {
        return res.status(400).json({ error: "Invalid filter key" });
      }
      params.push(value);
    }

    const [resources] = await pool.query(sqlQuery, params);

    const resourcesMap = {};

    for (const item of resources) {
      const {
        resource_id,
        skills_id,
        skills_title,
        skills_category,
        ...resourceDetails
      } = item;

      if (!resourcesMap[resource_id]) {
        resourcesMap[resource_id] = {
          resource_id,
          ...resourceDetails,
          skills: [],
        };
      }

      if (skills_id) {
        resourcesMap[resource_id].skills.push({
          skills_id,
          skills_title,
          skills_category,
        });
      }
    }

    const result = Object.values(resourcesMap);
    console.log(result);

    res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return res.status(500).json({ error: "Failed to get all resources" });
  }
};

module.exports = { getResources };
