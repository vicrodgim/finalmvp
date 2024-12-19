import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavButton.css";

export const NavButton = ({ text, to, onClick }) => {
  const navigate = useNavigate();

  //handle button click
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    }
  };

  return (
    <button className="nav-button" onClick={handleClick}>
      {text}
    </button>
  );
};
