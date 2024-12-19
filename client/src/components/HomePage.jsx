import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="homepage">
      <h1>HOME PAGE</h1>
      <div>
        <p>
          The Job Application Tracker provides practical tools and resources for
          new developers to become job-ready and confidently navigate the tech
          industry.
        </p>
      </div>
      <div>
        {/* <button onClick={handleLoginClick}>LOG IN</button>
        <button onClick={handleRegisterClick}>REGISTER</button> */}
      </div>
    </div>
  );
};

export default HomePage;
