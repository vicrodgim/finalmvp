import "./SkillCard.css";

export const SkillCard = ({ skill }) => {
  return (
    <div className="skill-card">
      <div className="skill-title">
        <b>{skill.title}</b>
      </div>
      <div className="skill-level">{skill.proficiency_level}</div>
      <div className="skill-category">{skill.category}</div>
    </div>
  );
};
