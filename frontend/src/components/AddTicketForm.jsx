import React, { useEffect, useState } from "react";
import SevDropDown from "./SevDropDown";

const initialFormData = {
  title: "",
  sev: "",
  createdDate: "",
  description: "",
};
function AddTicketForm() {
  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Form is submitted", formData);

    setFormData(initialFormData);
  };

  //Everytime formData change run this component
  useEffect(() => {}, [formData]);

  return (
    <div className="pt-12 sm:w-[80%] mx-auto ">
      <form
        action=""
        className="text-black space-y-5 flex flex-col sm:items-center justify-end sm:justify-center"
        onSubmit={handleOnSubmit}
      >
        <div className="flex justify-end sm:justify-between sm:w-[80%] space-x-5">
          <label
            className="flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
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
        <div className="flex justify-end sm:justify-between  sm:w-[80%] space-x-5">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Severity
          </label>

          <select
            className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%]
            bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:ring-1 mt-2
              }`}
            name="sev"
            onChange={handleOnChange}
          >
            <option value="1">Sev-1: Critical function down</option>
            <option value="2">Sev-2: Critical function imapired</option>
            <option value="3">Sev-3: Group productivity imapired</option>
            <option value="4">Sev-4: Individual productivity affected</option>
            <option value="5">
              Sev-5: productivity not immediately affected
            </option>
          </select>
        </div>
        <div className="flex justify-end sm:justify-between sm:w-[80%] space-x-5">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Create Date
          </label>
          <input
            className={`pl-1 border-stone-400  border border-1 w-[60%] sm:w-[80%] bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none focus:ring-1 mt-2
              `}
            name="createdDate"
            type="date"
            value={formData.createdDate}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="flex justify-end sm:justify-between  sm:w-[80%] space-x-5">
          <label
            className=" flex justify-start w-[20%] text-[12px]"
            htmlFor="title"
          >
            Description
          </label>
          <textarea
            rows="7"
            className={`pl-1 border border-1 w-[60%] sm:w-[80%] border-stone-400  bg-white rounded-sm shadow-sm sm:text-sm
              focus:outline-none  focus:ring-1
              }`}
            name="description"
            type="text"
            value={formData.description}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="flex justify-end sm:justify-between  sm:w-[80%] space-x-5">
          <div className="flex justify-start w-[20%]"></div>
          <button
            className=" text-[15px] w-[60%] sm:w-[80%] rounded-sm mt-3 border border-1 bg-green-900 text-white"
            type="submit"
          >
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTicketForm;
