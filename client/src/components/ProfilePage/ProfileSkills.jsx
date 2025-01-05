import axios from "axios";
import { useState, useEffect } from "react";
import { SkillCard } from "./SkillCard";
import "./ProfileSkills.css";

export const ProfileSkills = () => {
  //variable to store all items
  const [userSkills, setUserSkills] = useState([]);
  const noSkills = userSkills.length === 0;

  //function to fetch all jobs and set result to 'jobs' array
  const fetchUserSkills = async () => {
    try {
      //communcate with databasa
      let response = await axios.get("http://localhost:4000/api/users/skills", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUserSkills(response.data.skills);
    } catch (error) {
      // handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    //call fetchItems function
    fetchUserSkills();
    console.log(userSkills);
  }, []);

  return (
    <div className="profile-skills">
      <h3>SKILLS</h3>
      {noSkills ? (
        <p className="no-items alert">
          Sorry, you have no skills to display. Why not add one now?
        </p>
      ) : (
        <div className="skill-container container">
          {userSkills.map((skill) => (
            <SkillCard skill={skill} key={skill.id} />
          ))}
        </div>
      )}
    </div>
  );
};
