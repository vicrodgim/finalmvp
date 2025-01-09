import "./JobDetailsCard.css";
import { useParams } from "react-router-dom";

export default function JobDetailsCard({ job }) {
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

  console.log(job); //check to see if date_range exists

  //slice the date_range if it exists
  const trimmedDateRange = date_range
    ? date_range.slice(0, 10)
    : "No date range provided";

  //EXTRACTS THE JOB ID FROM URL
  const { id } = useParams();

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
        {trimmedDateRange}
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
    </div>
  );
}
