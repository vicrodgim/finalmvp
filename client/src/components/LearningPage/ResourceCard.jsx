import "./ResourceCard.css";

export const ResourceCard = ({ r }) => {
  return (
    <div className="resource-card">
      <div className="r-title">
        <h4>{r.title}</h4>
      </div>
      <div className="r-type">{r.type}</div>
      <div className="r-discipline">{r.discipline}</div>
      <div className="r-skill">{r.skill_id}</div>
    </div>
  );
};
