/* This component returns the 'Login' page */

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.js";

import "./Login.css";

const Login = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  //Context consume
  const auth = useContext(AuthContext); // auth = {isLoggedIn, login, logout}

  const login = async () => {
    try {
      await auth.login(credentials);
      navigate("/jobs");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    auth.logout();
  };

  return (
    <>
      <div>
        {!auth.isLoggedIn ? (
          <div>
            <h2>LOGIN</h2>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Please provide your username"
            />
            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
              />
              {/* <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide" : "Show"}
      </button> */}
            </div>
          </div>
        ) : (
          <h2>Welcome!</h2>
        )}
        {!auth.isLoggedIn ? (
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
        ) : (
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        )}
      </div>

      {/* Submit Button */}
      {/* <button type="submit">{isLoading ? "Loading..." : "Login"}</button> */}
    </>
  );
};

export default Login;
