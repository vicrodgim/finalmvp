// import the DB pool from your config folder
const pool = require("../config/db");

const getSkills = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM skills");
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching skills:", error);
    res.status(500).json({ error: "Failed to get all skills." });
  }
};

const getSkillsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const [result] = await pool.query(
      "SELECT * FROM skills WHERE category = ?",
      [category]
    );

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No skills found for the specified category." });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching skills by category:", error);
    res.status(500).json({ error: "Failed to get skills" });
  }
};

module.exports = {
  getSkills,
  getSkillsByCategory,
};
