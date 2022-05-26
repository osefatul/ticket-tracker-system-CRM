import React from "react";
import PageBreadCrumbs from "../components/PageBreadCrumbs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import TicketBody from "../components/TicketBody";
function TicketPage() {
  return (
    <>
      <Header />
      <div className="layout mx-auto text-black">
        {/* Ticket Summary */}

        <div className="text-[12px]  ">
          <PageBreadCrumbs page="Ticket Communication" />
          <div className="flex items-center justify-between p1-2">
            <h1 className="flex items-start justify-start font-bold text-lg">
              SSL Issue
            </h1>
            <button className="border border-1 rounded-sm px-4 py-[2px] cursor-pointer bg-slate-200">
              Edit
            </button>
          </div>
          <div>
            <hr className="flex items-start justify-start mx-auto bg-slate-500 w-[100%] my-1" />
            <Sidebar />
            <hr className="flex items-start justify-start mx-auto bg-slate-500 w-[100%] my-1" />
          </div>
        </div>

        {/* Ticket Body */}
        <main>
          <TicketBody />
        </main>
      </div>
      <Footer />
    </>
  );
}

export default TicketPage;
