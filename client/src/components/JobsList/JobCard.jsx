import "./JobCard.css";

export const JobCard = ({ job }) => {
  const {
    jobTitle,
    jobCompany,
    jobLocation,
    jobDeadline,
    jobSkills,
    hasApplied,
  } = job;

  return (
    <div className="job-card-container">
      <div className="job-card job-title">{jobTitle}</div>
      <div className="job-card job-company">{jobCompany}</div>
      <div className="job-card job-location">{jobLocation}</div>
      <div className="job-card job-deadline">{jobDeadline}</div>
      <div className="job-card job-skills">{jobSkills}</div>
      <div className="job-card job-has-applied">{hasApplied}</div>
      <div className="job-card more-details">
        <button>MORE DETAILS</button>
      </div>
    </div>
  );
};
