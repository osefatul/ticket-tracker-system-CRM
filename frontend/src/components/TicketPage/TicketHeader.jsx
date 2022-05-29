import React, { useState } from "react";
import TicketSummary from "./TicketSummary";
import { userRows } from "../../dummyTickets";
import TicketBody from "./TicketBody";
import { useParams } from "react-router-dom";

function TicketHeader() {
  const { tid } = useParams(); //ticketID from the Ticket_communication page

  const tabs = [
    {
      id: 0,
      category: "Overview",
      details: userRows[0].description,
    },
    { id: 1, category: "Communication", details: userRows[0].conversation },
  ];

  const [value, setValue] = useState(0);
  const { id, category, details } = tabs[value];

  return (
    <div>
      <div>
        <div className="flex items-center justify-between p1-2 pb-2">
          <h1 className="flex items-start justify-start font-semibold text-[18px]">
            SSL Issue
          </h1>
          <button className="border border-1 rounded-sm px-4 py-[2px] cursor-pointer bg-slate-200 text-[12px]">
            Edit
          </button>
        </div>
        <div className="flex items-center justify-start space-x-4">
          {tabs.map((item, index) => {
            return (
              <div
                key={item.id}
                onClick={() => setValue(index)}
                className={`${index === value && " text-orange-800"} ${
                  index === 1 && "border-l-2 border-slate-200 pl-4 "
                }`}
              >
                <h2 className="text-[13px] font-medium cursor-pointer">
                  {item.category}
                </h2>
              </div>
            );
          })}
        </div>
      </div>

      <div></div>

      <div>
        {category === "Overview" ? (
          <TicketSummary details={details} />
        ) : (
          <TicketBody details={details} />
        )}
      </div>
    </div>
  );
}

export default TicketHeader;
