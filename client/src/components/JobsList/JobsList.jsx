import { useState, useEffect } from "react";
import { JobCard } from "./JobCard";
import BodyNavButton from "../../elements/BodyNavButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobsList.css";

const JobsList = () => {
  //variable to store all items
  const [jobs, setJobs] = useState([]);

  const noJobs = jobs.length === 0;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-jobs");
  };

  //function to fetch all jobs and set result to 'jobs' array
  const fetchJobs = async () => {
    try {
      //communcate with databasa
      let response = await axios.get("http://localhost:4000/api/jobs/", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setJobs(response.data);
    } catch (error) {
      // handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    //call fetchItems function
    fetchJobs();
  }, []);

  return (
    <div className="job-list-page">
      <BodyNavButton text="Add a new job" clickFunction={handleClick} />
      {noJobs ? (
        <p className="no-items alert">
          Sorry, you have no jobs to display. Why not add one now?
        </p>
      ) : (
        <div className="job-list-container">
          {jobs.map((job) => {
            return <JobCard key={job.jobs_id} job={job} />;
          })}
        </div>
      )}
    </div>
  );
};

export default JobsList;
