import "./JobDetailsCard.css";
import { useParams } from "react-router-dom";
import { useState } from "react";

export default function JobDetailsCard({ job, onDeleteClick, onEditClick }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    jobs_title,
    company_name,
    location,
    location_type,
    date_range = "No date range available",
    type,
    skills = [],
    has_applied,
    url,
    min_salary,
    max_salary,
    description,
  } = job;

  console.log(job);

  const { id } = useParams();

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    setShowConfirmation(false);
    onDeleteClick();
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="job-details-container">
      <div className="job-details">
        <b>Job Title: </b>
        {jobs_title}
      </div>
      <div className="job-details">
        <b>Company Name:</b> {company_name}
      </div>
      <div className="job-details">
        <b>Location:</b>
        {location}
      </div>
      <div className="job-details">
        <b>Company Location type:</b>
        {location_type}
      </div>
      <div className="job-details">
        <b>Deadline :</b>
        {date_range || "No date range provided"}
      </div>
      <div className="job-details">
        <b>Hours:</b>
        {type}
      </div>
      <div className="job-details skills">
        <b>Skills required: </b>
        {skills.map((skill, index) => (
          <div className="job-skill" key={index}>
            {skill.title}
          </div>
        ))}
      </div>
      <div className="job-details">
        <b>Status:</b>
        {has_applied ? "applied" : "not applied"}
      </div>
      <div className="job-details">
        <b>URL: </b>
        <a href={url}>{url}</a>
      </div>
      <div className="job-details">
        <b>Salary:</b>
        {min_salary} - {max_salary}
      </div>
      <div className="job-details">
        <b>Description:</b>
        {description}
      </div>
      <div className="edit-delete">
        <button onClick={onEditClick} type="submit">
          EDIT
        </button>
        <button onClick={handleDeleteClick} type="submit">
          DELETE
        </button>
      </div>
      {showConfirmation && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete this job?</p>
            <div className="modal-buttons">
              <button className="confirm" onClick={confirmDelete}>
                Yes
              </button>
              <button className="cancel" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
