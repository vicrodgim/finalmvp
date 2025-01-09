import "./JobCard.css";
import { useNavigate } from "react-router-dom";

export const JobCard = ({ job }) => {
  const {
    jobs_id,
    jobs_title,
    company_name,
    location,
    date_range = "No date range available",
    skills = [],
    has_applied,
  } = job;

  const navigate = useNavigate();

  //slice the date_range if it exists
  const trimmedDateRange = date_range
    ? date_range.slice(0, 10)
    : "No date range provided";

  console.log(trimmedDateRange);

  const handleDetailsClick = () => {
    navigate(`/jobs/${jobs_id}`);
  };

  return (
    <div className="job-card-container">
      <div className="job-card job-title">
        {jobs_title}
        <span className="vl"></span>
      </div>
      <div className="job-card job-company">
        {company_name}
        <span className="vl"></span>
      </div>
      <div className="job-card job-location">
        {location}
        <span className="vl"></span>
      </div>
      <div className="job-card job-deadline">
        {trimmedDateRange}
        <span className="vl"></span>
      </div>
      <div className="job-card job-skills">
        {skills.map((skill, index) => (
          <div className="job-card skill" key={index}>
            {skill.skills_title}
          </div>
        ))}
      </div>
      <div className="job-card job-has-applied">
        <span className="vl"></span>
        {has_applied ? "applied" : "not applied"}
      </div>
      <div className="job-card more-details">
        <span className="vl"></span>
        <button onClick={handleDetailsClick}>MORE DETAILS</button>
      </div>
    </div>
  );
};
