import axios from "axios";
import { useState, useEffect } from "react";
import { ResourceCard } from "../components/LearningPage/ResourceCard";
import { ResourcesFilterMenu } from "../components/FilterMenus/ResourcesFilterMenu";
import "./LearningPage.css";

export const LearningPage = () => {
  //variable to store resources
  const [resources, setResources] = useState([
    /* 
    {
      id: 1,
      title: "HTML, CSS, JavaScript, React, and Node.js from Zero to Expert",
      url: "https://www.udemy.com/course/html-css-javascript-reactjs-nodejs-from-zero-to-expert/",
      type: "course",
      discipline: "frontend",
      skill_id: 1,
    },
    {
      id: 2,
      title: "HTML Tutorial by W3Schools",
      url: "https://www.w3schools.com/html/",
      type: "tutorial",
      discipline: "frontend",
      skill_id: 1,
    },
    {
      id: 3,
      title: "Design and Develop a Killer Website with HTML5 and CSS3",
      url: "https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/",
      type: "course",
      discipline: "frontend",
      skill_id: 2,
    }, */
  ]);

  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters({ key, value });
  };

  const clearFilters = () => {
    setFilters({});
  };

  //function to fetch all resources info and set result to 'resources' array. Returns...
  const fetchResources = async () => {
    try {
      //communicate with database
      const { key, value } = filters;
      const query = key && value ? `key=${key}&value=${value}` : "";
      let response = await axios.get(
        `http://localhost:4000/api/resources?${query}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setResources(response.data);
    } catch (error) {
      //handle errors
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [filters]); //re-fetch when filters change

  return (
    <div className="learning-page">
      <ResourcesFilterMenu
        onFilterChange={handleFilterChange}
        selectedFilters={filters}
        clearFilters={clearFilters}
      />
      <div className="resources-container">
        <h2>LEARNING PAGE</h2>
        <div className="resources-list">
          {resources.map((r) => (
            <ResourceCard r={r} key={r.resource_id} />
          ))}
        </div>
      </div>
    </div>
  );
};
