import React from "react";

function TicketSummary({ details }) {
  return (
    <div>
      <hr className="flex items-start justify-start mx-auto bg-slate-500 w-[100%] my-1" />
      <div className="text-black flex flex-col justify-center w-[80%]">
        <div className="text-sm flex items-start justify-start overflow-x-auto ">
          <div className="grid gap-x-10 ">
            <p className=" text-[11px]">
              <span className="font-medium">Status: </span>
                {details.status === "Resolved" ? <span className="text-green-800">Resolved</span> : <span className="text-red-800">{details.status}</span>}

            </p>
            <p className=" text-[11px]">
              <span className="font-medium"> Created: </span>
              {details.openAt && new Date(details.openAt).toLocaleString()}
            </p>
            <p className=" text-[11px]">
              <span className="font-medium"> Assigner Department: </span>
              {details.creatorDepartment}
            </p>
            <p className=" text-[11px]">
              <span className="font-medium">Sev: {" "}{details.severity}</span>
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
            <p>@{details.creator}</p>
            <p className=" text-[10px] pb-4">

            </p>
            <p>{details.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketSummary;
