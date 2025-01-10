import React, { useState } from "react";
import axios from "axios";
import BodyNavButton from "../../elements/BodyNavButton";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./AddJobForm.css";

const AddJobForm = () => {
  const [form, setForm] = useState({
    title: "",
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
    url: "",
    skills: [],
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/jobs");
  };

  //handle text and select inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //handle checkbox inputs
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
  };

  //handle primereact multiselect
  const handleSkillsChange = (event) => {
    setForm((prev) => ({ ...prev, skills: event.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4000/api/jobs",
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
        title: "",
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
        url: "",
        skills: [],
      });
      navigate("/jobs");
    } catch (error) {
      console.log("Error adding the job:", error.message);
    }
  };

  return (
    <div className="add-job-page">
      <BodyNavButton text="< back to all jobs" clickFunction={handleClick} />
      <div className="add-job-form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>ADD NEW JOB</h2>
          <div className="form-content">
            <div className="column">
              <label htmlFor="title">
                * Job Title:
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="company_name">
                * Company Name:
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={form.company_name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label htmlFor="location">
                * Location:
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </label>
              <label htmlFor="location_type">
                Location Type:
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="location_type"
                      value="on-site"
                      checked={form.location_type === "on-site"}
                      onChange={handleChange}
                    />
                    On-site
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="location_type"
                      value="remote"
                      checked={form.location_type === "remote"}
                      onChange={handleChange}
                    />
                    Remote
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="location_type"
                      value="hybrid"
                      checked={form.location_type === "hybrid"}
                      onChange={handleChange}
                    />
                    Hybrid
                  </label>
                </div>
              </label>

              <label htmlFor="type">
                Job Type:
                <div className="radio-buttons">
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="full-time"
                      checked={form.type === "full-time"}
                      onChange={handleChange}
                    />
                    Full-time
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="type"
                      value="part-time"
                      checked={form.type === "part-time"}
                      onChange={handleChange}
                    />
                    Part-time
                  </label>
                </div>
              </label>

              <label htmlFor="date_range">
                Application Deadline:
                <input
                  type="date"
                  id="date_range"
                  name="date_range"
                  value={form.date_range}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="min_salary">
                Minimum Salary:
                <input
                  type="text"
                  id="min_salary"
                  name="min_salary"
                  value={form.min_salary}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="max_salary">
                Maximum Salary:
                <input
                  type="text"
                  id="max_salary"
                  name="max_salary"
                  value={form.max_salary}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="column">
              <label htmlFor="description">
                * Decription:
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </label>

              <label htmlFor="created_at">
                Job created on:
                <input
                  type="date"
                  id="created_at"
                  name="created_at"
                  value={form.created_at}
                  onChange={handleChange}
                />
              </label>

              <label htmlFor="url">
                * Job URL:
                <input
                  placeholder="URL"
                  type="url"
                  id="url"
                  name="url"
                  value={form.url}
                  onChange={handleChange}
                  required
                />
              </label>

              <label htmlFor="skills">
                {" "}
                What skills are required?
                <MultiSelect
                  id="skills"
                  name="skills"
                  value={form.skills}
                  onChange={handleSkillsChange}
                  options={[
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
                  ]}
                  placeholder="Select required skills"
                  display="chip"
                />
              </label>
              <label htmlFor="has_applied">
                Have you applied yet?
                <input
                  type="checkbox"
                  id="has_applied"
                  name="has_applied"
                  checked={form.has_applied}
                  onChange={handleCheckboxChange}
                />
              </label>
            </div>
          </div>
          <button type="submit">ADD JOB</button>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;
