import React from "react";
import TextareaAutosize from "@mui/material/TextareaAutosize";
function TicketBody() {
  return (
    <div>
      <form
        action="
        "
      >
        <label className="text-[10px]">Add Comment</label>
        <textarea
          rows="3"
          className={`placeholder:italic placeholder:text-slate-400 placeholder:pl-1
              block text-slate-700 bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 border border-slate-500 w-full text-[10px]
              }`}
          name="email"
          type="email"
          required
        />
      </form>
    </div>
  );
}

export default TicketBody;
