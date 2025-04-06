import axios from "axios";
import { useState, useEffect } from "react";

export const RecommendedResources = ({ resources }) => {
  //variable to store users_skills
  const [userSkills, setUserSkills] = useState([]);
  //variable to store jobs_skills
  const [jobsSkills, setJobsSkills] = useState([]);

  const fetchUserSkills = async () => {
    try {
      let response = await axios.get("http://localhost:4000/api/users/skills", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUserSkills(response.data);
      console.log(userSkills);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobsSkills = async () => {
    try {
      let response = await axios.get("http://localhost:4000/api/jobs/skills", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setJobsSkills(response.data);
      console.log(jobsSkills);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserSkills();
    fetchJobsSkills();
  }, []);

  // LOGIC FOR RECOMMENDED RESOURCES
  // loop through jobsSkills
  // loop through userSkills
  // if jobs skill is not included in userSkills
  // display resources where resources.skills strictly equal to jobs skill

  return <div></div>;
};
