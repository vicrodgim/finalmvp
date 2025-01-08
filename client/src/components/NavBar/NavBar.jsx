import { NavButton } from "./NavButton.jsx";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import AuthContext from "../../context/AuthContext.js";

export const NavBar = () => {
  // consume context
  const auth = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    console.log("clicked");
    auth.logout();
    navigate("/login");
  };

  console.log("Auth status:", auth.isLoggedIn);

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <nav className="navbar">
      <Link to="/jobs" style={{ textDecoration: "none" }} className="app-name">
        <h1>DevSteps</h1>
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
          <NavButton text="RESOURCES" to="/learning-page" />
          <NavButton text="LOG OUT" onClick={logout} />
        </>
      )}
    </nav>
  );
};
