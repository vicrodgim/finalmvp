import "./JobDetailsCard.css";
import { useParams } from "react-router-dom";

export default function JobDetailsCard({ job }) {
  const {
    jobs_title,
    company_name,
    location,
    location_type,
    date_range,
    type,
    skills = [],
    has_applied,
    url,
    min_salary,
    max_salary,
    description,
  } = job;

  //EXTRACTS THE JOB ID FROM URL
  const { id } = useParams();

  return (
    <div className="job-details-container">
      <div className="job-details">{jobs_title}</div>
      <div className="job-details">{company_name}</div>
      <div className="job-details">{location}</div>
      <div className="job-details">{location_type}</div>
      <div className="job-details">{date_range}</div>
      <div className="job-details">{type}</div>

      {skills.map((skill, index) => (
        <div className="job-details" key={index}>
          {skill.title}
        </div>
      ))}

      {/* skills is an array in the job object so might need to use the map method here to display all skills for each job */}
      <div className="job-details">
        {has_applied ? "applied" : "not applied"}
      </div>
      <div className="job-details">{url}</div>
      <div className="job-details">
        {min_salary} - {max_salary}
      </div>
      <div className="job-details">{description}</div>
    </div>
  );
}
