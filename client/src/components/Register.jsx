/* This component returns the 'Register' page */
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.css";

function Register() {
  const emptyForm = {
    username: "",
    first_name: "",
    last_name: "",
    description: "",
    location: "",
    email: "",
    password: "",
    confirmPassword: "",
    imageUrl: "",
  };

  //   states for form fields
  const [error, setError] = useState(false);
  const [notSubmited, setNotSubmited] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registerForm, setRegisterForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    console.log({ name, value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (registerForm.password !== registerForm.confirmPassword) {
        setError(true);
        return;
      }
      const response = await axios.post(
        "http://localhost:4000/api/users",
        registerForm
      );
      console.log(response.config.data.password);
      console.log(response);

      setSuccess(true);
      setError(false);
      setRegisterForm(emptyForm);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setNotSubmited(true);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmedPassword = () => {
    setShowConfirmedPassword((prev) => !prev);
  };

  return (
    <div className="container auth-page">
      <h2>REGISTER</h2>
      <p>Please fill in this form to create an account</p>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="first_name">
          <b>Your first name</b>
        </label>
        <input
          type="text"
          name="first_name"
          id="first_name"
          value={registerForm.first_name}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="last_name">
          <b>Your last name</b>
        </label>
        <input
          type="text"
          name="last_name"
          id="last_name"
          value={registerForm.last_name}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="description">
          <b>
            Please write here about you, your academic and work experience and
            projects.
          </b>
        </label>
        <textarea
          type="text"
          name="description"
          id="description"
          value={registerForm.description}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="location">
          <b>Where are you living currently?</b>
        </label>
        <input
          type="text"
          name="location"
          id="location"
          value={registerForm.location}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="username">
          <b>Please provide a username</b>
        </label>
        <input
          type="username"
          name="username"
          id="username"
          value={registerForm.username}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="imageUrl">
          <b>Submit your profile picture</b>
        </label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={registerForm.imageUrl}
          onChange={handleChange}
          required
        ></input>
        <h4>Final Steps</h4>
        <p>Please provide an email and a password in order to log in later</p>

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@gmail.com"
          value={registerForm.email}
          onChange={handleChange}
          required
        ></input>

        <label htmlFor="password">
          <b>Password</b>
        </label>
        <div>
          <input
            type={!showPassword ? "password" : "text"}
            placeholder="Enter Password"
            name="password"
            id="password"
            value={registerForm.password}
            onChange={handleChange}
            required
          ></input>
          <button type="button" onClick={handleShowPassword}>
            {!showPassword ? "Show" : "Hide"}
          </button>
        </div>

        {/* Repeat Password Input */}
        <label htmlFor="confirmPassword">
          <b>Repeat Password</b>
        </label>
        <div>
          <input
            type={!showConfirmedPassword ? "password" : "text"}
            placeholder="Repeat Password"
            name="confirmPassword"
            id="confirmPassword"
            value={registerForm.confirmPassword}
            onChange={handleChange}
            required
          ></input>
          <button type="button" onClick={handleShowConfirmedPassword}>
            {!showConfirmedPassword ? "Show" : "Hide"}
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="registerbtn">
          Submit
        </button>
        <div className="container signin">
          <p>
            Already have an account?<Link to="/login">Sign in</Link>.
          </p>
        </div>
        {error && (
          <div className="alert alert-success" role="alert">
            password does not match!
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            Register successful, welcome!
          </div>
        )}
        {notSubmited && (
          <div className="alert alert-danger" role="alert">
            There has been a problem with your registration, please try again!
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
