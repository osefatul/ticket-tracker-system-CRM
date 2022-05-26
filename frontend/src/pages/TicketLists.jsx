import React from "react";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Footer from "../components/Footer";
import Header from "../components/Header";
function TicketLists() {
  return (
    <>
      <Header />
      <div className="layout pt-4">
        <PageBreadCrumbs page="Ticket Lists" />
      </div>
      <Footer />
    </>
  );
}

export default TicketLists;
