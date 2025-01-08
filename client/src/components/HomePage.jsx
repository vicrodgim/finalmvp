import { useNavigate } from "react-router-dom";

import "./HomePage.css";

const HomePage = ({ isLoggedIn }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
    /* {
      !isLoggedIn ? navigate("/login") : navigate("/jobs");
    } */
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="homepage">
      <div className="homepage-box">
        <h1>DevSteps</h1>
        <p>
          DevSteps provides practical tools and resources for new developers to
          become job-ready and confidently navigate the tech industry.
        </p>
        <div className="hmpg-nav-buttons">
          <button className="nav-button" onClick={handleLoginClick}>
            LOG IN
          </button>
          <button className="nav-button" onClick={handleRegisterClick}>
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
