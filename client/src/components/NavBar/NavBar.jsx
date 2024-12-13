import { NavButton } from "./NavButton.jsx";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <nav className="navbar">
      <h1 className="app-name">APP NAME</h1>
      <NavButton text="MY JOBS" />
      <NavButton text="MY PROFILE" />
      <NavButton text="LEARN" />
    </nav>
  );
};
