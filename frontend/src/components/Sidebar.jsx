import React from "react";

function Sidebar() {
  return (
    <div className="text-black flex flex-col justify-center mx-auto w-[80%]">
      <div className="text-sm flex items-start sm:items-center justify-start sm:justify-center overflow-x-auto ">
        {/* <h1 className=" h-11 w-[150px] font-bold text-sm flex items-center justify-center">
          Ticket Summary
        </h1> */}
        <div className="grid grid-rows-2 grid-flow-col gap-x-10 ">
          <p className=" text-[11px]">
            <span className="font-bold">Status: </span>Pending{" "}
          </p>
          <p className=" text-[11px]">
            <span className="font-bold ">Sev: </span>4
          </p>
          <p className=" text-[11px]">
            <span className="font-bold "> C-Date: </span>
            02-01-2022
          </p>
          <p className=" text-[11px]">
            <span className="font-bold ">Status: </span>Pending
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
