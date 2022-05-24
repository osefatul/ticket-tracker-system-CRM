import React, { useState } from "react";

const initialFormData = {
  title: "",
  foundIssue: "",
  createdDate: "",
  description: "",
};
function AddTicketForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="pt-8 w-[70%] mx-auto ">
      <form
        action=""
        className="text-black space-y-5 flex flex-col justify-end"
        onSubmit={handleOnSubmit}
      >
        <div className="flex justify-end w-[60%] space-x-10">
          <label
            className="flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className={`pl-1 border-stone-400  border border-1 w-[60%]
            bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:ring-1
              }`}
            name="title"
            type="text"
            value={formData.title}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="flex justify-end w-[60%] space-x-10">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Issue Found At
          </label>
          <input
            className={`pl-1 border-stone-400  border border-1 w-[60%]
            bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:ring-1 mt-2
              }`}
            name="foundIssue"
            type="text"
            value={formData.foundIssue}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="flex justify-end w-[60%] space-x-10">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Create Date
          </label>
          <input
            className={`pl-1 border-stone-400  border border-1 w-[60%] bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:ring-1 mt-2
              `}
            name="createdDate"
            type="date"
            value={formData.createdDate}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="flex justify-end w-[60%] space-x-10">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Description
          </label>
          <textarea
            rows="7"
            className={`pl-1 border border-1 w-[60%] border-stone-400  bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none  focus:ring-1
              }`}
            name="description"
            type="text"
            value={formData.description}
            onChange={handleOnChange}
            required
          />
        </div>
      </form>

      <div className="flex  justify-end w-[60%]">
        <button className=" text-[15px] w-[60%] rounded-sm mt-8 border border-1 bg-green-900 text-white">
          Create Ticket
        </button>
      </div>
    </div>
  );
}

export default AddTicketForm;
