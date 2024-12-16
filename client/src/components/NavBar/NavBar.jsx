import { NavButton } from "./NavButton.jsx";
import { useContext } from "react";
import "./NavBar.css";
import AuthContext from "../../context/AuthContext.js";

export const NavBar = () => {
  // consume context
  const auth = useContext(AuthContext);

  const logout = () => {
    console.log("clicked");
    auth.logout();
  };
  return (
    <nav className="navbar">
      <h1 className="app-name">APP NAME</h1>
      {auth.isLoggedIn && <NavButton text="MY JOBS" />}
      {auth.isLoggedIn && <NavButton text="MY PROFILE" />}
      <NavButton text="LEARN" />
      {!auth.isLoggedIn && <NavButton text="REGISTER" />}
      {auth.isLoggedIn && <NavButton text="LOG OUT" onClick={logout} />}
    </nav>
  );
};
