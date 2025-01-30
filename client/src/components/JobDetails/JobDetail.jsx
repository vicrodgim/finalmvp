import BodyNavButton from "../../elements/BodyNavButton";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import JobDetailsCard from "./JobDetailsCard";
import { UpdateJobForm } from "./UpdateJobForm";
import "./JobDetail.css";

export default function JobDetail() {
  const [jobDetail, setJobDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/jobs");
  };

  const getJobDetail = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/jobs/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw Error("Failed to fetch job details");
      }
      const data = await response.json();
      setJobDetail(data);
    } catch (error) {
      setError("Failed to fetch job details. Please try again");
    }

    setLoading(false);
  };

  useEffect(() => {
    getJobDetail();
  }, [id]);

  return (
    <div className="job-details-page">
      <BodyNavButton text="< back to all jobs" clickFunction={handleClick} />
      <div className="job-detail-container">
        {jobDetail && <JobDetailsCard job={jobDetail} />}

        <UpdateJobForm jobId={id} onUpdate={getJobDetail} />
      </div>
    </div>
  );
}
