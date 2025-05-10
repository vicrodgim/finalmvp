import { useSkillMatches } from "./useSkillMatches";
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
  const { jobMatches } = useSkillMatches();

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
        display: false,
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
