import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} exact />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
