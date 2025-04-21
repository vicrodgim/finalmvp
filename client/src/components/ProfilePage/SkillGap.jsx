import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SkillGap = () => {
  const [jobs, setJobs] = useState([]);
  const [skills, setSkills] = useState([]);

  const fetchUserSkills = async () => {
    try {
      let response = await axios.get("/api/users/skills", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setSkills(response.data.skills);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchJobs = async () => {
    try {
      let response = await axios.get("/api/jobs", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserSkills();
    fetchJobs();
  }, []);

  const userSkillsTitles = skills.map((skill) => skill.title);

  const getJobMatches = (jobs, userSkillsTitles) => {
    return jobs.map((job) => {
      const total = job.skills.length;
      const matched = job.skills.filter((skill) =>
        userSkillsTitles.includes(skill)
      );
    });
  };

  const jobMatches = [
    { title: "Frontend Dev", match: 20, missing: 80 },
    { title: "Backend Dev", match: 40, missing: 60 },
    { title: "Junior Dev", match: 90, missing: 10 },
  ];

  const data = {
    labels: jobMatches.map((job) => job.title),
    datasets: [
      {
        label: "Skills you have",
        data: jobMatches.map((job) => job.match),
        backgroundColor: "#4ade80",
        stack: "stack1",
      },
      {
        label: "Skills Missing",
        data: jobMatches.map((job) => job.missing),
        backgroundColor: "#d4d4d4",
        stack: "stack1",
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Skill Coverage by Job",
      },
      scales: {
        x: {
          max: 100,
          stacked: true,
          title: {
            display: true,
            text: "Total Required Skills (%)",
          },
        },
        y: {
          stacked: true,
        },
      },
    },
  };
  return <Bar options={options} data={data} />;
};
