import { NavButton } from "./NavButton.jsx";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="app-name">APP NAME</h1>
      <NavButton title="MY JOBS" />
      <NavButton title="MY PROFILE" />
      <NavButton title="LEARN" />
    </nav>
  );
};
