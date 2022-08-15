import "./App.css";
import React from "react";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { Routes, Route, Link, Router } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardUpdated from "./pages/DashboardUpdated";
import AddTicket from "./pages/AddTicket";
import TicketLists from "./pages/TicketsList/TicketLists";
import TicketPage from "./pages/TicketPage";
import { DefaultLayout } from "./layout/DefaultLayout";
import UserVerification from "./pages/UserVerification";
import ResetPassword from "./pages/ResetPassword";
import DepTicketList from "./pages/TicketsList/DepTicketList";
import CreatedByMeTicketList from "./pages/TicketsList/CreatedByMeTicketList";

function App() {


  return (
    <div className="App text-white">
      

      <Routes>

        <Route path="auth" element={<Auth />} />
        <Route path="verification/:tid/:email" element={<UserVerification />} />
        <Route path="update-password" element={<ResetPassword />} />

        
        <Route path="/" element={<DefaultLayout />} >

          <Route path="/" element={<Home>Home Page</Home>} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="dashboard" element={<DashboardUpdated />} />
          <Route path="new_ticket" element={<AddTicket />} />
          <Route path="ticket-lists" element={<TicketLists />} />
          <Route path="dept-ticket-lists" element={<DepTicketList />} />
          <Route path="creator-ticket-lists" element={<CreatedByMeTicketList />} />
          <Route path="ticket_communication/:tid" element={<TicketPage />} />
        </Route>

      </Routes> 
    </div>
  );
}

export default App;


