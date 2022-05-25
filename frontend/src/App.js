import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTicket from "./pages/AddTicket";
import SevDropDown from "./components/SevDropDown";

function App() {
  return (
    <div className="App text-white">
      <Header />
      <Routes>
        <Route path="login" element={<Auth />} />
        <Route
          path="/"
          element={
            <Home>
              <SevDropDown />
            </Home>
          }
        />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new_ticket" element={<AddTicket />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
