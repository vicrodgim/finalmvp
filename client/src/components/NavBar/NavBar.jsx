import { NavButton } from "./NavButton.jsx";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links" id="app-name">
        APP NAME
      </div>
      <NavButton title="MY JOBS" />
      <NavButton title="MY PROFILE" />
      <NavButton title="LEARN" />
    </nav>
  );
};
