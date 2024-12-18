import { NavButton } from "./NavButton.jsx";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import "./NavBar.css";
import AuthContext from "../../context/AuthContext.js";

export const NavBar = () => {
  // consume context
  const auth = useContext(AuthContext);
  const location = useLocation();

  const logout = () => {
    console.log("clicked");
    auth.logout();
  };

  console.log("Auth status:", auth.isLoggedIn);

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="app-name">APP NAME</h1>
      </Link>
      {isLoginPage && !auth.isLoggedIn && (
        <NavButton text="REGISTER" to="/register" />
      )}
      {isRegisterPage && !auth.isLoggedIn && (
        <NavButton text="LOG IN" to="/login" />
      )}
      {!auth.isLoggedIn && !isRegisterPage && !isLoginPage && (
        <>
          <NavButton text="REGISTER" to="/register" />
          <NavButton text="LOG IN" to="/login" />
        </>
      )}
      {!isLoginPage && !isRegisterPage && auth.isLoggedIn && (
        <>
          <NavButton text="MY JOBS" to="/jobs" />
          <NavButton text="MY PROFILE" to="/my-profile" />
          <NavButton text="LEARN" to="/learning-page" />
          <NavButton text="LOG OUT" onClick={logout} />
        </>
      )}
    </nav>
  );
};
