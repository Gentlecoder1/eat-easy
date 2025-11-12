import {useState, useEffect} from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
// import Splash from "./components/Splash";
// import GetStarted from "./components/GetStarted";
import Locations from "./components/Locations";
import Welcome from "./components/Welcome";
import Virtual from "./components/Virtual";
import Recommend from "./components/Recommend";
import Step1 from "./components/Step1";
import { useTheme } from "./hooks/useTheme";

function App() {

  const location = useLocation()
  useEffect(() => {
      // scroll immediately to top when pathname changes
      window.scrollTo({ top: 0 })
  }, [location.pathname])

  const { theme } = useTheme();

  const backgroundImage = `var(--${
    theme === "dark" ? "dark" : "light"
  }-mode-bg)`;

  return (
    <div className="w-full h-full" style={{ backgroundImage }}>
      <Routes>
        {/* <Route path="/" element={<Splash />} />
        <Route path="/started" element={<GetStarted />} />
        <Route path="/get-started" element={<GetStarted />} /> */}
        <Route path="/locations" element={<Locations />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/virtual" element={<Virtual />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route path="/step1" element={<Step1 />} />
        <Route path="/" element={<Splash />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </div>
  );
}

export default App;
