import axios from "axios";
import { useState, useEffect } from "react";
import { ResourceCard } from "../components/LearningPage/ResourceCard";
import { ResourcesFilterMenu } from "../components/FilterMenus/ResourcesFilterMenu";
import "./LearningPage.css";

export const LearningPage = () => {
  const [resources, setResources] = useState([]);
  const [filters, setFilters] = useState({});

  const handleFilterChange = (key, value) => {
    setFilters({ key, value });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const fetchResources = async () => {
    try {
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
      console.error(error);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [filters]);

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
