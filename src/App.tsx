// import { Routes, Route } from "react-router-dom";
// import Splash from "./components/Splash";
// import GetStarted from "./components/GetStarted";
import Navbar from "./components/layout/Navbar";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme } = useTheme();

  const backgroundImage = `var(--${
    theme === "dark" ? "dark" : "light"
  }-mode-bg)`;

  return (
    <div className="w-full h-full" style={{ backgroundImage }}>
      {/* <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/started" element={<GetStarted />} />
        <Route path="/started" element={<GetStarted />} />
      </Routes> */}
      <Navbar />
    </div>
  );
}

export default App;
