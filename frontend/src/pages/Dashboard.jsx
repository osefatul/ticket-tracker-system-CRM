import React from "react";
import TicketsTable from "../components/TicketsTable";

import PageBreadCrumbs from "../components/PageBreadCrumbs";
function Dashboard() {
  return (
    <div className="layout pt-4">
      <div className="text-[12px]">
        <PageBreadCrumbs page="Dashboard" />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between space-y-2 md:space-y-0">
        <button className="  text-[14px] border border-1 h-8 px-3 rounded-lg bg-green-800 ">
          New Ticket
        </button>

        <div className="text-black">
          <p>
            Total tickets: <span> 50</span>{" "}
          </p>
          <p>
            Pending tickets: <span> 9</span>{" "}
          </p>
          <p>
            Recently added tickets: <span> 9</span>{" "}
          </p>
        </div>
      </div>

      {/* Tickets Table */}
      <TicketsTable />
    </div>
  );
}

export default Dashboard;
