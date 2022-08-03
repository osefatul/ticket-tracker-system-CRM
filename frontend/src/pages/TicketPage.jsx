import React from "react";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TicketOverviewAndSummary from "../components/TicketPage/TicketOverviewAndSummary";

function TicketPage() {
  return (
    <>
      <Header />
      <div className="layout mx-auto text-black">
        <PageBreadCrumbs page="Ticket Communication" />
        <div>
          <TicketOverviewAndSummary />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TicketPage;
