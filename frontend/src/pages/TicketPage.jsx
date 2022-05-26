import React from "react";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
function TicketPage() {
  return (
    <>
      <Header />
      <div className="layout pt-4 text-black">
        <div className="text-[12px] pb-3">
          <PageBreadCrumbs page="Ticket Communication" />
        </div>
        <h1 className="flex items-center justify-center font-bold text-lg">
          SSL Issue
        </h1>
        <hr className="flex items-center justify-center mx-auto bg-slate-500 w-[100%] my-1" />
        <div>
          <Sidebar />
          <hr className="flex items-center justify-center mx-auto bg-slate-500 w-[100%] my-1" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TicketPage;
