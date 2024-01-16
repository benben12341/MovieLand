import "./App.css";
import Navbar from "./components/Navbar";
import MovieLandRoutes from "./routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const clientId =
  "640622037841-rmcrulj2s0ecud57vip8rvk9fjrfs225.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="content">
          <MovieLandRoutes />
        </main>
      </Router>
    </div>
  );
}

export default App;
