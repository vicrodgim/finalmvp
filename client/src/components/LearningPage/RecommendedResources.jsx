import axios from "axios";
import { useState, useEffect } from "react";
import { ResourceCard } from "./ResourceCard";
import { SkillCard } from "../ProfilePage/SkillCard";
import "./RecommendedResources.css";

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

  // Filter recommended skills: get skills from jobs that are not in user skills
  const filterRecommendedSkills = () => {
    // Extract skill_ids from userSkills
    const userSkillsId = userSkills.map((skill) => skill.skill_id);
    // Filter jobsSkills based on whether the skill_id is not in userSkillsId
    let filtered = jobsSkills.filter(
      (skill) => !userSkillsId.includes(skill.skills_id)
    );
    setRecommendedSkills(filtered);
    console.log("recommended skills:", recommendedSkills);
  };

  // Filter recommended resources based on recommendedSkills
  const filterRecommendedResources = () => {
    let filtered = resources.filter((resource) =>
      // Check if any of the resource's skills match a recommended skill
      resource.skills.some((resourceSkill) =>
        recommendedSkills.some(
          (recommendedSkill) =>
            recommendedSkill.skills_id === resourceSkill.skills_id
        )
      )
    );
    setRecommendedResources(filtered);
    console.log("recommended resources:", filtered);
  };

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
      {/* <div>USER SKILLS</div>
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
      </div> */}
      <div>RECOMMENDED RESOURCES</div>
      <div className="recommended-resources">
        {recommendedResources.map((r) => (
          <ResourceCard r={r} key={r.resource_id} />
        ))}
      </div>
    </>
  );
};
