import "./SkillCard.css";

export const SkillCard = ({ skill }) => {
  return (
    <div className="skill-card">
      <div className="skill-title">{skill.title}</div>
      <div className="skill-level">{skill.proficiency_level}</div>
      <div className="skill-category">{skill.category}</div>
    </div>
  );
};
