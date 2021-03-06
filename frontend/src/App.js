import "./App.css";
import React, { useEffect } from "react";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Routes, Route, Link, Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTicket from "./pages/AddTicket";
import TicketLists from "./pages/TicketLists";
import TicketPage from "./pages/TicketPage";
import { DefaultLayout } from "./layout/DefaultLayout";

function App() {


  return (
    <div className="App text-white">
      

      <Routes>

        <Route path="auth" element={<Auth />} />
        
        <Route path="/" element={<DefaultLayout />} >
        <Route path="/" element={<Home>Home Page</Home>} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="new_ticket" element={<AddTicket />} />
        <Route path="ticket-lists" element={<TicketLists />} />
        <Route path="ticket_communication/:tid" element={<TicketPage />} />
      </Route>

      </Routes> 
    </div>
  );
}

export default App;


