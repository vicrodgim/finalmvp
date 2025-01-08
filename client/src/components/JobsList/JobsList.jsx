import { useState, useEffect } from "react";
import { JobCard } from "./JobCard";
import BodyNavButton from "../../elements/BodyNavButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobsList.css";
import { JobsFilterMenu } from "../FilterMenus/JobsFilterMenu";

const JobsList = () => {
  //variable to store all items
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({});

  const noJobs = jobs.length === 0;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/add-jobs");
  };

  const handleFilterChange = (key, value) => {
    setFilters({ key, value });
  };

  const clearFilters = () => {
    setFilters({});
  };

  //function to fetch all jobs and set result to 'jobs' array
  const fetchJobs = async () => {
    try {
      //communicate with databasa
      const { key, value } = filters;
      const query = key && value ? `key=${key}&value=${value}` : "";

      console.log("Query:", query);

      let response = await axios.get(
        `http://localhost:4000/api/jobs?${query}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setJobs(response.data);
    } catch (error) {
      // handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    //call fetchItems function
    fetchJobs();
  }, [filters]); //re-fetch when filters change

  return (
    <div className="job-list-page">
      <JobsFilterMenu
        onFilterChange={handleFilterChange}
        selectedFilters={filters}
        clearFilters={clearFilters}
      />
      <div className="jobs-container">
        <h2> MY JOBS</h2>
        <BodyNavButton text="Add a new job" clickFunction={handleClick} />
        {noJobs ? (
          <p className="no-items alert">
            Sorry, you have no jobs to display. Why not add one now?
          </p>
        ) : (
          <div className="job-list-container">
            <div className="job-card-container header">
              <div className="job-card job-title">
                Job Title<span className="vl-dark"></span>
              </div>
              <span className="vl-dark"></span>
              <div className="job-card job-company">
                Company Name
                <span className="vl-dark"></span>
              </div>
              <div className="job-card job-location">
                Location<span className="vl-dark"></span>
              </div>
              <div className="job-card job-deadline">
                Deadline<span className="vl-dark"></span>
              </div>
              <div className="job-card job-skills">Skills Required</div>
              <div className="job-card job-has-applied">
                <span className="vl-dark"></span>Status
              </div>
              <div className="job-card more-details">
                <span className="vl-dark"></span>
                <button className="fake-button">MORE DETAILS</button>
              </div>
            </div>
            {jobs.map((job) => {
              return <JobCard key={job.jobs_id} job={job} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
