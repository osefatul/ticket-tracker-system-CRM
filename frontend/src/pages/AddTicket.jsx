import React, { useState } from "react";
import AddTicketForm from "../components/AddTicketForm";
import PageBreadCrumbs from "../components/PageBreadCrumbs";

function AddTicket() {
  return (
    <div className="layout pt-4">
      <div>
        <PageBreadCrumbs page="New Ticket" />
      </div>

      <div>
        <AddTicketForm />
      </div>
    </div>
  );
}

export default AddTicket;
