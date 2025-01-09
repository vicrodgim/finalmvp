import "./SkillCard.css";

export const SkillCard = ({ skill }) => {
  return (
    <div className="skill-card">
      <div className="skill-title">{skill.title}</div>
      <div className="skill-level">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#004e64"
        >
          <path d="M192-216h144v-312H192v312Zm216 0h144v-528H408v528Zm216 0h144v-240H624v240Zm-504 72v-456h216v-216h288v288h216v384H120Z" />
        </svg>
        {skill.proficiency_level}
      </div>

      <div className="skill-category">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#004e64"
        >
          <path d="M120-80v-280h120v-160h200v-80H320v-280h320v280H520v80h200v160h120v280H520v-280h120v-80H320v80h120v280H120Zm280-600h160v-120H400v120ZM200-160h160v-120H200v120Zm400 0h160v-120H600v120ZM480-680ZM360-280Zm240 0Z" />
        </svg>
        {skill.category}
      </div>
    </div>
  );
};
