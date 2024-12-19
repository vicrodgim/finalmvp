import { NavBar } from "./components/NavBar/NavBar.jsx";
import "./App.css";
import { MyJobs } from "./pages/MyJobs.jsx";
import JobsList from "./components/JobsList/JobsList.jsx";
import JobDetail from "./components/JobDetails/JobDetail.jsx";
import AddJobForm from "./components/JobForm/AddJobForm.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import HomePage from "./components/HomePage.jsx";
import { LearningPage } from "./pages/LearningPage.jsx";
import axios from "axios";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext.js";
// import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const location = useLocation();

  const login = async (userData) => {
    try {
      const { data } = await axios("/api/users/login", {
        method: "POST",
        data: userData,
      });

      //store it locally
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const authObj = {
    isLoggedIn,
    login,
    logout,
  };

  const excludeNavBar = ["/"];

  return (
    <AuthContext.Provider value={authObj}>
      <header>
        <NavBar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<JobsList />} />
          <Route path="/add-jobs" element={<AddJobForm />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/learning-page" element={<LearningPage />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
