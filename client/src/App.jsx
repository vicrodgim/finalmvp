import { NavBar } from "./components/NavBar/NavBar.jsx";
import "./App.css";
// import { MyJobs } from "./pages/MyJobs.jsx";
// import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import axios from "axios";
import { useState } from "react";
import AuthContext from "./context/AuthContext.js";
// import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const login = async (userData) => {
    try {
      const { data } = await axios("/api/auth/login", {
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
  return (
    <AuthContext.Provider value={authObj}>
      <header>
        <NavBar />
      </header>
      <main>
        {/* <MyJobs />
        <Register /> */}
        <Login />
      </main>
    </AuthContext.Provider>
  );
}

export default App;
