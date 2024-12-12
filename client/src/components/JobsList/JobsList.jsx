import { JobCard } from "./JobCard";
import "./JobsList.css";

export const JobsList = () => {
  return (
    <div className="job-list-container">
      <JobCard
        jobTitle="JOB TITLE"
        jobLocation="JON LOCATION"
        jobCompany="JOB COMPANY"
        jobDeadline="JOB DEADLINE"
        jobSkills="JOB SKILLS"
        hasApplied="HAS APPLIED"
      />
    </div>
  );
};
