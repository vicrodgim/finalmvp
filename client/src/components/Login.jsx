/* This component returns the 'Login' page */

import React from "react";
import { useState } from "react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Login successful!");
    }, 3000);
  };

  return (
    <div>
      <h2>LOGIN</h2>

      {/* Email Input */}
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
      />

      {/* Password Input */}
      <div>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="button"
          //toggling
          onClick={() => setShowPassword(!showPassword)}
          style={styles.toggleButton}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {/* Submit Button */}
      <button type="submit" style={styles.button}>
        {isLoading ? "Loading..." : "Login"}
      </button>
    </div>
  );
}

export default Login;
