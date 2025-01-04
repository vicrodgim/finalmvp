import "./ResourceCard.css";

export const ResourceCard = ({ r }) => {
  return (
    <div className="resource-card">
      <a href={r.url} target="_blank">
        <div className="r-type">{r.type}</div>
        <div className="r-title">
          <h4>{r.resource_title}</h4>
        </div>
        <div className="r-type">{r.type}</div>

        <div className="r-discipline">{r.discipline}</div>
        <div className="r-skill">
          {r.skills.map((skill, index) => (
            <div key={index}>{skill.skills_title}</div>
          ))}
        </div>
      </a>
    </div>
  );
};
