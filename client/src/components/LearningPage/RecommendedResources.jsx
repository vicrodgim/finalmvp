import axios from "axios";
import { useState, useEffect } from "react";
import { ResourceCard } from "./ResourceCard";
import { SkillCard } from "../ProfilePage/SkillCard";

export const RecommendedResources = ({ resources }) => {
  //variable to store users_skills
  const [userSkills, setUserSkills] = useState([]);
  //variable to store jobs_skills
  const [jobsSkills, setJobsSkills] = useState([]);
  const [recommendedSkills, setRecommendedSkills] = useState([]);
  const [recommendedResources, setRecommendedResources] = useState([]);

  const fetchUserSkills = async () => {
    try {
      let response = await axios.get("http://localhost:4000/api/users/skills", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      //console.log("userSkills response:", response.data);
      setUserSkills(response.data.skills);
      //console.log(userSkills);
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
      //console.log("jobsSkills response:", response.data);
      setJobsSkills(response.data.skills);
      //console.log(jobsSkills);
      //console.log("all resources:", resources);
    } catch (error) {
      console.error(error);
    }
  };

  const filterRecommendedSkills = () => {
    const userSkillsId = userSkills.map((skill) => skill.skill_id);
    let filtered = jobsSkills.filter(
      (skill) => !userSkillsId.includes(skill.skills_id)
    );
    setRecommendedSkills(filtered);
    console.log("recommended skills:", recommendedSkills);
  };

  const filterRecommendedResources = () => {};

  //for every resource in resources
  //check its skills
  //if it includes skills_id

  useEffect(() => {
    fetchUserSkills();
    fetchJobsSkills();
  }, []);

  useEffect(() => {
    if (userSkills.length && jobsSkills.length) {
      filterRecommendedSkills();
    }
  }, [userSkills, jobsSkills]);

  useEffect(() => {
    if (recommendedSkills.length) {
      filterRecommendedResources();
    }
  }, [recommendedSkills]);

  // LOGIC FOR RECOMMENDED RESOURCES
  // loop through jobsSkills
  // loop through userSkills
  // if jobs skill is not included in userSkills
  // display resources where resources.skills strictly equal to jobs skill

  return (
    <>
      <div>USER SKILLS</div>
      <div className="skill-container container">
        {userSkills.map((skill, index) => (
          <SkillCard skill={skill} key={index} />
        ))}
      </div>
      <div>JOBS SKILLS</div>
      <div className="skill-container container">
        {jobsSkills.map((skill, index) => (
          <SkillCard skill={skill} key={index} />
        ))}
      </div>
      <div>RECOMMENDED SKILLS</div>
      <div className="skill-container container">
        {recommendedSkills.map((skill, index) => (
          <SkillCard skill={skill} key={index} />
        ))}
      </div>
      <div>RECOMMENDED RESOURCES</div>
      <div>{}</div>
    </>
  );
};
