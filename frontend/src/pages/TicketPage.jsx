import React from "react";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TicketHeader from "../components/TicketPage/TicketHeader";

function TicketPage() {
  return (
    <>
      <Header />
      <div className="layout mx-auto text-black">
        <PageBreadCrumbs page="Ticket Communication" />
        <div>
          <TicketHeader />
        </div>

        {/* Ticket Body */}
      </div>
      <Footer />
    </>
  );
}

export default TicketPage;
