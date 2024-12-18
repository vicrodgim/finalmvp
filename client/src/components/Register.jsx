/* This component returns the 'Register' page */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./Register.css";

function Register() {
  //states for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password does not match!");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      alert("Registration successful!");
      // Clear form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }, 3000);
  };

  return (
    <div className="container">
      <h2>REGISTER</h2>
      <p>Please fill in this form to create an account</p>
      <form className="form" onSubmit={handleRegister}>
        {/* Email Input */}
        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>

        {/* Password Input */}
        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>

        {/* Repeat Password Input */}
        <label htmlFor="psw-repeat">
          <b>Repeat Password</b>
        </label>
        <input
          type="password"
          placeholder="Repeat Password"
          name="password-repeat"
          id="password-repeat"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        ></input>

        {/* Submit Button */}
        <button type="submit" className="registerbtn">
          Submit
        </button>
        <div className="container signin">
          <p>
            Already have an account?<Link to="/login">Sign in</Link>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
