import "./JobCard.css";
import { useNavigate } from "react-router-dom";

export const JobCard = ({ job }) => {
  const {
    jobs_id,
    jobs_title,
    company_name,
    location,
    date_range,
    skills,
    has_applied,
  } = job;

  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/jobs/${jobs_id}`);
  };

  return (
    <div className="job-card-container">
      <div className="job-card job-title">{jobs_title}</div>
      <div className="job-card job-company">{company_name}</div>
      <div className="job-card job-location">{location}</div>
      <div className="job-card job-deadline">{date_range}</div>
      {/* <div className="job-card job-skills">{skills}</div> */}
      <div className="job-card job-has-applied">{has_applied}</div>
      <div className="job-card more-details">
        <button onClick={handleDetailsClick}>MORE DETAILS</button>
      </div>
    </div>
  );
};
