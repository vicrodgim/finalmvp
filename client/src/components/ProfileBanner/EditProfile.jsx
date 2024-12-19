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
    { label: "advanced", value: "advanced" },
    { label: "beginner", value: "beginner" },
    { label: "intermediate", value: "intermediate" },
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

      const response = await axios.post(
        "http://localhost:4000/api/users/addSkill",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added job:", response.data);
      //reset form
      setForm({
        /* title: "",
        company_name: "",
        location: "",
        location_type: "",
        description: "",
        type: "",
        date_range: "",
        min_salary: "",
        max_salary: "",
        has_applied: false,
        created_at: "",
        url: "", */
        skills: [],
      });
    } catch (error) {
      console.log("Error adding the job:", error.message);
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
      </form>
    </div>
  );
};
