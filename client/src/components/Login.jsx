/* This component returns the 'Login' page */

import { useState } from "react";
import axios from "axios";
import MyProfile from "../pages/MyProfile.jsx";
import "./Login.css";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log("Email:", email);
  //   console.log("Password:", password);
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     alert("Login successful!");
  //   }, 3000);
  // };

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [userData, setUserData] = useState(null);
  const [logged, setLogged] = useState(false);

  //   const isLoggedIn = localStorage.getItem("token") !== null;
  const { username, password } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      const { data } = await axios("/api/users/login", {
        method: "POST",
        data: credentials,
      });

      console.log(data);
      //store it locally
      localStorage.setItem("token", data.token);
      setLogged(true);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        alert("Login successful!");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setLogged(false);
  };

  const requestProfileData = async () => {
    try {
      const { data } = await axios.get("/api/users/profile", {
        // hay que pasar esto si o si cuando hay middleware con token
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>LOGIN</h2>

      {/* Email Input */}
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
        {!logged && (
          <button className="btn btn-primary" onClick={login}>
            Log in
          </button>
        )}
        {logged && (
          <button className="btn btn-outline-dark ml-2" onClick={logout}>
            Log out
          </button>
        )}
      </div>

      {/* Submit Button */}
      <button type="submit">{isLoading ? "Loading..." : "Login"}</button>
      <div>
        {logged && (
          <button onClick={requestProfileData}>
            Click here to see your profile
          </button>
        )}
      </div>
      {userData && <MyProfile userData={userData} />}
    </div>
  );
};

export default Login;
