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

  // Check if the current location matches the `to` prop
  const isActive = location.pathname === to;

  return (
    <button
      className={`nav-button ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
