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
  const [jobMatches, setJobMatches] = useState([]);

  // function to compare matching and missing skills
  const getJobMatches = (jobs, userSkillsTitles) => {
    return jobs.map((job) => {
      const jobSkillsTitles = job.skills.map((skill) => skill.skills_title);
      const total = jobSkillsTitles.length;
      const matched = jobSkillsTitles.filter((skill) =>
        userSkillsTitles.includes(skill)
      ).length;

      const match = Math.round((matched / total) * 100);
      const missing = 100 - match;

      return {
        title: job.jobs_title,
        match,
        missing,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsRes = await axios.get("http://localhost:4000/api/jobs", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        const skillsRes = await axios.get(
          "http://localhost:4000/api/users/skills",
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const jobs = jobsRes.data;
        const skills = skillsRes.data.skills;
        setJobs(jobs);
        setSkills(skills);
        const userSkillsTitles = skills.map((skill) => skill.title);
        console.log("jobs:", jobs);
        console.log("skills:", userSkillsTitles);
        const matches = getJobMatches(jobs, userSkillsTitles);
        console.log("Job matches:", matches);
        setJobMatches(matches);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: jobMatches.map((job) => job.title),
    datasets: [
      {
        label: "Skills you have",
        data: jobMatches.map((job) => job.match),
        backgroundColor: "#044c64",
        stack: "stack1",
        barThickness: 30,
      },
      {
        label: "Skills Missing",
        data: jobMatches.map((job) => job.missing),
        backgroundColor: "#d4d4d4",
        stack: "stack1",
        barThickness: 30,
      },
    ],
  };

  const options = {
    indexAxis: "y", // horizontal bars
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#004e64",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        text: "Skill Coverage by Job",
        color: "#004e64",
        font: {
          size: 13,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        max: 100,
        title: {
          display: true,
          text: "Total Required Skills (%)",
          color: "#004e64",
          font: {
            size: 13,
            weight: "bold",
          },
          padding: {
            top: 10,
          },
        },
        ticks: {
          color: "#004e64",
        },
        grid: {
          color: "#e5e5e5",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "#004e64",
        },
        grid: {
          color: "#f0f0f0",
        },
      },
    },
  };
  return <Bar options={options} data={data} />;
};
