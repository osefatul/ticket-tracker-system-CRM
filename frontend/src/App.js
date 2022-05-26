import "./App.css";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddTicket from "./pages/AddTicket";
import TicketLists from "./pages/TicketLists";
import TicketPage from "./pages/TicketPage";

function App() {
  return (
    <div className="App text-white">
      <Routes>
        <Route path="login" element={<Auth />} />
        <Route path="/" element={<Home>Home Page</Home>} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new_ticket" element={<AddTicket />} />
        <Route path="ticket-lists" element={<TicketLists />} />
        <Route path="ticket-communication" element={<TicketPage />} />
      </Routes>
    </div>
  );
}

export default App;
