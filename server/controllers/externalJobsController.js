require("dotenv").config();

const searchJobs = async (req, res) => {
  res.send({ message: "searching for jobs using external API" });
};

const getExternalJobById = async (req, res) => {
  res.send({ message: "fetch job detals" });
};

module.exports = {
  searchJobs,
  getExternalJobById,
};
