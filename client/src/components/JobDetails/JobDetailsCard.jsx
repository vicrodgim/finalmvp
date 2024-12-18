import "./JobDetailsCard.css";
import { useParams } from "react-router-dom";

export default function JobDetailsCard({ job }) {
  const {
    jobTitle,
    jobCompany,
    jobLocation,
    locationType,
    jobDeadline,
    jobType,
    jobSkills = [],
    hasApplied,
    jobUrl,
    minSalary,
    maxSalary,
    jobDescription,
  } = job;

  //EXTRACTS THE JOB ID FROM URL
  const { id } = useParams();

  return (
    <div className="job-details-container">
      <div className="job-details">{jobTitle}</div>
      <div className="job-details">{jobCompany}</div>
      <div className="job-details">{jobLocation}</div>
      <div className="job-details">{locationType}</div>
      <div className="job-details">{jobDeadline}</div>
      <div className="job-details">{jobType}</div>
      {/* skills is an array in the job object so might need to use the map method here to display all skills for each job */}
      <div className="job-details">{jobSkills}</div>
      <div className="job-details">{hasApplied}</div>
      <div className="job-details">{jobUrl}</div>
      <div className="job-details">
        {minSalary} - {maxSalary}
      </div>
      <div className="job-details">{jobDescription}</div>
    </div>
  );
}
