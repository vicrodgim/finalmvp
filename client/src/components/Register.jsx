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

  //   states for form fields and error handling
  const [error, setError] = useState(false);
  const [notSubmited, setNotSubmited] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registerForm, setRegisterForm] = useState(emptyForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [emailExistsError, setEmailExistsError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setRegisterForm((prev) => ({ ...prev, [name]: value }));
    setSelectedFile(event.target.files[0]);
    console.log({ name, value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (registerForm.password !== registerForm.confirmPassword) {
        setError(true);
        return;
      }

      //Reset emailExistsError before submission
      setEmailExistsError(false);

      const response = await axios.post(
        "http://localhost:4000/api/users",
        registerForm
      );
      await onFileUpload();
      console.log(response.config.data.password);
      console.log(response);

      setSuccess(true);
      setError(false);
      setRegisterForm(emptyForm);

      //delay navigation by 2 seconds to allow success alert to display
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      if (error.response?.status === 409) {
        setEmailExistsError(true); //error code 409 means email already exists
      } else {
        setNotSubmited(true);
      }
    }
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmedPassword = () => {
    setShowConfirmedPassword((prev) => !prev);
  };

  const onFileUpload = async () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("imageUrl", selectedFile, selectedFile.name);
    formData.append("email", registerForm.email);

    // Request made to the backend api
    // Send formData object
    await axios.post("/api/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setSelectedFile(null);
  };

  return (
    <div className="container auth-page">
      <form className="form register" onSubmit={handleSubmit}>
        <h2>REGISTER</h2>

        <p className="subtitle">
          Please fill in this form to create an account
        </p>
        <div className="form-content">
          <div className="column-1">
            <p className="final-steps-subtitle">Tell us a bit about yourself</p>
            <input
              placeholder="Your first name"
              type="text"
              name="first_name"
              id="first_name"
              value={registerForm.first_name}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Your last name"
              type="text"
              name="last_name"
              id="last_name"
              value={registerForm.last_name}
              onChange={handleChange}
              required
            />

            <textarea
              placeholder="Please write here about you, your academic and work experience and projects."
              type="text"
              name="description"
              id="description"
              value={registerForm.description}
              onChange={handleChange}
              required
            />
            {/* </label> */}

            <input
              placeholder=" Where are you living currently?"
              type="text"
              name="location"
              id="location"
              value={registerForm.location}
              onChange={handleChange}
              required
            />

            <input
              placeholder="Please provide a username"
              type="username"
              name="username"
              id="username"
              value={registerForm.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column-2">
            <div className="profile-picture-upload">
              <label className="final-steps-subtitle" htmlFor="imageUrl">
                Submit your profile picture
              </label>
              <input
                type="file"
                name="imageUrl"
                id="imageUrl"
                value={registerForm.imageUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-details">
              <p className="final-steps-subtitle">
                Please provide an email and a password in order to log in later
              </p>

              <input
                type="email"
                name="email"
                id="email"
                placeholder="Your Email"
                value={registerForm.email}
                onChange={handleChange}
                required
              />

              <div className="password-input">
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

              <div className="password-input">
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
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="registerbtn">
          Submit
        </button>
        <div className="container signin">
          <p>
            Already have an account?<Link to="/login"> Log in</Link>.
          </p>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="alert alert-success" role="alert">
            password does not match!
          </div>
        )}
        {emailExistsError && (
          <div className="alert alert-danger" role="alert">
            Email already exists. Please use a different email or login instead.
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
