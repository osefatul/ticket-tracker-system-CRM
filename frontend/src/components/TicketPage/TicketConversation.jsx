import React, { useState } from "react";
import moment from 'moment';




function TicketConversation({ details }) {


  //Reverse the order of the comments.
  const arrayReverseObj = 
  obj => Object.keys(obj).sort().reverse().map(key=> ({...obj[key],key:key}) );
  // console.log(arrayReverseObj(details))
  const detailsReversed = arrayReverseObj(details)
  

  return (
    <div className="p-5 boxShadow rounded-lg mb-[100px] overflow-auto" >

    <div className="mb-20">
      {detailsReversed.map((cmnt, index) => (
        <div key={index + cmnt.msgAt} className="space-y-3 mb-3">
          <div key={index + cmnt.msgAt} className="flex items-start space-x-2">
            <img
              className="w-[35px] h-[35px] object contain rounded-full"
              src="https://avatars.githubusercontent.com/u/67508976?v=4"
              alt=""
            />

            <div className="flex flex-col items-start justify-start text-[12px]">
              <p className="">{cmnt.sender}</p>
              <p className=" text-[9px] text-[gray] pb-2">
                {moment(cmnt.msgAt).format("YYYY-MM-DD Hh:mm:ss")}
              </p>
              <p>{cmnt.message}</p>
            </div>
          </div>
          <hr className="flex items-start justify-start mx-auto bg-slate-100 w-[100%] " />
        </div>
      ))}
      </div>
    </div>
  );
}

export default TicketConversation;
