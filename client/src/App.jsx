import { NavBar } from "./components/NavBar/NavBar.jsx";
import Register from "./components/Register.jsx";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Register />
      </main>
    </>
  );
}

export default App;
