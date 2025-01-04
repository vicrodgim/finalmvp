import "./JobsFilterMenu.css";

export const JobsFilterMenu = ({
  onFilterChange,
  selectedFilters,
  clearFilters,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    //pass filter key-value to parent (joblist)
    onFilterChange(name, value);
  };

  console.log("selected filters:", selectedFilters);
  return (
    <div className="jobs-filter-menu-container">
      <h3>FILTER MENU</h3>
      <div>
        <p className="filter-section-title">Location:</p>
        <label>
          <input
            type="text"
            name="location"
            placeholder="e.g., London"
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <p className="filter-section-title">Location Type:</p>
        <label className="r-label">
          <input
            type="radio"
            name="location_type"
            value="remote"
            checked={
              selectedFilters.key === "location_type" &&
              selectedFilters.value === "remote"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          remote
        </label>
        <label className="r-label">
          <input
            type="radio"
            name="location_type"
            value="hybrid"
            checked={
              selectedFilters.key === "location_type" &&
              selectedFilters.value === "hybrid"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          hybrid
        </label>
        <label className="r-label">
          <input
            type="radio"
            name="location_type"
            value="on-site"
            checked={
              selectedFilters.key === "location_type" &&
              selectedFilters.value === "on-site"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          on-site
        </label>
      </div>
      <div>
        <p className="filter-section-title">Application Status:</p>
        <label className="r-label">
          <input
            type="radio"
            name="has_applied"
            value="1"
            checked={
              selectedFilters.key === "has_applied" &&
              selectedFilters.value === "1"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          applied
        </label>
        <label className="r-label">
          <input
            type="radio"
            name="has_applied"
            value="0"
            checked={
              selectedFilters.key === "has_applied" &&
              selectedFilters.value === "0"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          not applied
        </label>
      </div>
      <div>
        <p className="filter-section-title">Job Type:</p>
        <label className="r-label">
          <input
            type="radio"
            name="type"
            value="full-time"
            checked={
              selectedFilters.key === "type" &&
              selectedFilters.value === "full-time"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          full-time
        </label>
        <label className="r-label">
          <input
            type="radio"
            name="type"
            value="part-time"
            checked={
              selectedFilters.key === "type" &&
              selectedFilters.value === "part-time"
            }
            onChange={handleChange}
            className="filter-radio"
          />
          part-time
        </label>
      </div>
      <div>
        <p className="filter-section-title">Company name:</p>
        <label className="r-label">
          <input
            type="text"
            name="company_name"
            placeholder="e.g., Codeop"
            onChange={handleChange}
          />
        </label>
      </div>
      <button onClick={clearFilters} className="clear-filter-btn">
        CLEAR
      </button>
    </div>
  );
};
