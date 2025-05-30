import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BodyNavButton from "../../elements/BodyNavButton";
import "./EditProfile.css";

export const EditProfile = () => {
  const [form, setForm] = useState({
    proficiency_level: "",
    skill_id: "",
  });
  const [skills, setSkills] = useState([
    { label: "HTML", value: "1" },
    { label: "CSS", value: "2" },
    { label: "JavaScript", value: "3" },
    { label: "React", value: "4" },
    { label: "Vue.js", value: "5" },
    { label: "TypeScript", value: "6" },
    { label: "Bootstrap", value: "7" },
    { label: "Node.js", value: "8" },
    { label: "Express.js", value: "9" },
    { label: "Phyton", value: "10" },
    { label: "Django", value: "11" },
    { label: "Java", value: "12" },
    { label: "Spring Boot", value: "13" },
    { label: "MySQL", value: "14" },
    { label: "RESTful APIs", value: "15" },
    { label: "GraphQL", value: "16" },
    { label: "Git", value: "17" },
    { label: "Authentication (OAuth/JWT)", value: "18" },
    { label: "Microservices", value: "19" },
    { label: "Testing", value: "20" },
    { label: "Docker", value: "21" },
  ]);

  const [level, setLevel] = useState([
    { label: "beginner", value: "beginner" },
    { label: "intermediate", value: "intermediate" },
    { label: "advanced", value: "advanced" },
  ]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/my-profile");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`/api/users/addSkill`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Added skill:", response.data);
      //reset form
      setForm({
        proficiency_level: "",
        skill_id: "",
      });

      navigate("/my-profile");
    } catch (error) {
      console.log("Error adding the skill:", error.message);
    }
  };

  return (
    <div className="edit-profile-page">
      <BodyNavButton text="< back to my profile" clickFunction={handleClick} />

      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="skill_id">Choose a skill:</label>
        <select id="skill_id" name="skill_id" onChange={(e) => handleChange(e)}>
          <option value="" disabled selected>
            Choose a skill
          </option>
          {skills.map((skill) => {
            return (
              //create option for each category
              <option value={skill.value} key={skill.label}>
                {skill.label}
              </option>
            );
          })}
        </select>
        <label htmlFor="proficiency_level">
          Choose your proficiency level:
        </label>
        <select
          id="proficiency_level"
          name="proficiency_level"
          onChange={(e) => handleChange(e)}
        >
          <option value="" disabled selected>
            Choose your proficiency level
          </option>
          {level.map((level) => {
            return (
              //create option for each category
              <option value={level.value} key={level.label}>
                {level.label}
              </option>
            );
          })}
        </select>
        <button type="submit">Add Skill</button>
      </form>
    </div>
  );
};
