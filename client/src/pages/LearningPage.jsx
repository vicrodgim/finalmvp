import { useState } from "react";
import { ResourceCard } from "../components/LearningPage/ResourceCard";
import { ResourcesFilterMenu } from "../components/FilterMenus/ResourcesFilterMenu";
import "./LearningPage.css";

export const LearningPage = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "HTML, CSS, JavaScript, React, and Node.js from Zero to Expert",
      url: "https://www.udemy.com/course/html-css-javascript-reactjs-nodejs-from-zero-to-expert/",
      type: "course",
      discipline: "frontend",
      skill_id: 1,
    },
    {
      id: 2,
      title: "HTML Tutorial by W3Schools",
      url: "https://www.w3schools.com/html/",
      type: "tutorial",
      discipline: "frontend",
      skill_id: 1,
    },
    {
      id: 3,
      title: "Design and Develop a Killer Website with HTML5 and CSS3",
      url: "https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/",
      type: "course",
      discipline: "frontend",
      skill_id: 2,
    },
  ]);
  return (
    <div className="learning-page">
      <ResourcesFilterMenu />
      <div className="resources-container">
        <h2>LEARNING PAGE</h2>
        <div className="resources-list">
          {resources.map((r) => (
            <ResourceCard r={r} key={r.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
