import "./ResourceCard.css";

export const ResourceCard = ({ r }) => {
  return (
    <a href={r.url} target="_blank">
      <div className="resource-card">
        <div className="r-top-container">
          <div
            className={
              r.type === "course"
                ? "r-type course"
                : r.type === "tutorial"
                ? "r-type tutorial"
                : "r-type book"
            }
          >
            <b>{r.type}</b>
          </div>
          <div className="r-title">{r.resource_title}</div>
        </div>
        <div className="r-bottom-container">
          <div className="r-skills">
            {r.skills.map((skill, index) => (
              <div className="skill-badge" key={index}>
                {skill.skills_title}
              </div>
            ))}
          </div>
          <div className="r-discipline">{r.discipline}</div>
        </div>
      </div>
    </a>
  );
};
