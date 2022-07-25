import React, { useState } from "react";
import AddTicketForm from "../components/AddTicketForm";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageBreadCrumbs from "../components/PageBreadCrumbs";

function AddTicket() {
  return (
    <>
      {/* <Header /> */}
      <div className="layout ">
        <div>
          <PageBreadCrumbs page="New Ticket" />
        </div>
        <div>
          <AddTicketForm />
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default AddTicket;
