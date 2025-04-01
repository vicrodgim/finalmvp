import axios from "axios";
import { useState, useEffect } from "react";
import { ResourceCard } from "../components/LearningPage/ResourceCard";
import { ResourcesFilterMenu } from "../components/FilterMenus/ResourcesFilterMenu";
import { RecommendedResources } from "../components/LearningPage/RecommendedResources";
import "./LearningPage.css";

export const LearningPage = () => {
  //variable to store resources
  const [resources, setResources] = useState([]);

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
        <div className="recommended">
          <RecommendedResources resources={resources} />
        </div>
        <div className="resources-list">
          {resources.map((r) => (
            <ResourceCard r={r} key={r.resource_id} />
          ))}
        </div>
      </div>
    </div>
  );
};
