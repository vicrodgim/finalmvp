import "./JobDetailsCard.css";

export const JobDetailsCard = ({
  jobTitle,
  jobCompany,
  jobLocation,
  locationType,
  jobDeadline,
  jobType,
  jobSkills,
  hasApplied,
  jobUrl,
  minSalary,
  maxSalary,
  jobDescription,
}) => {
  return (
    <div className="job-details-container">
      <div className="job-details">{jobTitle}</div>
      <div className="job-details">{jobCompany}</div>
      <div className="job-details">{jobLocation}</div>
      <div className="job-details">{locationType}</div>
      <div className="job-details">{jobDeadline}</div>
      <div className="job-details">{jobType}</div>
      <div className="job-details">{jobSkills}</div>
      <div className="job-details">{hasApplied}</div>
      <div className="job-details">{jobUrl}</div>
      <div className="job-details">
        {minSalary} - {maxSalary}
      </div>
      <div className="job-details">{jobDescription}</div>
    </div>
  );
};
