import { useState, useEffect } from "react";
import axios from "axios";

export const useSkillMatches = () => {
  const [jobMatches, setJobMatches] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);

  const getJobMatches = (jobs, userSkillsTitles) => {
    return jobs.map((job) => {
      const jobSkillsTitles = job.skills.map((skill) => skill.skills_title);
      const total = jobSkillsTitles.length;
      const matched = jobSkillsTitles.filter((skill) =>
        userSkillsTitles.includes(skill)
      ).length;

      const match = Math.round((matched / total) * 100);
      const missing = 100 - match;

      return {
        title: job.jobs_title,
        match,
        missing,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await axios.get("http://localhost:4000/api/jobs", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const skillsRes = await axios.get(
          "http://localhost:4000/api/users/skills",
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const jobs = jobsRes.data;
        const skills = skillsRes.data.skills;
        setJobs(jobs);
        setSkills(skills);
        const userSkillsTitles = skills.map((skill) => skill.title);
        const matches = getJobMatches(jobs, userSkillsTitles);
        setJobMatches(matches);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return { jobMatches, jobs, skills };
};
