import { useState } from "react";
import { JobCard } from "./JobCard";
import "./JobsList.css";

export const JobsList = () => {
  //variable to store all items
  const [jobs, setJobs] = useState([]);

  //function to fetch all jobs and set result to 'jobs' array
  const fetchJobs = async () => {
    try {
      //communcate with databasa
      let response = await axios.get("/api/jobs/");
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
      {jobs.map((jobs) => {
        return <JobCard key={job.id} job={job} />;
      })}
    </div>
  );
};
