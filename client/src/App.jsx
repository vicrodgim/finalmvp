import { NavBar } from "./components/NavBar/NavBar.jsx";
import "./App.css";
import { MyProfile } from "./pages/MyProfile.jsx";
import { MyJobs } from "./pages/MyJobs.jsx";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        {/* <MyJobs /> */}
        <MyProfile />
      </main>
    </>
  );
}

export default App;
