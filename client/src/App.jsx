import { NavBar } from "./components/NavBar/NavBar.jsx";
import "./App.css";
import { MyJobs } from "./pages/MyJobs.jsx";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <MyJobs />
      </main>
    </>
  );
}

export default App;
