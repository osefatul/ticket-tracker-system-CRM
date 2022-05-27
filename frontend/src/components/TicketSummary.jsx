import React from "react";

function TicketSummary() {
  return (
    <div>
      <hr className="flex items-start justify-start mx-auto bg-slate-500 w-[100%] my-1" />
      <div className="text-black flex flex-col justify-center w-[80%]">
        <div className="text-sm flex items-start justify-start overflow-x-auto ">
          <div className="grid grid-rows-2 grid-flow-col gap-x-10 ">
            <p className=" text-[11px]">
              <span className="">Status: </span>Pending{" "}
            </p>
            <p className=" text-[11px]">
              <span className=" ">Sev: </span>4
            </p>
            <p className=" text-[11px]">
              <span className=""> Created: </span>
              02-01-2022
            </p>
            <p className=" text-[11px]">
              <span className="">Status: </span>Pending
            </p>
          </div>
        </div>
      </div>
      <hr className="flex items-start justify-start mx-auto bg-slate-500 w-[100%] my-1" />
    </div>
  );
}

export default TicketSummary;
