import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Victim from "./pages/Victim";
import Volunteer from "./pages/Volunteer";
import Dashboard from "./pages/Dashboard";
import VictimPage from "./pages/VictimPage";
import VolunteerPage from "./pages/VolunteerPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/victim" element={<Victim />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/victim-page" element={<VictimPage />} />
          <Route path="/volunteer-page" element={<VolunteerPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
