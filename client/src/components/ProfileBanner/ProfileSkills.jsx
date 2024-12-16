import axios from "axios";
import { useState, useEffect } from "react";
import "./ProfileSkills.css";

export const ProfileSkills = () => {
  //variable to store all items
  const [userSkills, setUserSkills] = useState([]);

  //function to fetch all jobs and set result to 'jobs' array
  const fetchUserSkills = async () => {
    try {
      //communcate with databasa
      let response = await axios.get("http://localhost:4000/api/users/skills", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setUserSkills(response.data);
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
    <div className="skills profile-skills">
      <div className="skills skills-title">SKILLS </div>
      <div className="skills skills-advanced">ADVANCED</div>
      <div className="skills skills-intermediate">INTERMEDIATE </div>
      <div className="skills skills-beginner">BEGINNER </div>
    </div>
  );
};
