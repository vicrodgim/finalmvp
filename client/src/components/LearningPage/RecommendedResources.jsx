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

  useEffect(() => {
    fetchUserSkills();
  }, []);

  // LOGIC FOR RECOMMENDED RESOURCES
  // check jobs_skills
  // check users_skills
  // loop through jobs_skills
  // if jobs skills is not included in users_skills
  // display resources where resources_skills strictly equal to jobs skill

  return <div></div>;
};
