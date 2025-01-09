import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.js";

import "./HomePage.css";

const HomePage = (/* { isLoggedIn } */) => {
  const navigate = useNavigate();

  //Context consume
  const auth = useContext(AuthContext); // auth = {isLoggedIn, login, logout}

  return (
    <div className="homepage">
      <div className="homepage-box">
        <h1>DevSteps</h1>
        <p>
          DevSteps is a job tracking and learning platform tailored for coding
          bootcamp graduates. It streamlines the job search process by helping
          you efficiently organize opportunities, track applications, and work
          toward securing your first developer role.
        </p>
        <p>
          Alongside job tracking, DevSteps provides learning resources to
          enhance coding skills, ensuring that you stay competitive and continue
          growing your skills throughout their job hunt.
        </p>
        <div className="hmpg-nav-buttons">
          {!auth.isLoggedIn ? (
            <button className="nav-button" onClick={() => navigate("/login")}>
              LOG IN
            </button>
          ) : (
            <button
              className="nav-button"
              onClick={() => navigate("/my-profile")}
            >
              MY PROFILE
            </button>
          )}

          {!auth.isLoggedIn ? (
            <button
              className="nav-button"
              onClick={() => navigate("/register")}
            >
              REGISTER
            </button>
          ) : (
            <button className="nav-button" onClick={auth.logout}>
              LOG OUT
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
