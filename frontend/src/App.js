import logo from "./logo.svg";
import "./App.css";
import OrangeButton from "./components/OrangeButton";
import earth from "./images/Group 24.png";
import GetStartedPage from "./components/GetStartedPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Track from "./components/Track";
import Submitted from "./components/Submitted";
import Dashboard from "./components/Dashboard";
import { useAuth0 } from "@auth0/auth0-react";
import LoaderPage from "./components/LoaderPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/getstarted" element={<GetStartedPage />}></Route>
        <Route path="/track" element={<Track />}></Route>
        <Route path="/submitted" element={<Submitted />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/loader" element={<LoaderPage />}></Route>


        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

function HomePage() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <div>
      <div className="heading">Let’s Decrease the Carbon Footprint</div>
      {console.log(user, isAuthenticated, isLoading)}
      {isAuthenticated && !isLoading ? (
        <Link to="/track" style={{ textDecoration: "none" }}>
          <OrangeButton name="Get Started" />
        </Link>
      ) : (
        <Link to="/getstarted" style={{ textDecoration: "none" }}>
          <OrangeButton name="Get Started" />
        </Link>
      )}

      <img style={{ position: "absolute", left: 0, bottom: 0 }} src={earth} />
    </div>
  );
}

export default App;
