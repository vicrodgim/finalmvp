import { NavButton } from "./NavButton.jsx";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
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
      <h1 className="app-name">APP NAME</h1>
      {isLoginPage && !auth.isLoggedIn && (
        <NavButton text="REGISTER" to="/register" />
      )}
      {isRegisterPage && !auth.isLoggedIn && (
        <NavButton text="LOG IN" to="/login" />
      )}

      {!isLoginPage && !isRegisterPage && (
        <>
          <NavButton text="HOME PAGE" to="/" />
          {auth.isLoggedIn && <NavButton text="MY JOBS" to="/my-jobs" />}
          {auth.isLoggedIn && <NavButton text="MY PROFILE" to="/my-profile" />}
          {auth.isLoggedIn && <NavButton text="LEARN" to="/learning-page" />}
          {auth.isLoggedIn && <NavButton text="LOG OUT" onClick={logout} />}
        </>
      )}
    </nav>
  );
};
