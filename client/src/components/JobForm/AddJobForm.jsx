import React, { useState } from "react";
import axios from "axios";
import BodyNavButton from "../../elements/BodyNavButton";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../../App.css";

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
    } catch (error) {
      console.log("Error adding the job:", error.message);
    }
  };

  return (
    <>
      <BodyNavButton text="< back to all jobs" />
      <form className="form" onSubmit={handleSubmit}>
        <h3>Add New Job</h3>

        <label htmlFor="title">Job Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="company_name">Company name:</label>
        <input
          type="text"
          id="company_name"
          name="company_name"
          value={form.company_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <label htmlFor="location_type">Location Type:</label>
        <input
          type="text"
          id="location-type"
          name="location_type"
          value={form.location_type}
          onChange={handleChange}
          placeholder="e.g., on-site, remote or hybrid"
        />
        <label htmlFor="description">Decription:</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="type">Job Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="e.g., full-time or part-time"
          required
        />
        <label htmlFor="date_range">Application Deadline:</label>
        <input
          type="date"
          id="date_range"
          name="date_range"
          value={form.date_range}
          onChange={handleChange}
        />
        <label htmlFor="min_salary">Minimum Salary:</label>
        <input
          type="text"
          id="min_salary"
          name="min_salary"
          value={form.min_salary}
          onChange={handleChange}
        />
        <label htmlFor="max_salary">Maximum Salary:</label>
        <input
          type="text"
          id="max_salary"
          name="max_salary"
          value={form.max_salary}
          onChange={handleChange}
        />
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
        <label htmlFor="created_at">Job created at:</label>
        <input
          type="date"
          id="created_at"
          name="created_at"
          value={form.created_at}
          onChange={handleChange}
        />
        <label htmlFor="url">Job URL:</label>
        <input
          type="url"
          id="url"
          name="url"
          value={form.url}
          onChange={handleChange}
          required
        />
        <label htmlFor="skills"> What skills are required?</label>
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
        <button type="submit">Add Job</button>
      </form>
    </>
  );
};

export default AddJobForm;
