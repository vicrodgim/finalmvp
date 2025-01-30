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
        <div>
          <label className="r-label-discipline"> FRONTEND</label>
          <select
            name="skills_title"
            value={
              selectedFilters.key === "skills_title" && selectedFilters.value
            }
            onChange={handleChange}
            className="filter-dropwdown"
          >
            <option value=""> Select a skill</option>
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Vue.js">Vue.js</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Bootstrap">Bootstrap</option>
          </select>
        </div>
        <div>
          <label className="r-label-discipline"> BACKEND</label>
          <select
            name="skills_title"
            value={
              selectedFilters.key === "skills_title" && selectedFilters.value
            }
            onChange={handleChange}
            className="filter-dropwdown"
          >
            <option value=""> Select a skill</option>
            <option value="Node.js">Node.js</option>
            <option value="Express.js">Express.js</option>
            <option value="Python">Python</option>
            <option value="Django">Django</option>
            <option value="Java">Java</option>
            <option value="Spring Boot">Spring Boot</option>
            <option value="MySQL">MySQL</option>
          </select>
        </div>
        <div>
          <label className="r-label-discipline">FULLSTACK</label>
          <select
            name="skills_title"
            value={
              selectedFilters.key === "skills_title" && selectedFilters.value
            }
            onChange={handleChange}
            className="filter-dropwdown"
          >
            <option value=""> Select a skill</option>
            <option value="RESTful APIs">RESTful APIs</option>
            <option value="GraphQL">GraphQL</option>
            <option value="Git">Git</option>
            <option value="Authentication (OAuth/JWT)">(OAuth/JWT)</option>
            <option value="Microservices">Microservices</option>
            <option value="Testing (e.g., Jest/Mocha)">Testing</option>
            <option value="Docker">Docker</option>
          </select>
        </div>
        <div>
          <label className="r-label-discipline">TYPE OF CONTENT </label>
          <label className="r-label">
            <input
              type="radio"
              name="type"
              value="course"
              checked={
                selectedFilters.key === "type" &&
                selectedFilters.value === "course"
              }
              onChange={handleChange}
              className="filter-radio"
            />
            course
          </label>
        </div>
        <div>
          <label className="r-label">
            <input
              type="radio"
              name="type"
              value="tutorial"
              checked={
                selectedFilters.key === "type" &&
                selectedFilters.value === "tutorial"
              }
              onChange={handleChange}
              className="filter-radio"
            />
            tutorial
          </label>
        </div>
        <div>
          <label className="r-label">
            <input
              type="radio"
              name="type"
              value="book"
              checked={
                selectedFilters.key === "type" &&
                selectedFilters.value === "book"
              }
              onChange={handleChange}
              className="filter-radio"
            />
            book
          </label>
        </div>
      </div>

      <button onClick={clearFilters} className="clear-filter-btn">
        CLEAR
      </button>
    </div>
  );
};
