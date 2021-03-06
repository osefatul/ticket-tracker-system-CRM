import React from "react";

function TicketSummary({ details }) {
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
      <div className="p-5 boxShadow rounded-md">
        <div className="flex items-start space-x-2">
          <img
            className="w-[35px] h-[35px] object contain rounded-full"
            src="https://avatars.githubusercontent.com/u/67508976?v=4"
            alt=""
          />

          <div className="flex flex-col items-start justify-start text-[12px]">
            <p>Osefatul</p>
            <p className=" text-[10px] pb-4">
              2022-05-26 7:12:38 AM (UTC-07:00)
            </p>
            <p>{details}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketSummary;
