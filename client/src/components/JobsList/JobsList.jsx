import { useState, useEffect } from "react";
import { JobCard } from "./JobCard";
import axios from "axios";
import "./JobsList.css";

const JobsList = () => {
  //variable to store all items
  const [jobs, setJobs] = useState([]);

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
    <div className="job-list-container">
      {jobs.map((job) => {
        return <JobCard key={job.jobs_id} job={job} />;
      })}
    </div>
  );
};

export default JobsList;
