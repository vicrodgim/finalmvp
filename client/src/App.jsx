import { NavBar } from "./components/NavBar/NavBar.jsx";
import "./App.css";
// import { MyJobs } from "./pages/MyJobs.jsx";
// import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {/* <MyJobs />
        <Register /> */}
        <Login />
      </main>
    </>
  );
}

export default App;
