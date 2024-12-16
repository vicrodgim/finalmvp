/* This component returns the 'Login' page */

import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext.js";

import "./Login.css";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // const [userData, setUserData] = useState(null);
  // const [logged, setLogged] = useState(false);

  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  //Context consume
  const auth = useContext(AuthContext); // auth = {isLoggedIn, login, logout}

  const login = async () => {
    auth.login(credentials);
  };

  const logout = () => {
    auth.logout();
  };

  return (
    <>
      <h2>LOGIN</h2>
      <div>
        {/* Username Input */}
        <input
          type="username"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="Please provide your username"
        />

        {/* Password Input */}
        <div>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
          />
          <button
            type="button"
            //toggling
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>

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
      </div>
    </>
  );
};

export default Login;
