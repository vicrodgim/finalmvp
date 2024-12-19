import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JobDetailsCard from "./JobDetailsCard";
import "./JobDetail.css";

export default function JobDetail() {
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  //state for the dropdown selection for Update Job UI component
  const [status, setStatus] = useState("");

  const getJobDetail = async () => {
    try {
      setLoading(true);

      // make a fetch request to getJobById and pass the id of the job
      // '/api/jobs/${id}'
      const response = await fetch(`/api/jobs/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw Error("Failed to fetch job details");
      }
      // get the job detail
      const data = await response.json();
      setJobDetail(data);
    } catch (error) {
      setError("Failed to fetch job details. Please try again");
    }

    setLoading(false);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    console.log("Status changed to:", e.target.value);
  };

  const handleArchive = () => {
    console.log("Archiving job");
  };

  useEffect(() => {
    getJobDetail();
  }, [id]);

  return (
    <div className="job-detail-container">
      {jobDetail && <JobDetailsCard job={jobDetail} />}
      <h2>UPDATE JOB</h2>

      {/*dropdown menu for job status*/}
      <select value={status} onChange={handleStatusChange} className="dropdown">
        <option value="In Progress">In Progress</option>
        <option value="Interview">Interview</option>
        <option value="Offer Received">Offer Received</option>
        <option value="Rejected">Rejected</option>
      </select>
      {/* Archive button */}
      <button onClick={handleArchive} className="archiveButton">
        Archive
      </button>
    </div>
  );
}
