import "./UpdateJobForm.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../../App.css";

export const UpdateJobForm = ({ jobId, onUpdate }) => {
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      //Send delete request to remove job
      if (status === "DELETE") {
        const response = await axios.delete(`/api/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Job deleted successfully:", response.data);
        alert("Job was deleted successfully");
        //redirect to the job list page
        navigate("/jobs");
      } else {
        const has_applied = status === "true" ? 1 : 0;
        const response = await axios.put(
          `/api/jobs/${jobId}/has_applied`,
          { has_applied },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Job application was updated successfully:", response.data);
        alert("job application was updated successfully");
        //refresh the page once it's been submitted
        onUpdate();
      }
    } catch (error) {
      console.error("Error updating job application:", error);
      alert("Failed to update job application, please try again.");
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h3>UPDATE JOB</h3>

        <select value={status} onChange={handleStatusChange}>
          <option value="" disabled selected>
            change status to...
          </option>
          <option value="true">APPLIED</option>
          <option value="false">NOT APPLIED</option>
          <option value="DELETE">DELETE</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
