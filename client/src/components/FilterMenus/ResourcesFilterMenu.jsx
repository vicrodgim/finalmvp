import "./ResourcesFilterMenu.css";

export const ResourcesFilterMenu = ({
  onFilterChange,
  selectedFilters,
  clearFilters,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter-menu-container">
      <h3>FILTER MENU</h3>
      <div>
        <label className="r-label-discipline">
          <input
            type="radio"
            name="discipline"
            value="frontend"
            checked={
              selectedFilters.key === "discipline" &&
              selectedFilters.value === "frontend"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          FRONTEND
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="HTML"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "HTML"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          HTML
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="CSS"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "CSS"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          CSS
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="JavaScript"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "JavaScript"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          JavaScript
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="React"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "React"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          React
        </label>
      </div>
      <div>
        <label className="r-label-discipline">
          <input
            type="radio"
            name="discipline"
            value="backend"
            checked={
              selectedFilters.key === "discipline" &&
              selectedFilters.value === "backend"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          BACKEND
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="Express.js"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "Express.js"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          Express.js
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="Node.js"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "Node.js"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          Node.js
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="Python"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "Phython"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          Python
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="MySQL"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "MySQL"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          MySQL
        </label>
      </div>
      <div>
        <label className="r-label-discipline">
          <input
            type="radio"
            name="discipline"
            value="fullstack"
            checked={
              selectedFilters.key === "discipline" &&
              selectedFilters.value === "fullstack"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          FULLSTACK
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="Git"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "Git"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          Git
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="Authentication (OAuth/JWT)"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "Authentication (OAuth/JWT)"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          OAuth/JWT
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="RESTful APIs"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "RESTful APIs"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          RESTful APIs
        </label>
      </div>
      <div>
        <label className="r-label">
          <input
            type="radio"
            name="skills_title"
            value="Microservices"
            checked={
              selectedFilters.key === "skills_title" &&
              selectedFilters.value === "Microservices"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          Microservices
        </label>
      </div>
      <button onClick={clearFilters} className="clear-filter-btn">
        CLEAR
      </button>
    </div>
  );
};
