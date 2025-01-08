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
import { EditProfile } from "./components/ProfilePage/EditProfile.jsx";
import axios from "axios";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
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
      return { message: "login successful" };
    } catch (error) {
      console.log("There is an error: ", error);
      return error.response.data;
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

          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <JobsList />
              </PrivateRoute>
            }
          />

          <Route
            path="/add-jobs"
            element={
              <PrivateRoute>
                <AddJobForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/jobs/:id"
            element={
              <PrivateRoute>
                <JobDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/learning-page"
            element={
              <PrivateRoute>
                <LearningPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
