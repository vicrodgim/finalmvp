import { NavBar } from "./components/NavBar/NavBar.jsx";
import "./App.css";
import { MyProfile } from "./pages/MyProfile.jsx";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <MyProfile />
      </main>
    </>
  );
}

export default App;
