import React from "react";

function TicketConversation({ details }) {
  console.log(details);
  return (
    <div className="">
      {details.map((cmnt, index) => (
        <div className="space-y-3 mb-3">
          <div key={index + cmnt.date} className="flex items-start space-x-2">
            <img
              className="w-[35px] h-[35px] object contain rounded-full"
              src="https://avatars.githubusercontent.com/u/67508976?v=4"
              alt=""
            />

            <div className="flex flex-col items-start justify-start text-[12px]">
              <p>{cmnt.commentBy}</p>
              <p className=" text-[10px] pb-4">{cmnt.date}</p>
              <p>{cmnt.comment}</p>
            </div>
          </div>
          <hr className="flex items-start justify-start mx-auto bg-slate-100 w-[100%] " />
        </div>
      ))}
    </div>
  );
}

export default TicketConversation;
