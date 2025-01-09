import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";

import "./Login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  //state for error messages
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { email, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  //Context consume
  const auth = useContext(AuthContext); // auth = {isLoggedIn, login, logout}

  const login = async () => {
    try {
      const result = await auth.login(credentials);
      if (result.message === "login successful") {
        navigate("/my-profile");
      } else {
        setErrorMessage(result.message);
      }
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  const logout = () => {
    auth.logout();
  };

  return (
    <div className="auth-page">
      <div className="form login">
        {!auth.isLoggedIn ? (
          <>
            <h2>LOGIN</h2>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Your Email"
            />

            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Your Password"
            />
          </>
        ) : (
          <h2>Welcome!</h2>
        )}
        {!auth.isLoggedIn ? (
          <button type="submit" className="btn btn-primary" onClick={login}>
            Log in
          </button>
        ) : (
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
